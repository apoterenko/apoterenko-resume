package qiwi.jira.plugins.planning;

import com.atlassian.greenhopper.service.rank.RankIndexService;
import com.atlassian.greenhopper.service.rank.RankService;

class PlanningRequest {

	private final Long currentIssueId;
	private final Long targetIssueId;
	private final RankIndexService rankIndexService;
	private final RankService rankService;
	private final PlanningPriorityDirection planningPriorityDirection;

	public PlanningRequest(
		Long currentIssueId,
		Long targetIssueId,
		PlanningPriorityDirection planningPriorityDirection,
		RankService rankService,
		RankIndexService rankIndexService
	) {
		this.currentIssueId = currentIssueId;
		this.targetIssueId = targetIssueId;
		this.rankIndexService = rankIndexService;
		this.rankService = rankService;
		this.planningPriorityDirection = planningPriorityDirection;
	}

	public Long getTargetIssueId() {
		return targetIssueId;
	}

	public Long getCurrentIssueId() {
		return currentIssueId;
	}

	public RankIndexService getRankIndexService() {
		return rankIndexService;
	}

	public RankService getRankService() {
		return rankService;
	}

	public PlanningPriorityDirection getPlanningPriorityDirection() {
		return planningPriorityDirection;
	}
}