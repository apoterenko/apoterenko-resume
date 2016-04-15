package qiwi.jira.plugins.planning;

import qiwi.jira.plugins.estimate.ProjectProgressParameters;

import java.util.Collection;

public class DetailingEntity {

	private final Collection<ProjectProgressParameters> projectsProgressParameters;

	public DetailingEntity(Collection<ProjectProgressParameters> projectsProgressParameters) {
		this.projectsProgressParameters = projectsProgressParameters;
	}

	public Collection<ProjectProgressParameters> getProjectsProgressParameters() {
		return projectsProgressParameters;
	}
}
