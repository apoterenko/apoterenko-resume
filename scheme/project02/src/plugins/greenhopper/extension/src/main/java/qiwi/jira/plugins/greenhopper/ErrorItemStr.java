package qiwi.jira.plugins.greenhopper;

import java.util.Arrays;

import com.atlassian.greenhopper.model.validation.ErrorCollection.ErrorItem;

public class ErrorItemStr {

	private final ErrorItem errorItem;

	public ErrorItemStr(ErrorItem errorItem) {
		this.errorItem = errorItem;
	}

	public String toString() {
		return new StringBuilder()
			.append("ErrorItem [type=").append(errorItem.getType())
			.append(", contextId=").append(errorItem.getContextId())
			.append(", messageKey=").append(errorItem.getMessageKey())
			.append(", params=").append(Arrays.toString(errorItem.getParams()))
			.append("]")
			.toString();
	}
}
