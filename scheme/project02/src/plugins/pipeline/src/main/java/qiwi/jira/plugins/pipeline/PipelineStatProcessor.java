package qiwi.jira.plugins.pipeline;

import java.util.List;

public interface PipelineStatProcessor {

	List<PipelineStatEntity> process() throws Exception;
}
