package qiwi.jira.plugins.job.pipeline;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.search.SearchException;

import java.util.List;

public interface PipelineStatFinder {

	List<Issue> find(PipelineStatRequest request, User user) throws SearchException;
}