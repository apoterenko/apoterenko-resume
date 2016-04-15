package qiwi.jira.plugins.job.pipeline;

/**
 * Public api for retrieve speed of pipeline
  */
public interface PipelineSpeed {

	double fixedSpeed(long projectId);

	double calculatedSpeed(long projectId) throws Exception;
}
