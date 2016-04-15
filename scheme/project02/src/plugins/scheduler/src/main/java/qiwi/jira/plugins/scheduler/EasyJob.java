package qiwi.jira.plugins.scheduler;

import com.google.common.base.Preconditions;

public class EasyJob {

	private final String jobKey;
	private final Runnable runnable;

	protected EasyJob(String jobKey, Runnable runnable) {
		Preconditions.checkNotNull(jobKey);
		Preconditions.checkNotNull(runnable);
		this.jobKey = jobKey;
		this.runnable = runnable;
	}

	public String getJobKey() {
		return jobKey;
	}

	public Runnable getRunnable() {
		return runnable;
	}

	@Override
	public String toString() {
		return "EasyJob [jobKey=" + jobKey
				+ ", runnable=" + runnable
				+ "]";
	}
}
