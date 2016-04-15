package qiwi.jira.plugins.planning;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.jira.security.PermissionManager;
import com.atlassian.jira.security.Permissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import qiwi.jira.security.AbstractPermissionManager;

@Service
class PlanningPermissionManager extends AbstractPermissionManager {

	@Autowired
	public PlanningPermissionManager(PermissionManager permissionManager) {
		super(permissionManager);
	}

	@Override
	public boolean hasPermission(User user) {
		return permissionManager.hasPermission(Permissions.ADMINISTER, user);
	}
}