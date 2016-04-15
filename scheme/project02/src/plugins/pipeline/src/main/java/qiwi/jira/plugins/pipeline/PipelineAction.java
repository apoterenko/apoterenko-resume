package qiwi.jira.plugins.pipeline;

import com.atlassian.jira.web.action.JiraWebActionSupport;
import org.springframework.beans.factory.annotation.Autowired;
import qiwi.jira.security.PermissionManager;

public class PipelineAction extends JiraWebActionSupport {

	private static final long serialVersionUID = -4164679312869704025L;

	private final PermissionManager permissionManager;

	@Autowired
	public PipelineAction(PermissionManager permissionManager) {
		this.permissionManager = permissionManager;
	}

	/**
	 * @return Forward
	 * @throws Exception Exception
	 */
	public String doDefault() throws Exception {
		final String redirect = redirect();
		if (redirect != null) {
			return redirect;
		}
		initRequest();
		return super.doDefault();
	}

	protected String redirect() {
		return getLoggedInUser() != null ? null : getDashboardRedirect();
		// TODO access
		/*try {
			permissionManager.checkPermission(getLoggedInUser());
		} catch (PermissionException e) {
			return getDashboardRedirect();
		}
		return null;*/
	}

	protected String getDashboardRedirect() {
		return getRedirect("/secure/Dashboard.jspa");
	}

	protected void initRequest() throws Exception {
	}
}