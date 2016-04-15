package qiwi.jira.plugins.estimate;

import java.util.*;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import qiwi.jira.specific.DevelopmentProjectKey;
import qiwi.jira.specific.IssueFieldName;
import qiwi.jira.specific.IssueStatus;

import com.atlassian.greenhopper.service.rank.RankIndexService;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.fields.CustomField;
import com.atlassian.jira.issue.status.Status;
import com.atlassian.jira.project.Project;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;

import static qiwi.jira.specific.IssueFieldName.RANK;

@Service("qiwi-estimation-service")
public class EstimationServiceImpl implements EstimationService {
	private static final transient Logger log = LoggerFactory.getLogger(EstimationServiceImpl.class);

	// TODO Replace with null
	private static final Date UNDEFINED_DATE = new DateTime(4000, 1, 1, 0, 0, 0, 0).toDate();

	private final EstimationServiceSupport support;
	private final ProjectProgressParametersFactory projectProgressParametersFactory;

	@Autowired
	public EstimationServiceImpl(
			EstimationServiceSupport support,
			ProjectProgressParametersFactory projectProgressParametersFactory) {
		this.support = support;
		this.projectProgressParametersFactory = projectProgressParametersFactory;
	}

	@Override
	public void estimate(RankIndexService rankIndexService, CustomField estimatedDateField) throws EstimationException {
		estimate(rankIndexService, estimatedDateField, null);
	}

	@Override
	public void estimate(RankIndexService rankIndexService, CustomField estimatedDateField, Map<String, Date> issueEstimatedDates) throws EstimationException {
		final EstimationProcess estimationProcess = new EstimationProcess(rankIndexService, estimatedDateField);
		try {
			estimationProcess.estimate();
		} finally {
			if (issueEstimatedDates != null) {
				issueEstimatedDates.putAll(estimationProcess.getIssueEstimatedDates());
			}
		}
	}

	protected class EstimationProcess {
		private final RankIndexService rankIndexService;
		private final CustomField estimatedDateField;
		private final CustomField waitingDateField;
		private final long rankFieldId;

		private final Iterable<Date> workdays;
		private final Set<DevelopmentProjectKey> blockedProjectKeys;
		private final Deque<Issue> blockedIssues;
		private final Map<DevelopmentProjectKey, ProjectEstimation> projectEstimations;
		private final Map<String, Date> issueEstimatedDates;

		private final Comparator<Issue> rankComparator = new Comparator<Issue>() {

			@Override
			public int compare(Issue o1, Issue o2) {
				if (o1 == o2) {
					return 0;
				}
				final long issuePosition1 = rankIndexService.getIssuePosition(rankFieldId, o1.getId());
				final long issuePosition2 = rankIndexService.getIssuePosition(rankFieldId, o2.getId());
				return issuePosition1 == issuePosition2 ? 0 : issuePosition2 > issuePosition1 ? -1 : 1;
			}
		};

		private EstimationException estimationException;

		public EstimationProcess(RankIndexService rankIndexService, CustomField estimatedDateField) {
			this.rankIndexService = rankIndexService;
			this.estimatedDateField = estimatedDateField;
			this.waitingDateField = support.getCustomField(IssueFieldName.WAITING_DATE.value());
			this.rankFieldId = support.getCustomField(RANK.value()).getIdAsLong();

			this.workdays = support.getWorkdaysFromToday();
			this.blockedIssues = Lists.newLinkedList();
			this.blockedProjectKeys = Sets.newHashSet();
			this.projectEstimations = Maps.newHashMap();
			this.issueEstimatedDates = Maps.newHashMap();
		}

		public Map<String, Date> getIssueEstimatedDates() {
			return Collections.unmodifiableMap(issueEstimatedDates);
		}

		public void estimate() throws EstimationException {
			estimateProjects();
			estimateSAProject();
			if (estimationException != null) {
				throw estimationException;
			}
			if (log.isDebugEnabled()) {
				for (Map.Entry<String, Date> entry : issueEstimatedDates.entrySet()) {
					log.debug("Calculated date for issue {}: {}", entry.getKey(), entry.getValue());
				}
			}
		}

		protected void estimateProjects() {
			for (DevelopmentProjectKey projectKey : DevelopmentProjectKey.values()) {
				if (blockedProjectKeys.contains(projectKey)) {
					continue;
				}

				try {
					estimateProject(projectKey);
				} catch (ProjectEstimationException e) {
					log.debug("Project estimation failed: {}", e.toString());

					if (estimationException == null) {
						estimationException = new EstimationException();
					}
					e.setBlockedIssuesChain(new ArrayList<Issue>(blockedIssues));
					estimationException.addCause(e);
					blockedIssues.clear();
				}
			}
		}

