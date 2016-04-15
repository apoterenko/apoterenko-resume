package qiwi.jira.plugins.job.estimate;

import com.atlassian.jira.issue.Issue;

import java.util.List;

public interface EstimationIssuesLoader {

	List<Issue> getBlockingIssues(Issue issue);

	List<Issue> getImplementationIssues(Issue issue);
}
