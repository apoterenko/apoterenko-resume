package qiwi.jira.plugins.greenhopper;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.greenhopper.service.rank.RankService;
import com.atlassian.jira.issue.Issue;

public interface MasterIssueFactory {

	public boolean isMasterIssue(Issue issue);

	public Iterable<Issue> getMasterIssues(
			Issue referenceMaster,
			Long rankFieldId, RankChangeDirection direction,
			User user,
			RankService rankService,
			RankEntryFactory rankEntryFactory);
}
