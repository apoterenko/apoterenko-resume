package qiwi.jira.plugins.greenhopper;

import java.util.Collection;

import org.springframework.stereotype.Service;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.greenhopper.service.PermissionService;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.project.Project;

@Service("qiwi-slave-issue-ranking-permission-service")
public class SlaveIssueRankingPermissionService implements PermissionService{

	@Override
	public boolean hasPermission(User paramUser, Issue paramIssue, int paramInt) {
		return true;
	}

	@Override
	public boolean hasPermission(User paramUser, Project paramProject, int paramInt) {
		throw new UnsupportedOperationException();
	}

	@Override
	public boolean hasGlobalPermission(User paramUser, int paramInt) {
		throw new UnsupportedOperationException();
	}

	@Override
	public boolean isProjectAdministrator(User paramUser, Collection<Project> paramCollection) {
		throw new UnsupportedOperationException();
	}

	@Override
	public boolean isJiraAdministrator(User paramUser) {
		throw new UnsupportedOperationException();
	}

	@Override
	public boolean canUpdateIssue(User paramUser, Issue paramIssue) {
		throw new UnsupportedOperationException();
	}
}
