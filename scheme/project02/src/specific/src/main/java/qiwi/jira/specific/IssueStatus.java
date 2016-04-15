package qiwi.jira.specific;

import com.google.common.collect.Sets;

import java.util.Set;

public enum IssueStatus {

	OPEN("Open"),
	CLOSED("Closed"),
	RESOLVED("Resolved"),
	WAITING_FOR("Waiting For"),
	IN_PROGRESS("In Progress"),
	REOPENED("Reopened"),
	INNER_TEST("Inner Test"),
	READY_FOR_QA("Ready for QA"),
	QA("QA"),
	WAITING("Waiting"),
	READY_FOR_RELEASE("Ready for Release");

	public static final Set<IssueStatus> COMPLETED = Sets.newHashSet(
		READY_FOR_QA,
		QA,
		READY_FOR_RELEASE,
		CLOSED
	);

	private final String value;

	private IssueStatus(String value) {
		this.value = value;
	}

	public String value() {
		return value;
	}

	@Override
	public String toString() {
		return value;
	}
}