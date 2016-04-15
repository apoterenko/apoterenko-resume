package qiwi.jira.plugins.planning;

import com.atlassian.jira.web.action.JiraWebActionSupport;
import org.springframework.beans.factory.annotation.Autowired;
import qiwi.jira.security.PermissionManager;

import javax.servlet.http.HttpSession;

public class BasicPlanningAction extends JiraWebActionSupport {

	private final PermissionManager permissionManager;
	protected final HttpSession session;

	@Autowired
	public BasicPlanningAction(
		PermissionManager permissionManager
	) {
		this.permissionManager = permissionManager;
		this.session = request.getSession();
	}

	@SuppressWarnings("unchecked")
	protected <T> T getSessionAttribute(String name) {
		return (T) session.getAttribute(name);
	}

	protected String getAuthUri() {
		session.invalidate();
		return getRedirect("/secure");
	}

	protected Long toLong(String parameter) {
		try {
			return parameter == null || parameter.isEmpty() ? null : Long.parseLong(parameter);
		} catch (Exception e) {
			return null;
		}
	}

	protected boolean isActionAccessible() {
		// TODO access
		return getLoggedInUser() != null;
		/*try {
			permissionManager.checkPermission(getLoggedInUser());
		} catch (PermissionException e) {
			return false;
		}
		return true;*/
	}
}
