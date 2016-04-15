package qiwi.jira.plugins.job.pipeline;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.jira.issue.search.SearchException;

public interface PipelineSpeedProcessor {

	double process(long projectId, User user) throws SearchException;
}