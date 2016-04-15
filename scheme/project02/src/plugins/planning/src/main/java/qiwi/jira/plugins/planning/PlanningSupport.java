package qiwi.jira.plugins.planning;

import com.atlassian.greenhopper.service.rank.RankIndexService;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.project.ProjectManager;
import com.google.common.base.Function;
import com.google.common.base.Predicate;
import com.google.common.base.Predicates;
import com.google.common.collect.Collections2;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import qiwi.jira.plugins.estimate.ProjectProgressParameters;
import qiwi.jira.plugins.estimate.ProjectProgressParametersFactory;
import qiwi.jira.plugins.job.estimate.EstimationIssuesLoader;
import qiwi.jira.plugins.job.estimate.ProjectIssueLoader;
import qiwi.jira.specific.DevelopmentProjectIds;

import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Component
class PlanningSupport {

	@Autowired
	@Qualifier("qiwi-project-issue-loader-wrapper")
	private ProjectIssueLoader projectIssueLoader;
	@Autowired
	@Qualifier("qiwi-estimation-issues-loader-wrapper")
	private EstimationIssuesLoader estimationIssuesLoader;
	@Autowired
	private PlanningService planningService;
	@Autowired
	private ProjectProgressParametersFactory projectProgressParametersFactory;
	@Autowired
	private DevelopmentProjectIds developmentProjectIds;
	@Autowired
	private ProjectManager projectManager;
	@Autowired
	private PlanningIssuesSorter planningIssuesSorter;

	public Iterable<Issue> filterSAProjectIssues() {
		return Iterables.filter(
			projectIssueLoader.loadSAProjectIssues(),
			FILTERED_SA_PROJECT_ISSUES_PREDICATE
		);
	}

	public Collection<PlanningIssueInfo> toPlanningIssuesInfo(
		List<Issue> from,
		final RankIndexService rankIndexService
	) {
		return Collections2.transform(
			from,
			createIssueToPlanningIssueInfoFunction(rankIndexService)
		);
	}

	public Collection<ProjectProgressParameters> toActualProjectProgressParameters() {
		final List<ProjectProgressParameters> list = Lists.newArrayList((
			Collections2.transform(
				developmentProjectIds.INSTANCE,
				TO_PROJECT_PROGRESS_PARAMETERS_WRAPPER_FUNCTION
			)
		));
		Collections.sort(list, PROJECT_PROGRESS_PARAMETERS_COMPARATOR);
		return list;
	}

	private Function<Issue, PlanningIssueInfo> createIssueToPlanningIssueInfoFunction(
		final RankIndexService rankIndexService
	) {
		return new Function<Issue, PlanningIssueInfo>() {

			@Override
			public PlanningIssueInfo apply(Issue from) {
				return new PlanningIssueInfo(
					from,
					planningService.getRankFieldObject(),
					rankIndexService,
					planningIssuesSorter
				);
			}
		};
	}

	private final Comparator<ProjectProgressParameters> PROJECT_PROGRESS_PARAMETERS_COMPARATOR =
		new Comparator<ProjectProgressParameters>() {

			@Override
			public int compare(ProjectProgressParameters o1, ProjectProgressParameters o2) {
				if (o1 == o2) {
					return 0;
				}
				return o2.getProjectDailyRate() > o1.getProjectDailyRate() ? 1 : -1;
			}
		};

	private final Function<Long, ProjectProgressParameters> TO_PROJECT_PROGRESS_PARAMETERS_WRAPPER_FUNCTION =
		new Function<Long, ProjectProgressParameters>() {

			@Override
			public ProjectProgressParameters apply(Long from) {
				return new ProjectProgressParametersWrapper(
					projectProgressParametersFactory.getProjectProgressParameters(from),
					projectManager,
					from
				);
			}
		};

	private final Predicate<Issue> FILTERED_SA_PROJECT_ISSUES_PREDICATE = Predicates.and(
		/* Пропускаем подзадачи */
		Predicates.not(
			new Predicate<Issue>() {

				@Override
				public boolean apply(Issue issue) {
					return issue != null && issue.isSubTask();
				}
			}
		),
		/* Задачи SA, имеющие Implementation-задачи */
		new Predicate<Issue>() {

			@Override
			public boolean apply(Issue issue) {
				if (issue == null) {
					return false;
				}
				boolean f = !estimationIssuesLoader.getImplementationIssues(issue).isEmpty();
				if (f) {
					return f;
				}
				for (Issue subTask : issue.getSubTaskObjects()) {
					f = f || apply(subTask);
				}
				return f;
			}
		}
	);
}
