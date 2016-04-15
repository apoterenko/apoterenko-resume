package qiwi.jira.plugins.estimate;

public interface ProjectProgressParameters {

	double getProjectDailyRate();

	double getSingleTaskDailyRate();

	int getParallelTasksCount();
}
