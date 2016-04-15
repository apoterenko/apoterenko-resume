package qiwi.jira.specific;

public enum IssueType {
	PROJECT("Project"),
	STORY("Story"),
	TASK("Task"),
	BUG("Bug"),
	IMPROVEMENT("Improvement");

	private final String value;

	private IssueType(String value) {
		this.value = value;
	}

	public String value() {
		return value;
	}
}