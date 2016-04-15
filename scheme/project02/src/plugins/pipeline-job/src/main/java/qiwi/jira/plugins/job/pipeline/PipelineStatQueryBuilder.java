package qiwi.jira.plugins.job.pipeline;

import com.atlassian.query.Query;

public interface PipelineStatQueryBuilder {

	Query buildQuery(PipelineStatRequest request);
}