package qiwi.jira.util;

import org.springframework.beans.BeansException;

public class PropertyUpdateException extends BeansException {
	private static final long serialVersionUID = 4896815386047263440L;

	public PropertyUpdateException(String msg, Throwable cause) {
		super(msg, cause);
	}

	public PropertyUpdateException(String msg) {
		super(msg);
	}
}
