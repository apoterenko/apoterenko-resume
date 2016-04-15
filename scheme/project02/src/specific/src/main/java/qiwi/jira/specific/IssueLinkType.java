package qiwi.jira.specific;

public enum IssueLinkType {

	DEPENDENCY("Dependency"),
	IMPLEMENTATION("Implementation");

	private final String value;

	private IssueLinkType(String value) {
		this.value = value;
	}

	public String value() {
		return value;
	}
}
