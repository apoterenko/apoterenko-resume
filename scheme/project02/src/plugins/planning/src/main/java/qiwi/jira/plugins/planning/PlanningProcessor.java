package qiwi.jira.plugins.planning;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.greenhopper.service.rank.RankIndexService;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.search.SearchException;

import com.google.common.collect.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import qiwi.jira.plugins.estimate.*;
import qiwi.jira.util.UserHelper;

import java.util.*;

@Component
class PlanningProcessor {
	private static final transient Logger log = LoggerFactory.getLogger(PlanningProcessor.class);

	@Autowired
	private EstimationService estimationService;
	@Autowired
	private PlanningService planningService;
	@Autowired
	private PlanningSupport planningSupport;
	@Autowired
	private PlanningIssuesSorter planningIssuesSorter;

	public List<PlanningIssueInfo> selectIssuesInfo(RankIndexService rankIndexService) throws SearchException {
		final List<PlanningIssueInfo> list = Lists.newArrayList(
			planningSupport.toPlanningIssuesInfo(
				Lists.newArrayList(planningSupport.filterSAProjectIssues()),
				rankIndexService
			)
		);
		estimate(rankIndexService, list);
		return adjustPersistenceDates(list);
	}

	public Map<String, Date> changeIssueRank(PlanningRequest request, List<PlanningIssueInfo> list) {
		reorganize(request);
		return estimate(request.getRankIndexService(), list);
	}

	private List<PlanningIssueInfo> adjustPersistenceDates(List<PlanningIssueInfo> issuesInfo) {
		for (PlanningIssueInfo planningIssueInfo : issuesInfo) {
			planningIssueInfo.setPersistenceEstimatedDate(planningIssueInfo.getVirtualEstimatedDate());
			planningIssueInfo.resetVirtualEstimatedDate();
		}
		return issuesInfo;
	}

	private Map<String, Date> estimate(RankIndexService rankIndexService, List<PlanningIssueInfo> issuesInfo) {
		final Map<String, Date> issueEstimatedDates = Maps.newHashMap();
		try {
			estimationService.estimate(
				rankIndexService,
				planningService.createCustomField(issuesInfo),
				issueEstimatedDates
			);
		} catch (EstimationException e) {
			log.error("PlanningProcessor exception: {}", EstimationMessageHelper.makeEstimationProblemMessage(e));
		} finally {
			planningIssuesSorter.sort(issuesInfo, rankIndexService);
		}
		return issueEstimatedDates;
	}

	private void reorganize(PlanningRequest request) {
		final User user = UserHelper.getLeadUser(planningService.getSystemAnalyzeProject().getId());
		final Issue currentIssue = planningService.getIssueObject(request.getCurrentIssueId());
		final Issue targetIssue = planningService.getIssueObject(request.getTargetIssueId());
		final long rankFieldId = planningService.getRankFieldObject().getIdAsLong();

		switch (request.getPlanningPriorityDirection()) {
			case AFTER:
				request.getRankService().rankAfter(user, rankFieldId, currentIssue, targetIssue);
				break;
			case BEFORE:
				request.getRankService().rankBefore(user, rankFieldId, currentIssue, targetIssue);
				break;
		}
	}
}