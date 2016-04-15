package qiwi.jira.plugins.planning;

import com.atlassian.jira.project.ProjectManager;
import qiwi.jira.plugins.estimate.ProjectProgressParameters;

import java.text.NumberFormat;
import java.util.Locale;

public class ProjectProgressParametersWrapper implements ProjectProgressParameters {

	private static final String DEFAULT_LANGUAGE = "ru";

	private final NumberFormat format;
	private final ProjectManager projectManager;
	private final ProjectProgressParameters projectProgressParameters;

	private final long projectId;

	public ProjectProgressParametersWrapper(
		ProjectProgressParameters projectProgressParameters,
		ProjectManager projectManager,
		long projectId
	) {
		this.projectId = projectId;
		this.projectManager = projectManager;
		this.projectProgressParameters = projectProgressParameters;
		this.format = createNumberFormat();
	}

	@Override
	public double getProjectDailyRate() {
		return projectProgressParameters.getProjectDailyRate();
	}

	@Override
	public double getSingleTaskDailyRate() {
		return projectProgressParameters.getSingleTaskDailyRate();
	}

	@Override
	public int getParallelTasksCount() {
		return projectProgressParameters.getParallelTasksCount();
	}

	public String getFormattedProjectDailyRate() {
		return this.format.format(projectProgressParameters.getProjectDailyRate());
	}

	public String getFormattedSingleTaskDailyRate() {
		return this.format.format(projectProgressParameters.getSingleTaskDailyRate());
	}

	public String getProjectKey() {
		return projectManager.getProjectObj(projectId).getKey();
	}

	private NumberFormat createNumberFormat() {
		final NumberFormat format = NumberFormat.getInstance(new Locale(DEFAULT_LANGUAGE));
		format.setMaximumFractionDigits(2);
		format.setMinimumFractionDigits(2);
		return format;
	}
}