		protected void estimateProject(DevelopmentProjectKey projectKey) throws ProjectEstimationException {
			log.debug("Estimate project {}", projectKey);

			if (blockedProjectKeys.contains(projectKey)) {
				throw new ProjectEstimationException("Project is blocked: " + projectKey);
			}

			final ProjectEstimation projectEstimation = getProjectEstimation(projectKey);
			if (projectEstimation != null) {
				blockedProjectKeys.add(projectKey);
				projectEstimation.estimate();
				blockedProjectKeys.remove(projectKey);
			}
		}

		private Date getImplementationDate(Collection<Issue> implementationIssues) {
			Date implementationDate = null;
			for (final Issue implementationIssue : implementationIssues) {
				final String implementationIssueKey = implementationIssue.getKey();
				final Date implementationEstimatedDate = getEstimatedDate(implementationIssue);
				if (implementationEstimatedDate == null) {
					implementationDate = UNDEFINED_DATE;
					break;
				}
				implementationDate = support.maxDate(
					support.maxDate(implementationDate, implementationEstimatedDate),
					issueEstimatedDates.get(implementationIssueKey)
				);
			}
			return implementationDate;
		}

		private Date estimateSubTasks(Collection<Issue> issues) {
			Date estimatedDate = null;
			for (Issue issue : issues) {
				estimatedDate = support.maxDate(
					estimatedDate,
					estimateSAIssue(issue)
				);
			}
			return estimatedDate;
		}

		private Date estimateSAIssue(Issue issue) {
			final Collection<Issue> subIssues = issue.getSubTaskObjects();
			final List<Issue> implementationIssues = support.getImplementationIssues(issue);
			final Date estimateDate =
				implementationIssues.isEmpty() && subIssues.isEmpty() ?
					null :
					support.maxDate(
						getImplementationDate(implementationIssues),
						estimateSubTasks(subIssues)
					);
			setEstimatedDate(issue, estimateDate);
			return estimateDate;
		}

		private void estimateSAProject() {
			for (Issue issue : support.getSAProjectIssues()) {
				estimateSAIssue(issue);
			}
		}

		private ProjectEstimation getProjectEstimation(DevelopmentProjectKey projectKey) {
			ProjectEstimation projectEstimation = projectEstimations.get(projectKey);
			if (projectEstimation == null) {
				final Project project = support.getProject(projectKey.name());
				if (project == null) {
					log.warn("No project with key {}", projectKey);
					return null;
				}

				List<Issue> projectIssues = support.getProjectIssues(project.getId());
				if (projectIssues == null || projectIssues.isEmpty()) {
					log.warn("No issues to estimate in project {}", projectKey);
					return null;
				}

				projectIssues = Lists.newArrayList(projectIssues);
				Collections.sort(projectIssues, rankComparator);

				projectEstimation = new ProjectEstimation(
						projectKey,
						projectProgressParametersFactory.getProjectProgressParameters(project.getId()),
						projectIssues.listIterator(),
						this.workdays.iterator());
				projectEstimations.put(projectKey, projectEstimation);
			}
			return projectEstimation;
		}

		void addBlockedIssue(Issue blocked) {
			blockedIssues.addLast(blocked);
		}

		void removeBlockedIssue(Issue expected) throws IllegalStateException {
			Issue actual = blockedIssues.peekLast();
			if (expected == actual) {
				blockedIssues.removeLast();
			} else {
				throw new IllegalStateException(
						"Last blocked issue is " + (actual == null ? null : actual.getKey()) +
						" but expected is " + expected.getKey());
			}
		}

		Date getWaitingDate(Issue issue) {
			final Status status = issue.getStatusObject();
			if (status == null || !IssueStatus.WAITING_FOR.value().equals(status.getName())) {
				return null;
			}

			final Object waitingDateObj = waitingDateField.getValue(issue);
			if (waitingDateObj instanceof Date) {
				return (Date)waitingDateObj;
			}
			throw new IllegalStateException(
					"Issue with status '" + IssueStatus.WAITING_FOR.value() +
					"' has illegal '" + IssueFieldName.WAITING_DATE.value() + "' value: " + waitingDateObj);
		}

		Date getEstimatedDate(Issue issue) {
			return issueEstimatedDates.get(issue.getKey());
		}

		void setEstimatedDate(Issue issue, Date estimatedDate) {
			issueEstimatedDates.put(issue.getKey(), estimatedDate);
			try {
				estimatedDateField.getCustomFieldType().updateValue(estimatedDateField, issue, toSqlDate(estimatedDate));
			} catch (Exception e) {
				log.error("Unable to clean estimatedDate field...", e);
			}
		}

		private java.sql.Date toSqlDate(Date date) {
			return date == null ? null : new java.sql.Date(date.getTime());
		}


		private class ProjectEstimation {

			private final DevelopmentProjectKey projectKey;
			private final ProjectProgressParameters progressParameters;
			private final Iterator<Issue> issueIterator;
			private final Iterator<Date> dateIterator;
			private final List<TimeResource> timeResources;

