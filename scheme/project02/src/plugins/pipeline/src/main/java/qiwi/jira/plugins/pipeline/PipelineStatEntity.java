package qiwi.jira.plugins.pipeline;

import java.io.Serializable;
import java.text.NumberFormat;
import java.util.Date;
import java.util.Locale;

public class PipelineStatEntity implements Serializable {

	private static final long serialVersionUID = -2111431394433683587L;

	private static final String DEFAULT_LANGUAGE = "ru";

	private int period;
	private double speed;
	private double fixedSpeed;
	private String name;
	private Date date;

	public int getPeriod() {
		return period;
	}

	public PipelineStatEntity setPeriod(int period) {
		this.period = period;
		return this;
	}

	public Date getDate() {
		return date;
	}

	public PipelineStatEntity setDate(Date date) {
		this.date = date;
		return this;
	}

	public String getName() {
		return name;
	}

	public PipelineStatEntity setName(String name) {
		this.name = name;
		return this;
	}

	public double getSpeed() {
		return speed;
	}

	public PipelineStatEntity setSpeed(double speed) {
		this.speed = speed;
		return this;
	}

	public double getFixedSpeed() {
		return fixedSpeed;
	}

	public PipelineStatEntity setFixedSpeed(double fixedSpeed) {
		this.fixedSpeed = fixedSpeed;
		return this;
	}

	public String getFormattedSpeed() {
		return formatSpeed(speed);
	}

	public String getFormattedFixedSpeed() {
		return formatSpeed(fixedSpeed);
	}

	private String formatSpeed(double value) {
		final NumberFormat format = NumberFormat.getInstance(new Locale(DEFAULT_LANGUAGE));
		format.setMaximumFractionDigits(1);
		format.setMinimumFractionDigits(1);
		return format.format(value);
	}
}
