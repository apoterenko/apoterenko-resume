package qiwi.jira.security;

public class PermissionException extends Exception {

	private static final long serialVersionUID = -5590283758966758134L;

	public PermissionException(String message) {
		super(message);
	}
}