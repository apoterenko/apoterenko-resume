package qiwi.jira.plugins.greenhopper;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.greenhopper.service.rank.RankService;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.jql.builder.JqlClauseBuilder;

public interface RankedIssuesFactory {

	public Iterable<Issue> getRankedIssues(
			long rankFieldId, long rankPosition, RankChangeDirection direction,
			JqlClauseBuilder clauseBuilder, User user, RankService rankService);
}
