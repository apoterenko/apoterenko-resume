package qiwi.jira.plugins.estimate;

import java.util.Date;

class TimeResource {
	private Date date;
	private double resource;

	TimeResource(Date date, double resource) {
		this.date = date;
		this.resource = resource;
	}

	Date getDate() {
		return date;
	}

	double getResource() {
		return resource;
	}

	boolean useResource(double resourcePart) {
		this.resource -= resourcePart;
		return this.resource > 0;
	}
}