			ProjectEstimation(
					DevelopmentProjectKey projectKey,
					ProjectProgressParameters progressParameters,
					Iterator<Issue> issueIterator,
					Iterator<Date> dateIterator) {
				this.projectKey = projectKey;
				this.progressParameters = progressParameters;
				this.issueIterator = issueIterator;
				this.dateIterator = dateIterator;

				this.timeResources = Lists.newLinkedList();
			}

			ProjectEstimationException validateEstimationParameters() {
				if (progressParameters.getProjectDailyRate() <= 0) {
					return new ProjectEstimationException("The speed of the project " + projectKey +
						" must be a positive number (calculated or specified speed)");
				}
				return null;
			}

			void estimate() throws ProjectEstimationException {
				ProjectEstimationException exception = validateEstimationParameters();
				while (issueIterator.hasNext()) {
					final Issue issue = issueIterator.next();
					if (exception != null) {
						setEstimatedDate(issue, UNDEFINED_DATE);
						continue;
					}

					try {
						estimateIssue(issue);
					} catch (ProjectEstimationException e) {
						setEstimatedDate(issue, UNDEFINED_DATE);
						exception = e;
					}
				}
				if (exception != null) {
					throw exception;
				}
			}

			void estimateIssue(Issue issue) throws ProjectEstimationException {
				if (getEstimatedDate(issue) != null) {
					return;
				}
				if (log.isTraceEnabled()) {
					log.trace("Estimate issue {}", issue.getKey());
				}

				addBlockedIssue(issue);

				Date issueStartDate = getWaitingDate(issue);
				for (Issue blocker : support.getBlockingIssues(issue)) {
					issueStartDate = support.maxDate(issueStartDate, getBlockerEstimatedDate(blocker, issue));
				}
				scheduleIssue(issue, issueStartDate);

				try {
					removeBlockedIssue(issue);
				} catch (IllegalStateException e) {
					throw new ProjectEstimationException(e);
				}
			}

			/**
			 * Returns estimated date of <b>blocker</b> issue, which affects the <b>related</b> issue.
			 * May change rank of <b>blocker</b> before the <b>related</b>.
			 * @param blocker - blocker issue
			 * @param related - related issue
			 * @return estimated date of <b>blocker</b>
			 * @throws ProjectEstimationException if estimated date of <b>blocker</b> is not detected.
			 */
			private Date getBlockerEstimatedDate(Issue blocker, Issue related) throws ProjectEstimationException {
				Date blockerEstimatedDate = getEstimatedDate(blocker);
				if (blockerEstimatedDate == null) {
					if (support.isSameProject(related, blocker)) {
						rankIndexService.rankBefore(rankFieldId, blocker.getId(), related.getId());
						estimateIssue(blocker);
					} else {
						final DevelopmentProjectKey blockerProjectKey;
						try {
							blockerProjectKey = support.getMandatoryProjectKey(blocker);
						} catch (RuntimeException e) {
							throw new ProjectEstimationException(e);
						}

						estimateProject(blockerProjectKey);
					}

					blockerEstimatedDate = getEstimatedDate(blocker);
					if (blockerEstimatedDate == null) {
						throw new ProjectEstimationException(
							"Unable to get the value \"Estimated date\" of blocking ticket: " + blocker.getKey()
						);
					}
				}
				return blockerEstimatedDate;
			}

			/**
			 * Returns infinite iterator of {@link TimeResource} instances ordered by ascending date.
			 * @return instance of {@code Iterator<TimeResource>}
			 */
			private Iterator<TimeResource> getTimeResourceIterator() {
				return new TimeResourceIterator(
						timeResources.listIterator(),
						dateIterator,
						progressParameters.getProjectDailyRate());
			}

			private void scheduleIssue(Issue issue, Date startDate) {
				if (log.isTraceEnabled()) {
					log.trace("Schedule issue {}", issue.getKey());
				}

				final Iterator<TimeResource> timeResourceIterator = getTimeResourceIterator();
				final double singleTaskDailyRate = progressParameters.getSingleTaskDailyRate();

				TimeResource timeResource = timeResourceIterator.next();
				while (timeResource.getResource() <= 0) {
					timeResourceIterator.remove();
					timeResource = timeResourceIterator.next();
				}

				if (startDate != null) {
					while (timeResource.getDate().before(startDate)) {
						timeResource = timeResourceIterator.next();
					}
				}

				double estimate = support.getEstimate(issue);
				while (estimate > 0) {
					double timeResourceValue = timeResource.getResource();

					double resourcePart = Math.min(
							timeResourceValue,
							Math.min(estimate, singleTaskDailyRate));

					timeResource.useResource(resourcePart);

					estimate -= resourcePart;

					if (estimate > 0) {
						timeResource = timeResourceIterator.next();
					}
				}

				setEstimatedDate(issue, timeResource.getDate());
			}
		}
	}
}
