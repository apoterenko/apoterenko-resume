package qiwi.jira.plugins.estimate;

import com.atlassian.jira.project.Project;
import com.atlassian.jira.project.ProjectManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import qiwi.jira.plugins.job.pipeline.PipelineSpeed;

@Service("qiwi-project-progress-parameters-factory")
public class ProjectProgressParametersFactoryImpl implements ProjectProgressParametersFactory {

	private static final transient Logger log = LoggerFactory.getLogger(ProjectProgressParametersFactoryImpl.class);

	@Autowired
	@Qualifier("qiwi-pipeline-speed-wrapper")
	private PipelineSpeed pipelineSpeed;
	@Autowired
	private ProjectManager projectManager;

	@Override
	public ProjectProgressParameters getProjectProgressParameters(long projectId) {
		double estimatedMonthlyRate = pipelineSpeed.fixedSpeed(projectId);
		if (estimatedMonthlyRate == 0) {
			try {
				estimatedMonthlyRate = pipelineSpeed.calculatedSpeed(projectId);
			} catch (Exception e) {
				log.error("Can't obtain calculated project speed for project by id " + projectId, e);
			}
		}
		final ProjectProgressParameters projectProgressParameters = new ProjectProgressParametersImpl(
				estimatedMonthlyRate / ProjectProgressConstants.WORKDAYS_PER_MONTH,
				ProjectProgressConstants.EFFECTIVE_WORKDAY_FACTOR);
		if (log.isDebugEnabled()) {
			final Project project = projectManager.getProjectObj(projectId);
			if (project != null) {
				log.debug("Project: " + project.getKey() + ", parallelTasksCount: "
					+ projectProgressParameters.getParallelTasksCount() + ", singleTaskDailyRate: "
					+ projectProgressParameters.getSingleTaskDailyRate() + ", projectDailyRate: " +
					+projectProgressParameters.getProjectDailyRate());
			}
		}
		return projectProgressParameters;
	}
}