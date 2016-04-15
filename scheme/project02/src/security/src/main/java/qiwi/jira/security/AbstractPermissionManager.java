package qiwi.jira.security;

import com.atlassian.crowd.embedded.api.User;

public abstract class AbstractPermissionManager implements PermissionManager {

	protected final com.atlassian.jira.security.PermissionManager permissionManager;

	public AbstractPermissionManager(com.atlassian.jira.security.PermissionManager permissionManager) {
		this.permissionManager = permissionManager;
	}

	@Override
	public void checkPermission(User user) throws PermissionException {
		if (!hasPermission(user)) {
			throw new PermissionException("The action is not accessible for current user...");
		}
	}

	public abstract boolean hasPermission(User user);
}
