package qiwi.jira.plugins.job.estimate;

import java.util.List;

import com.atlassian.jira.issue.Issue;

public interface ProjectIssueLoader {

	List<Issue> loadProjectIssues(long projectId);

	List<Issue> loadSAProjectIssues();
}
