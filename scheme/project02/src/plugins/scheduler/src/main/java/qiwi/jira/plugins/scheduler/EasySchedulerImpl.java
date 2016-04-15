package qiwi.jira.plugins.scheduler;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atlassian.sal.api.lifecycle.LifecycleAware;
import com.atlassian.sal.api.scheduling.PluginScheduler;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;

@Service("qiwi-easy-scheduler")
public class EasySchedulerImpl implements EasyScheduler, LifecycleAware {
	private static final transient Logger log = LoggerFactory.getLogger(EasySchedulerImpl.class);

	private final Object lock = new Object();
	private final List<Job> enqueuedJobs = Lists.newLinkedList();
	private final Set<String> registeredJobKeys = Collections.synchronizedSet(Sets.<String>newHashSet());

	private final PluginScheduler pluginScheduler;

	private boolean started;

	@Autowired
	public EasySchedulerImpl(PluginScheduler pluginScheduler) {
		this.pluginScheduler = pluginScheduler;
	}

	@Override
	public void onStart() {
		synchronized (lock) {
			started = true;
			for (Job job : enqueuedJobs) {
				scheduleJob(job);
			}
		}
	}

	@Override
	public String scheduleJob(Runnable job, long interval) {
		return scheduleJob(job, null, interval);
	}

	@Override
	public String scheduleJob(Runnable job, Date startDate, long interval) {
		final String jobKey = generateJobKey(job);
		scheduleJob(jobKey, job, startDate, interval);
		return jobKey;
	}

	@Override
	public void scheduleJob(String jobKey, Runnable job, long interval) {
		scheduleJob(jobKey, job, null, interval);
	}

	@Override
	public void scheduleJob(String jobKey, Runnable job, Date startDate, long interval) {
		final EasyJob easyJob = new EasyJob(jobKey, job);
		registerJobKey(easyJob.getJobKey());
		dispatchJob(new Job(easyJob, startDate, interval));
	}

	@Override
	public void unscheduleJob(String jobKey) {
		pluginScheduler.unscheduleJob(jobKey);
		unregisterJobKey(jobKey);
	}

	protected void dispatchJob(Job job) {
		synchronized (lock) {
			if (!started) {
				enqueueJob(job);
				return;
			}
		}
		scheduleJob(job);
	}

	protected void scheduleJob(Job job) {
		log.debug("Schedule job: {}", job);

		pluginScheduler.scheduleJob(
				job.getEasyJob().getJobKey(),
				EasyPluginJob.class,
				Collections.singletonMap(
						EasyPluginJob.EASY_JOB_KEY, (Object)job.getEasyJob()),
				job.getStartDate(),
				job.getInterval());
	}

	protected String generateJobKey(Runnable runnable) {
		return runnable.getClass().getName() + JOB_SUFFIX;
	}

	private void registerJobKey(String jobKey) {
		if (!registeredJobKeys.add(jobKey)) {
			log.warn("Job key {} already registered!", jobKey);
		}
	}

	private void unregisterJobKey(String jobKey) {
		registeredJobKeys.remove(jobKey);
	}

	private void enqueueJob(Job job) {
		log.debug("Enqueue job: {}", job);
		enqueuedJobs.add(job);
	}


	private static class Job {
		final EasyJob easyJob;
		final Date startDate;
		final long interval;

		Job(EasyJob easyJob, Date startDate, long interval) {
			this.easyJob = easyJob;
			this.startDate = startDate;
			this.interval = interval;
		}

		EasyJob getEasyJob() {
			return easyJob;
		}

		Date getStartDate() {
			return startDate != null ? startDate : new Date();
		}

		long getInterval() {
			return interval;
		}

		@Override
		public String toString() {
			return "Job [easyJob=" + easyJob
					+ ", startDate=" + startDate
					+ ", interval=" + interval
					+ "]";
		}
	}
}
