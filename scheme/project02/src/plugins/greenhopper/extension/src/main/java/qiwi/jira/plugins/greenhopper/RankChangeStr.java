package qiwi.jira.plugins.greenhopper;

import com.atlassian.greenhopper.service.rank.RankChange;
import com.atlassian.jira.component.ComponentAccessor;
import com.atlassian.jira.issue.Issue;

public class RankChangeStr {

	private final RankChange rankChange;

	public RankChangeStr(RankChange rankChange) {
		this.rankChange = rankChange;
	}

	public String toString() {
		Issue issue = ComponentAccessor.getIssueManager().getIssueObject(rankChange.getIssueId());
		return new StringBuilder()
			.append("RankChange [type=").append(rankChange.getType())
			.append(", customFieldId=").append(rankChange.getCustomFieldId())
			.append(", issueId=").append(rankChange.getIssueId())
			.append(", issueKey=").append(issue.getKey())
			.append(", projectKey=").append(issue.getProjectObject().getKey())
			.append(", oldPosition=").append(rankChange.getOldPosition())
			.append(", newPosition=").append(rankChange.getNewPosition())
			.append(", oldPreviousId=").append(rankChange.getOldPreviousId())
			.append(", oldNextId=").append(rankChange.getOldNextId())
			.append(", newPreviousId=").append(rankChange.getNewPreviousId())
			.append(", newNextId=").append(rankChange.getNewNextId())
			.append("]")
			.toString();
	}
}
