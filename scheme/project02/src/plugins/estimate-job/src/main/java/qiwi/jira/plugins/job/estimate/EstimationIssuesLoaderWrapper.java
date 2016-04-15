package qiwi.jira.plugins.job.estimate;

import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.project.Project;
import com.atlassian.jira.project.ProjectManager;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.apache.commons.lang.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import qiwi.jira.plugins.scheduler.EasyScheduler;
import qiwi.jira.specific.DevelopmentProjectIds;
import qiwi.jira.specific.ProjectName;

import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

@Service("qiwi-estimation-issues-loader-wrapper")
public class EstimationIssuesLoaderWrapper implements EstimationIssuesLoader {
	private static final transient Logger log = LoggerFactory.getLogger(EstimationIssuesLoaderWrapper.class);

	private static final long DEFAULT_INTERVAL = DateUtils.MILLIS_PER_MINUTE * 15;

	private final ProjectManager projectManager;
	private final EasyScheduler easyScheduler;
	private final EstimationIssuesLoader estimationIssuesLoader;
	private final ProjectIssueLoader projectIssueLoader;
	private final DevelopmentProjectIds developmentProjectIds;

	private final AtomicReference<Map<Long, List<Issue>>> blockingIssues =
		new AtomicReference<Map<Long, List<Issue>>>(Maps.<Long, List<Issue>>newHashMap());
	private final AtomicReference<Map<Long, List<Issue>>> implementationIssues =
		new AtomicReference<Map<Long, List<Issue>>>(Maps.<Long, List<Issue>>newHashMap());

	@Autowired
	public EstimationIssuesLoaderWrapper(
		EasyScheduler easyScheduler,
		@Qualifier("qiwi-project-issue-loader-wrapper") ProjectIssueLoader projectIssueLoader,
		@Qualifier("qiwi-estimation-issues-loader") EstimationIssuesLoader estimationIssuesLoader,
		ProjectManager projectManager,
		DevelopmentProjectIds developmentProjectIds
	) {
		this.easyScheduler = easyScheduler;
		this.estimationIssuesLoader = estimationIssuesLoader;
		this.projectIssueLoader = projectIssueLoader;
		this.projectManager = projectManager;
		this.developmentProjectIds = developmentProjectIds;
		scheduleJob();
	}

	private class Job implements Runnable {

		@Override
		public void run() {
			long before = System.currentTimeMillis();
			reloadIssues();
			if (log.isInfoEnabled()) {
				log.info("Estimation service support worked for {} s.", (System.currentTimeMillis() - before) * 0.001);
			}
		}
	}

	private void scheduleJob() {
		easyScheduler.scheduleJob(new Job(), DEFAULT_INTERVAL);
		log.info("Estimation service support job scheduled every {} ms.", DEFAULT_INTERVAL);
	}

	private void reloadIssues() {
		final Map<Long, List<Issue>> blockingIssues = Maps.newHashMap();
		final Map<Long, List<Issue>> implementationIssues = Maps.newHashMap();
		final Long[] projectIds = projectIds();

		for (long projectId : projectIds) {
			for (Issue issue : projectIssueLoader.loadProjectIssues(projectId)) {
				final long issueId = issue.getId();
				blockingIssues.put(issueId, estimationIssuesLoader.getBlockingIssues(issue));
				implementationIssues.put(issueId, estimationIssuesLoader.getImplementationIssues(issue));
			}
		}

		if (!implementationIssues.isEmpty()) {
			this.implementationIssues.set(implementationIssues);
			if (log.isInfoEnabled()) {
				log.info("Estimation service support job has implementationIssues with map's size {}.", implementationIssues.size());
			}
		} else {
			log.warn("Estimation service support job has empty implementationIssues map...");
		}

		if (!blockingIssues.isEmpty()) {
			this.blockingIssues.set(blockingIssues);
			if (log.isInfoEnabled()) {
				log.info("Estimation service support job has blockingIssues with map's size {}.", blockingIssues.size());
			}
		} else {
			log.warn("Estimation service support job has empty blockingIssues map...");
		}
	}

	private Long[] projectIds() {
		final List<Long> projectIds = Lists.newArrayList(developmentProjectIds.INSTANCE);
		final Project saProject = projectManager.getProjectObjByKey(ProjectName.SYSTEMS_ANALYSIS.value());

		if (saProject == null) {
			log.error("\"SA\" project is undefined...");
			throw new IllegalStateException("\"SA\" project is undefined...");
		}
		projectIds.add(saProject.getId());

		return projectIds.toArray(new Long[projectIds.size()]);
	}

	@Override
	public List<Issue> getBlockingIssues(Issue issue) {
		final List<Issue> list = blockingIssues.get().get(issue.getId());
		return list != null ? list : estimationIssuesLoader.getBlockingIssues(issue);
	}

	@Override
	public List<Issue> getImplementationIssues(Issue issue) {
		final List<Issue> list = implementationIssues.get().get(issue.getId());
		return list != null ? list : estimationIssuesLoader.getImplementationIssues(issue);
	}
}
