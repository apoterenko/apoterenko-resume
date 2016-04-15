package qiwi.jira.plugins.planning;

import com.atlassian.greenhopper.service.rank.RankIndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Component
class PlanningIssuesSorter {

	@Autowired
	private PlanningService planningService;

	public void sort(
		List<PlanningIssueInfo> list,
		final RankIndexService rankIndexService
	) {
		final long rankFieldId = planningService.getRankFieldObject().getIdAsLong();
		Collections.sort(
			list,
			new Comparator<PlanningIssueInfo>() {

				@Override
				public int compare(PlanningIssueInfo o1, PlanningIssueInfo o2) {
					if (o1 == o2) {
						return 0;
					}
					final long issuePosition1 = rankIndexService.getIssuePosition(rankFieldId, o1.getIssueId());
					final long issuePosition2 = rankIndexService.getIssuePosition(rankFieldId, o2.getIssueId());
					return issuePosition1 == issuePosition2 ? 0 : issuePosition2 > issuePosition1 ? -1 : 1;
				}
			}
		);
	}
}