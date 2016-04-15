package qiwi.jira.specific;

public enum ProjectName {

	SYSTEMS_ANALYSIS("SA");

	private final String value;

	private ProjectName(String value) {
		this.value = value;
	}

	public String value() {
		return value;
	}
}