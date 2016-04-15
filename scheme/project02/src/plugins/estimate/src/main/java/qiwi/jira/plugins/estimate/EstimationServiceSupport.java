package qiwi.jira.plugins.estimate;

import java.util.*;

import org.apache.commons.lang.time.DateUtils;
import org.joda.time.ReadableDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import qiwi.jira.plugins.calendar.CalendarService;
import qiwi.jira.plugins.job.estimate.EstimationIssuesLoader;
import qiwi.jira.specific.DevelopmentProjectKey;
import qiwi.jira.specific.date.DateService;
import qiwi.jira.util.DateFunctions;

import com.atlassian.jira.issue.CustomFieldManager;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.fields.CustomField;
import com.atlassian.jira.project.Project;
import com.atlassian.jira.project.ProjectManager;
import com.google.common.base.Predicate;
import com.google.common.collect.Iterables;
import qiwi.jira.util.EnumHelper;
import qiwi.jira.plugins.job.estimate.ProjectIssueLoader;

@Component
public class EstimationServiceSupport {
	private static final long SECONDS_PER_WORKDAY = 8 * DateUtils.MILLIS_PER_HOUR / DateUtils.MILLIS_PER_SECOND;

	private final DateService dateService;
	private final CalendarService calendarService;

	private final CustomFieldManager customFieldManager;

	private final ProjectManager projectManager;
	private final ProjectIssueLoader projectIssueLoader;
	private final EstimationIssuesLoader estimationIssuesLoader;

	@Autowired
	public EstimationServiceSupport(
			DateService dateService,
			CalendarService calendarService,
			CustomFieldManager customFieldManager,
			ProjectManager projectManager,
			@Qualifier("qiwi-project-issue-loader-wrapper") ProjectIssueLoader projectIssueLoader,
			@Qualifier("qiwi-estimation-issues-loader-wrapper") EstimationIssuesLoader estimationIssuesLoader
	) {
		this.estimationIssuesLoader = estimationIssuesLoader;
		this.dateService = dateService;
		this.calendarService = calendarService;

		this.customFieldManager = customFieldManager;

		this.projectManager = projectManager;
		this.projectIssueLoader = projectIssueLoader;
	}

	protected Project getProject(String key) {
		return projectManager.getProjectObjByKey(key);
	}

	protected CustomField getCustomField(String name) {
		return customFieldManager.getCustomFieldObjectByName(name);
	}

	protected List<Issue> getProjectIssues(long projectId) {
		return projectIssueLoader.loadProjectIssues(projectId);
	}

	protected List<Issue> getSAProjectIssues() {
		return projectIssueLoader.loadSAProjectIssues();
	}

	protected List<Issue> getBlockingIssues(Issue issue) {
		return estimationIssuesLoader.getBlockingIssues(issue);
	}

	protected List<Issue> getImplementationIssues(Issue issue) {
		return estimationIssuesLoader.getImplementationIssues(issue);
	}

	protected Iterable<Date> getWorkdaysFromToday() {
		return Iterables.transform(
			Iterables.filter(
				dateService.getDaysFromDate(new Date(), TimeZone.getDefault()),
				new Predicate<ReadableDateTime>() {
					@Override
					public boolean apply(ReadableDateTime dateTime) {
						return calendarService.isWorkday(dateTime);
					}
				}
			),
			DateFunctions.JODATIME_TO_DATE);
	}

	/**
	 * Returns estimate of {@code issue} in workdays.
	 * @param issue - issue whose estimate value is interested
	 * @return estimate of issue in workdays.
	 */
	protected double getEstimate(Issue issue) {
		Long estimate = issue.getEstimate();
		return estimate != null ? estimate / SECONDS_PER_WORKDAY : 0;
	}

	protected Date maxDate(Date d1, Date d2) {
		return d1 == null ? d2 : d2 == null ? d1 :
			d1.after(d2) ? d1 : d2;
	}

	protected boolean isSameProject(Issue issue1, Issue issue2) {
		return issue1.getProjectObject().equals(issue2.getProjectObject());
	}

	protected DevelopmentProjectKey getMandatoryProjectKey(Issue issue) {
		final String key = issue.getProjectObject().getKey();
		if (!EnumHelper.exists(key, DevelopmentProjectKey.class)) {
			throw new IllegalArgumentException(
				"The ticket " + issue.getKey() + " is not a development's ticket, so it's processing (receiving \"Estimated date\") fails");
		}
		return DevelopmentProjectKey.valueOf(key);
	}
}
