package qiwi.jira.plugins.pipeline;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.jira.security.PermissionManager;
import com.atlassian.jira.security.Permissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import qiwi.jira.security.AbstractPermissionManager;

@Service("qiwi-pipeline-permission-manager")
public class PipelinePermissionManager extends AbstractPermissionManager {

	@Autowired
	public PipelinePermissionManager(PermissionManager permissionManager) {
		super(permissionManager);
	}

	@Override
	public boolean hasPermission(User user) {
		return permissionManager.hasPermission(Permissions.ADMINISTER, user);
	}
}
