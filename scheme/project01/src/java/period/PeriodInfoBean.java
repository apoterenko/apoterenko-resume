package qiwi.util.period;

import org.jetbrains.annotations.NotNull;
import org.joda.time.ReadablePeriod;

import static org.joda.time.DurationFieldType.*;

public class PeriodInfoBean implements PeriodInfo {

	private final int years;
	private final int months;
	private final int weeks;
	private final int days;
	private final int hours;
	private final int minutes;
	private final int seconds;
	private final int millis;

	protected PeriodInfoBean(Builder builder) {
		this.years = builder.years;
		this.months = builder.months;
		this.weeks = builder.weeks;
		this.days = builder.days;
		this.hours = builder.hours;
		this.minutes = builder.minutes;
		this.seconds = builder.seconds;
		this.millis = builder.millis;
	}

	@Override
	public int getYears() {
		return years;
	}

	@Override
	public int getMonths() {
		return months;
	}

	@Override
	public int getWeeks() {
		return weeks;
	}

	@Override
	public int getDays() {
		return days;
	}

	@Override
	public int getHours() {
		return hours;
	}

	@Override
	public int getMinutes() {
		return minutes;
	}

	@Override
	public int getSeconds() {
		return seconds;
	}

	@Override
	public int getMillis() {
		return millis;
	}

	@Override
	public String toString() {
		return PeriodInfoJoiner.join(this);
	}

	public static Builder builder() {
		return new Builder();
	}

	public static class Builder {

		private int years;
		private int months;
		private int weeks;
		private int days;
		private int hours;
		private int minutes;
		private int seconds;
		private int millis;

		protected Builder() {
		}

		public Builder readablePeriod(@NotNull ReadablePeriod period) {
			this.years = period.get(years());
			this.months = period.get(months());
			this.weeks = period.get(weeks());
			this.days = period.get(days());
			this.hours = period.get(hours());
			this.minutes = period.get(minutes());
			this.seconds = period.get(seconds());
			this.millis = period.get(millis());
			return this;
		}

		public PeriodInfo build() {
			return new PeriodInfoBean(this);
		}
	}
}