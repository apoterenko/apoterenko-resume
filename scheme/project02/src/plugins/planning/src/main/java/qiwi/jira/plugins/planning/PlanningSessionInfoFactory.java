package qiwi.jira.plugins.planning;

import com.atlassian.greenhopper.service.rank.RankIndexService;
import com.atlassian.greenhopper.service.rank.RankService;
import com.atlassian.jira.issue.search.SearchException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class PlanningSessionInfoFactory {

	@Autowired
	private PlanningService planningService;
	@Autowired
	private PlanningProcessor planningProcessor;

	public PlanningSessionInfo createPlanningSessionInfo() throws SearchException {
		final RankIndexService rankIndexService = planningService.createRankIndexService();
		final RankService rankService = planningService.createRankService(rankIndexService);
		return new PlanningSessionInfo(
			rankService,
			rankIndexService,
			planningProcessor.selectIssuesInfo(rankIndexService)
		);
	}
}