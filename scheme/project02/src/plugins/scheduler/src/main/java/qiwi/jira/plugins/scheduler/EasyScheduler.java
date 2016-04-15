package qiwi.jira.plugins.scheduler;

import java.util.Date;

public interface EasyScheduler {
	String JOB_SUFFIX = ":job";

	String scheduleJob(Runnable job, long interval);

	String scheduleJob(Runnable job, Date startDate, long interval);

	void scheduleJob(String jobKey, Runnable job, long interval);

	void scheduleJob(String jobKey, Runnable job, Date startDate, long interval);

	void unscheduleJob(String jobKey);
}
