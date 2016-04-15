package qiwi.jira.plugins.job.pipeline;

import qiwi.jira.persistence.PersistentEntity;

import java.io.Serializable;

public class PipelineEntity implements PersistentEntity, Serializable {
	private static final long serialVersionUID = -1897638488522702734L;

	private long id;
	private double value;
	private boolean view;
	private String name;

	public PipelineEntity setValue(double value) {
		this.value = value;
		return this;
	}

	public PipelineEntity setId(long id) {
		this.id = id;
		return this;
	}

	public double getValue() {
		return value;
	}

	public String getName() {
		return name;
	}

	public PipelineEntity setName(String name) {
		this.name = name;
		return this;
	}

	public boolean getView() {
		return view;
	}

	public PipelineEntity setView(boolean view) {
		this.view = view;
		return this;
	}

	public boolean isView() {
		return view;
	}

	@Override
	public long getId() {
		return id;
	}
}