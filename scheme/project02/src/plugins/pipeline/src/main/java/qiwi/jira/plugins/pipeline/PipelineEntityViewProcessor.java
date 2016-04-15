package qiwi.jira.plugins.pipeline;

import qiwi.jira.plugins.job.pipeline.PipelineEntity;

class PipelineEntityViewProcessor implements PipelineEntityProcessor {

	@Override
	public PipelineEntity process(PipelineEntity entity, Object newValue) {
		return entity.setView(true);
	}
}
