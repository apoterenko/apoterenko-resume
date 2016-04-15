package qiwi.jira.plugins.job.estimate;

import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.project.Project;
import com.atlassian.jira.project.ProjectManager;
import com.google.common.collect.Maps;
import org.apache.commons.lang.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import qiwi.jira.plugins.scheduler.EasyScheduler;
import qiwi.jira.specific.DevelopmentProjectIds;
import qiwi.jira.specific.ProjectName;

import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

@Service("qiwi-project-issue-loader-wrapper")
public class ProjectIssueLoaderWrapper implements ProjectIssueLoader {
	private static final transient Logger log = LoggerFactory.getLogger(ProjectIssueLoaderWrapper.class);

	private static final long DEFAULT_INTERVAL = DateUtils.MILLIS_PER_MINUTE * 15;

	private final EasyScheduler easyScheduler;
	private final ProjectIssueLoader projectIssueLoader;
	private final DevelopmentProjectIds developmentProjectIds;

	private final long saProjectId;

	private final AtomicReference<Map<Long, List<Issue>>> issuesCache =
		new AtomicReference<Map<Long, List<Issue>>>(Maps.<Long, List<Issue>>newHashMap());

	@Autowired
	public ProjectIssueLoaderWrapper(
		ProjectIssueLoader projectIssueLoader,
		EasyScheduler easyScheduler,
		DevelopmentProjectIds developmentProjectIds,
		ProjectManager projectManager
	) {
		this.projectIssueLoader = projectIssueLoader;
		this.developmentProjectIds = developmentProjectIds;
		this.easyScheduler = easyScheduler;
		final Project saProject = projectManager.getProjectObjByKey(ProjectName.SYSTEMS_ANALYSIS.value());
		if (saProject == null) {
			log.error("\"SA\" project is undefined...");
			throw new IllegalStateException("\"SA\" project is undefined...");
		}
		saProjectId = saProject.getId();
		scheduleJob();
	}

	private void scheduleJob() {
		easyScheduler.scheduleJob(new Job(), DEFAULT_INTERVAL);
		if (log.isInfoEnabled()) {
			log.info("Project issue loader wrapper job scheduled every {} ms.", DEFAULT_INTERVAL);
		}
	}

	private class Job implements Runnable {

		@Override
		public void run() {
			final Map<Long, List<Issue>> issues = Maps.newHashMap();
			issues.put(
				saProjectId,
				ProjectIssueLoaderWrapper.this.projectIssueLoader.loadSAProjectIssues()
			);
			for (long projectId : developmentProjectIds.INSTANCE) {
				issues.put(
					projectId,
					ProjectIssueLoaderWrapper.this.projectIssueLoader.loadProjectIssues(projectId)
				);
			}

			issuesCache.set(issues);
			if (log.isInfoEnabled()) {
				log.info("Project issue loader wrapper has map with size: " + issues.size());
			}
		}
	}

	@Override
	public List<Issue> loadProjectIssues(long projectId) {
		final List<Issue> issues = issuesCache.get().get(projectId);
		return issues != null ? issues : projectIssueLoader.loadProjectIssues(projectId);
	}

	@Override
	public List<Issue> loadSAProjectIssues() {
		final List<Issue> issues = issuesCache.get().get(saProjectId);
		return issues != null ? issues : projectIssueLoader.loadSAProjectIssues();
	}
}