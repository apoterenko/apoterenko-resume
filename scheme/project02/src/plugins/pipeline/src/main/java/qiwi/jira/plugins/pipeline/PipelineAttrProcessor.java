package qiwi.jira.plugins.pipeline;

import qiwi.jira.plugins.job.pipeline.PipelineEntity;

import java.util.List;
import java.util.Map;

public interface PipelineAttrProcessor {

	void processEntities(Map parameters) throws Exception;

	List<PipelineEntity> extractEntities() throws Exception;
}
