package qiwi.jira.plugins.planning;

import com.atlassian.greenhopper.service.rank.RankIndexService;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.fields.CustomField;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import qiwi.jira.plugins.job.estimate.EstimationIssuesLoader;

import java.util.*;

@Component
class PlanningExtProcessor {

	@Autowired
	private PlanningSupport planningSupport;
	@Autowired
	private PlanningService planningService;
	@Autowired
	@Qualifier("qiwi-estimation-issues-loader-wrapper")
	private EstimationIssuesLoader estimationIssuesLoader;

	public void applyExtraValues(
		RankIndexService rankIndexService,
		List<PlanningIssueInfo> issuesInfo,
		Map<String, Date> issueEstimatedDates
	) {
		final CustomField estimatedField = planningService.getEstimatedFieldObject();
		for (PlanningIssueInfo planningIssueInfo : issuesInfo) {
			planningIssueInfo.setImplementationIssues(
				createDevelopmentIssues(
					getAllImplementationIssues(
						planningIssueInfo.getIssue()
					),
					issueEstimatedDates,
					rankIndexService,
					estimatedField
				)
			);
			planningIssueInfo.setBlockingIssues(
				createDevelopmentIssues(
					getAllBlockingIssues(
						planningIssueInfo.getIssue()
					),
					issueEstimatedDates,
					rankIndexService,
					estimatedField
				)
			);
		}
	}

	private Set<PlanningIssueInfo> createDevelopmentIssues(
		List<Issue> issues,
		Map<String, Date> issueEstimatedDates,
		RankIndexService rankIndexService,
		CustomField estimatedField
	) {
		final Set<PlanningIssueInfo> implementationIssues = Sets.newHashSet(
			planningSupport.toPlanningIssuesInfo(
				issues,
				rankIndexService
			)
		);
		for (PlanningIssueInfo planningIssueInfo : implementationIssues) {
			planningIssueInfo.setVirtualEstimatedDate(
				nvl(
					issueEstimatedDates.get(planningIssueInfo.getIssueKey()),
					(Date) planningIssueInfo.getIssue().getCustomFieldValue(estimatedField)
				)
			);
		}
		return implementationIssues;
	}

	private List<Issue> getAllBlockingIssues(Issue issue) {
		return Collections.unmodifiableList(getAllBlockingIssues(issue, Lists.<Issue>newLinkedList()));
	}

	private List<Issue> getAllBlockingIssues(Issue issue, List<Issue> issues) {
		issues.addAll(estimationIssuesLoader.getBlockingIssues(issue));
		for (Issue subTask : issue.getSubTaskObjects()) {
			issues.addAll(getAllBlockingIssues(subTask));
		}
		return issues;
	}

	private List<Issue> getAllImplementationIssues(Issue issue) {
		return Collections.unmodifiableList(getAllImplementationIssues(issue, Lists.<Issue>newLinkedList()));
	}

	private List<Issue> getAllImplementationIssues(Issue issue, List<Issue> issues) {
		issues.addAll(estimationIssuesLoader.getImplementationIssues(issue));
		for (Issue subTask : issue.getSubTaskObjects()) {
			issues.addAll(getAllImplementationIssues(subTask));
		}
		return issues;
	}

	private <T> T nvl(T o1, T o2) {
		return o1 != null ? o1 : o2;
	}
}