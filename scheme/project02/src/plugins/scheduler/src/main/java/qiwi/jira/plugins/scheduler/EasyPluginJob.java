package qiwi.jira.plugins.scheduler;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.atlassian.sal.api.scheduling.PluginJob;

public class EasyPluginJob implements PluginJob {
	private static final Logger log = LoggerFactory.getLogger(EasyPluginJob.class);

	static final String EASY_JOB_KEY = "easyJob";

	@Override
	public void execute(Map<String, Object> jobDataMap) {
		final Object jobObj = jobDataMap.get(EASY_JOB_KEY);
		if (jobObj instanceof EasyJob) {
			execute((EasyJob)jobObj);
		} else {
			log.warn("Illegal job object: {}", jobObj);
		}
	}

	protected void execute(EasyJob job) {
		try {
			job.getRunnable().run();
		} catch (RuntimeException e) {
			log.error("Job execution error, job key: " + job.getJobKey(), e);
		}
	}
}
