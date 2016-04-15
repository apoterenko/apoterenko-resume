package qiwi.jira.specific;

public enum IssueResolutionType {

	FIXED("Fixed");

	private final String value;

	private IssueResolutionType(String value) {
		this.value = value;
	}

	public String value() {
		return value;
	}
}
