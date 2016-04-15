package qiwi.jira.plugins.estimate;

public class ProjectProgressParametersImpl implements ProjectProgressParameters {

	private final double projectDailyRate;
	private final double singleTaskDailyRate;
	private final int parallelTasksCount;

	public ProjectProgressParametersImpl(
		double projectDailyRate,
		double effectiveWorkdayFactor
	) {
		this.projectDailyRate = projectDailyRate;
		this.parallelTasksCount = Math.max(1, (int) Math.floor(projectDailyRate / effectiveWorkdayFactor));
		this.singleTaskDailyRate = projectDailyRate / this.parallelTasksCount;
	}

	@Override
	public double getProjectDailyRate() {
		return projectDailyRate;
	}

	@Override
	public double getSingleTaskDailyRate() {
		return singleTaskDailyRate;
	}

	@Override
	public int getParallelTasksCount() {
		return parallelTasksCount;
	}
}