package qiwi.jira.specific;

public enum IssueFieldName {

	RANK("Rank"),
	ESTIMATE("Estimate"),
	ESTIMATED_DATE("Estimated date"),
	WAITING_DATE("Waiting date");

	private final String value;

	private IssueFieldName(String value) {
		this.value = value;
	}

	public String value() {
		return value;
	}
}