package qiwi.jira.plugins.estimate.job;

import java.util.List;
import java.util.NoSuchElementException;

import org.apache.commons.lang.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import qiwi.jira.specific.IssueStatus;
import qiwi.jira.specific.ProjectName;
import qiwi.jira.util.UserHelper;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.jira.bc.issue.IssueService;
import com.atlassian.jira.bc.issue.IssueService.CreateValidationResult;
import com.atlassian.jira.bc.issue.IssueService.IssueResult;
import com.atlassian.jira.bc.issue.comment.CommentService;
import com.atlassian.jira.config.ConstantsManager;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.IssueInputParameters;
import com.atlassian.jira.issue.IssueInputParametersImpl;
import com.atlassian.jira.issue.comments.Comment;
import com.atlassian.jira.issue.issuetype.IssueType;
import com.atlassian.jira.issue.priority.Priority;
import com.atlassian.jira.issue.search.SearchException;
import com.atlassian.jira.issue.search.SearchProvider;
import com.atlassian.jira.issue.search.SearchResults;
import com.atlassian.jira.issue.status.Status;
import com.atlassian.jira.jql.builder.JqlQueryBuilder;
import com.atlassian.jira.project.Project;
import com.atlassian.jira.project.ProjectManager;
import com.atlassian.jira.util.ErrorCollection;
import com.atlassian.jira.util.SimpleErrorCollection;
import com.atlassian.jira.web.bean.PagerFilter;
import com.atlassian.query.Query;
import com.google.common.base.Predicate;
import com.google.common.collect.Iterables;

@Component
public class EstimationProblemNotifierImpl implements EstimationProblemNotifier {
	private static final transient Logger log = LoggerFactory.getLogger(EstimationProblemNotifierImpl.class);

	private final ConstantsManager constantsManager;
	private final CommentService commentService;
	private final ProjectManager projectManager;
	private final SearchProvider searchProvider;
	private final IssueService issueService;

	@Autowired
	public EstimationProblemNotifierImpl(
			ConstantsManager constantsManager,
			CommentService commentService,
			ProjectManager projectManager,
			SearchProvider searchProvider,
			IssueService issueService) {
		this.constantsManager = constantsManager;
		this.commentService = commentService;
		this.projectManager = projectManager;
		this.searchProvider = searchProvider;
		this.issueService = issueService;
	}

	@Override
	public void addEstimationProblemMessage(String estimationProblemMessage) {
		final User leadUser = getSAProject().getLeadUser();
		final Issue problemIssue = getProblemIssue(leadUser);
		if (problemIssue == null) {
			return;
		}

		final String commentBody = PROBLEM_COMMENT_PREFIX + estimationProblemMessage;
		final Comment lastProblemComment = getLastProblemComment(problemIssue, leadUser);

		if (lastProblemComment != null && lastProblemComment.getBody().equals(commentBody)) {
			log.info("Last comment about estimation problems in {} is actual", problemIssue.getKey());
			return;
		}

		final ErrorCollection errors = new SimpleErrorCollection();
		commentService.create(leadUser, problemIssue, commentBody, true, errors);
	}

	protected Project getSAProject() {
		return projectManager.getProjectObjByKey(ProjectName.SYSTEMS_ANALYSIS.value());
	}

	protected Query getProblemIssueSearchQuery() {
		return JqlQueryBuilder.newBuilder()
			.where()
				.project(getSAProject().getId())
				.and()
				.summary(PROBLEM_ISSUE_SUMMARY)
				.and()
				.status().notEq(IssueStatus.CLOSED.value())
			.endWhere()
			.buildQuery();
	}

	protected Issue getProblemIssue(User leadUser) {
		final Query searchQuery = getProblemIssueSearchQuery();
		try {
			final SearchResults searchResults = searchProvider.search(
					searchQuery, leadUser, PagerFilter.getUnlimitedFilter()//newPageAlignedFilter(0, 1)
				);
			final List<Issue> foundIssues = searchResults.getIssues();

			if (foundIssues != null && !foundIssues.isEmpty()) {
				// TODO wait JIRA 5.0 for bugfix of issue search by summary.
				for (Issue issue : foundIssues) {
					if (issue != null && PROBLEM_ISSUE_SUMMARY.equals(issue.getSummary())) {
						log.debug("found problem issue: {}[{}]", issue.getKey(), issue.getSummary());
						return issue;
					}
				}
			}
		} catch (SearchException e) {
			log.error("Error while search of Estimation Problem Issue", e);
		}

		return createProblemIssue(leadUser);
	}

