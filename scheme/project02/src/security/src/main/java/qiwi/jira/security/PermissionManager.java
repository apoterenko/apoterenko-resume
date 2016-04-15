package qiwi.jira.security;

import com.atlassian.crowd.embedded.api.User;

public interface PermissionManager {

	boolean hasPermission(User user);

	void checkPermission(User user) throws PermissionException;
}
