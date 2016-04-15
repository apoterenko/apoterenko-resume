package qiwi.jira.plugins.pipeline;

import qiwi.jira.plugins.job.pipeline.PipelineEntity;

interface PipelineEntityProcessor {

	PipelineEntity process(PipelineEntity entity, Object newValue);
}