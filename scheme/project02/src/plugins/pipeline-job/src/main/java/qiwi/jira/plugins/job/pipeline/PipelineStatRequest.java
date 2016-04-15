package qiwi.jira.plugins.job.pipeline;

public class PipelineStatRequest {

	private long from;
	private long to;
	private long projectId;

	public long getProjectId() {
		return projectId;
	}

	public PipelineStatRequest setProjectId(long projectId) {
		this.projectId = projectId;
		return this;
	}

	public long getFrom() {
		return from;
	}

	public PipelineStatRequest setFrom(long from) {
		this.from = from;
		return this;
	}

	public long getTo() {
		return to;
	}

	public PipelineStatRequest setTo(long to) {
		this.to = to;
		return this;
	}
}