	protected Issue createProblemIssue(User leadUser) {
		UserHelper.setLoggedInUser(leadUser);

		final IssueInputParameters issueInputParameters = createIssueInputParameters(leadUser);
		final CreateValidationResult createValidationResult =
				issueService.validateCreate(leadUser, issueInputParameters);

		if (createValidationResult.isValid()) {
			IssueResult createResult = issueService.create(leadUser, createValidationResult);
			Issue issue = createResult.getIssue();
			log.debug("Created issue: {}[{}]", issue.getKey(), issue.getSummary());

			return createResult.getIssue();

		} else if (log.isErrorEnabled()) {
			StringBuilder builder = new StringBuilder("Can't create problem issue:\n");
			for (String errorMessage : createValidationResult.getErrorCollection().getErrorMessages()) {
				builder.append(errorMessage).append('\n');
			}

			log.error(builder.toString());
		}
		return null;
	}

	protected IssueInputParameters createIssueInputParameters(User leadUser) {
		return new IssueInputParametersImpl()
				.setProjectId(getSAProject().getId())
				.setSummary(PROBLEM_ISSUE_SUMMARY)
				.setIssueTypeId(single(
						constantsManager.getAllIssueTypeObjects(),
						PROBLEM_ISSUE_TYPE_PREDICATE
					).getId())
				.setPriorityId(single(
						constantsManager.getPriorityObjects(),
						PROBLEM_ISSUE_PRIORITY_PREDICATE
					).getId())
				.setStatusId(single(
						constantsManager.getStatusObjects(),
						PROBLEM_ISSUE_STATUS_PREDICATE
					).getId())
				.setOriginalEstimate(PROBLEM_ISSUE_ORIGINAL_ESTIMATE)
				.setReporterId(leadUser.getName())
				.setAssigneeId(leadUser.getName())
				;
	}

	protected Comment getLastProblemComment(Issue problemIssue, User user) {
		final ErrorCollection errors = new SimpleErrorCollection();
		final List<Comment> comments = commentService.getCommentsForUser(user, problemIssue, errors);

		Comment lastProblemComment = null;
		for (Comment comment : Iterables.filter(comments, PROBLEM_COMMENT_PREDICATE)) {
			if (lastProblemComment == null ||
				lastProblemComment.getCreated().before(comment.getCreated())) {
				lastProblemComment = comment;
			}
		}
		return lastProblemComment;
	}


	private static <T> T single(Iterable<T> iterable, Predicate<T> predicate) {
		for (T instance : Iterables.filter(iterable, predicate)) {
			return instance;
		}
		throw new NoSuchElementException();
	}

	private static final String PROBLEM_ISSUE_TYPE_NAME = "Bug";
	private static final Predicate<IssueType> PROBLEM_ISSUE_TYPE_PREDICATE = new Predicate<IssueType>() {
		@Override
		public boolean apply(IssueType issueType) {
			return PROBLEM_ISSUE_TYPE_NAME.equals(issueType.getName());
		}
	};

	private static final String PROBLEM_ISSUE_PRIORITY_NAME = "Major";
	private static final Predicate<Priority> PROBLEM_ISSUE_PRIORITY_PREDICATE = new Predicate<Priority>() {
		@Override
		public boolean apply(Priority priority) {
			return PROBLEM_ISSUE_PRIORITY_NAME.equals(priority.getName());
		}
	};

	private static final String PROBLEM_ISSUE_STATUS_NAME = "Open";
	private static final Predicate<Status> PROBLEM_ISSUE_STATUS_PREDICATE = new Predicate<Status>() {
		@Override
		public boolean apply(Status status) {
			return PROBLEM_ISSUE_STATUS_NAME.equals(status.getName());
		}
	};

	private static final String PROBLEM_ISSUE_SUMMARY =
			"Проблемы при автоматическом расчёте дат реализации тикетов в проектах";

	private static final String PROBLEM_COMMENT_PREFIX = "Estimation problems:\n";

	private static final Predicate<Comment> PROBLEM_COMMENT_PREDICATE = new Predicate<Comment>() {
		@Override
		public boolean apply(Comment comment) {
			final String commentBody = comment.getBody();
			return commentBody.startsWith(PROBLEM_COMMENT_PREFIX);
		}
	};

	private static final long SECONDS_PER_WORKDAY = 8 * DateUtils.MILLIS_PER_HOUR / DateUtils.MILLIS_PER_SECOND;
	private static final long PROBLEM_ISSUE_ORIGINAL_ESTIMATE = 2 * SECONDS_PER_WORKDAY;
}
