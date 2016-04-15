package qiwi.jira.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.jira.component.ComponentAccessor;
import com.atlassian.jira.project.Project;

public final class UserHelper {
	private static final transient Logger log = LoggerFactory.getLogger(UserHelper.class);

	private UserHelper() {}

	public static User getLoggedInUser() {
		return ComponentAccessor.getJiraAuthenticationContext().getLoggedInUser();
	}

	public static void setLoggedInUser(User user) {
		ComponentAccessor.getJiraAuthenticationContext().setLoggedInUser(user);
	}

	public static User getLeadUser(long projectId) {
		final Project project = ComponentAccessor.getProjectManager().getProjectObj(projectId);
		if (project == null) {
			throw new IllegalArgumentException("No project by id " + projectId);
		}
		final User user = project.getLeadUser();
		if (user == null && log.isWarnEnabled()) {
			log.warn("Project {} has no lead user!", project.getKey());
		}
		return user;
	}
}
