package qiwi.jira.plugins.job.pipeline;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.jira.project.ProjectManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("qiwi-pipeline-speed")
public class PipelineSpeedImpl implements PipelineSpeed {

	private final PipelineProcessor pipelineProcessor;
	private final PipelineSpeedProcessor pipelineSpeedProcessor;
	private final ProjectManager projectManager;

	@Autowired
	public PipelineSpeedImpl(
		PipelineProcessor pipelineProcessor,
		PipelineSpeedProcessor pipelineSpeedProcessor,
		ProjectManager projectManager
	) {
		this.pipelineProcessor = pipelineProcessor;
		this.pipelineSpeedProcessor = pipelineSpeedProcessor;
		this.projectManager = projectManager;
	}

	@Override
	public double fixedSpeed(long projectId) {
		final PipelineEntity entity = pipelineProcessor.load(projectId);
		return entity != null ? entity.getValue() : 0;
	}

	@Override
	public double calculatedSpeed(long projectId) throws Exception {
		return pipelineSpeedProcessor.process(projectId, getUser(projectId));
	}

	private User getUser(long projectId) {
		return projectManager.getProjectObj(projectId).getLeadUser();
	}
}