package qiwi.jira.plugins.pipeline;

public interface PipelineFieldAccessor {

	Long getValue(PipelineFieldAccessorEnum pipelineFieldAccessorEnum, String key);
}
