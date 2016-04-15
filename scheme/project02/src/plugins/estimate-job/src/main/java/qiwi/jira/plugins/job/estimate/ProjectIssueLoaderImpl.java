package qiwi.jira.plugins.job.estimate;

import java.util.Collections;
import java.util.List;

import com.atlassian.jira.project.Project;
import com.atlassian.jira.project.ProjectManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import qiwi.jira.specific.IssueFieldName;
import qiwi.jira.specific.IssueStatus;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.jira.issue.CustomFieldManager;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.fields.Field;
import com.atlassian.jira.issue.search.SearchException;
import com.atlassian.jira.issue.search.SearchProvider;
import com.atlassian.jira.jql.builder.JqlQueryBuilder;
import com.atlassian.jira.web.bean.PagerFilter;
import com.atlassian.query.Query;
import com.atlassian.query.order.SortOrder;
import qiwi.jira.specific.IssueType;
import qiwi.jira.specific.ProjectName;
import qiwi.jira.util.UserHelper;

@Service("qiwi-project-issue-loader")
public class ProjectIssueLoaderImpl implements ProjectIssueLoader {
	private static final transient Logger log = LoggerFactory.getLogger(ProjectIssueLoaderImpl.class);

	@Autowired
	private CustomFieldManager customFieldManager;
	@Autowired
	private SearchProvider searchProvider;
	@Autowired
	private ProjectManager projectManager;

	@Override
	public List<Issue> loadProjectIssues(long projectId) {
		return loadProjectIssues(projectId, buildLoadQuery(projectId));
	}

	@Override
	public List<Issue> loadSAProjectIssues() {
		final Project saProject = projectManager.getProjectObjByKey(ProjectName.SYSTEMS_ANALYSIS.value());
		if (saProject == null) {
			log.error("\"SA\" project is undefined...");
			throw new IllegalStateException("\"SA\" project is undefined...");
		}
		return loadProjectIssues(saProject.getId(), buildLoadSAQuery(saProject.getId()));
	}

	private List<Issue> loadProjectIssues(long projectId, Query query) {
		final User user = UserHelper.getLeadUser(projectId);
		if (user == null) {
			return Collections.emptyList();
		}
		try {
			return searchProvider.search(query, user, PagerFilter.getUnlimitedFilter()).getIssues();
		} catch (SearchException e) {
			log.error("Can't load issues of project with id " + projectId + " by user " + user.getName(), e);
			return Collections.emptyList();
		}
	}

	private Query buildLoadSAQuery(long saProjectId) {
		final Field rankField = rankField();
		return JqlQueryBuilder.newBuilder()
			.where()
				.project(saProjectId)
				.and()
					.sub()
						.issueType(IssueType.PROJECT.value())
						.or().issueType(IssueType.STORY.value())
						.or().issueType(IssueType.IMPROVEMENT.value())
						.or().issueType(IssueType.BUG.value())
					.endsub()
				.and().status().eq(IssueStatus.RESOLVED.value())
			.endWhere()
			.orderBy()
				.addSortForFieldName(rankField.getName(), SortOrder.ASC, false)
			.buildQuery();
	}

	private Query buildLoadQuery(long projectId) {
		final Field rankField = rankField();
		return JqlQueryBuilder.newBuilder()
			.where()
				.project(projectId)
				.and().status().notEq(IssueStatus.CLOSED.value())
				.and().status().notEq(IssueStatus.READY_FOR_RELEASE.value())
				.and().status().notEq(IssueStatus.QA.value())
				.and().status().notEq(IssueStatus.READY_FOR_QA.value())
			.endWhere()
			.orderBy()
				.addSortForFieldName(rankField.getName(), SortOrder.ASC, false)
			.buildQuery();
	}

	private Field rankField() {
		return customFieldManager.getCustomFieldObjectByName(IssueFieldName.RANK.value());
	}
}