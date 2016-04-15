package qiwi.jira.plugins.greenhopper;

import java.util.Collection;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.util.NotNull;

public interface SlaveIssueFactory {

	@NotNull
	public Collection<Issue> getSlaveIssues(Issue master, User user);
}
