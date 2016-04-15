package qiwi.jira.plugins.job.pipeline;

import java.util.Collection;

public interface PipelineProcessor {

	Collection<Long> extractIds();

	PipelineEntity load(long id);

	PipelineEntity create(long id);

	PipelineEntity save(PipelineEntity entity);
}