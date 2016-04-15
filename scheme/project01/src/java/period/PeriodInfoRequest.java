package qiwi.util.period;

import org.jetbrains.annotations.Nullable;

public class PeriodInfoRequest {

	private final long start;
	private final long end;
	@Nullable
	private final PeriodFieldType minActualFieldPosition;

	protected PeriodInfoRequest(Builder builder) {
		this.start = builder.start;
		this.end = builder.end;
		this.minActualFieldPosition = builder.minActualFieldPosition;
	}

	public long getStart() {
		return start;
	}

	public long getEnd() {
		return end;
	}

	@Nullable
	public PeriodFieldType getMinActualFieldPosition() {
		return minActualFieldPosition;
	}

	public static Builder builder() {
		return new Builder();
	}

	public static class Builder {

		private long start;
		private long end;
		@Nullable
		private PeriodFieldType minActualFieldPosition;

		protected Builder() {
		}

		public Builder start(long start) {
			this.start = start;
			return this;
		}

		public Builder end(long end) {
			this.end = end;
			return this;
		}

		public Builder minActualFieldPosition(@Nullable PeriodFieldType minActualFieldPosition) {
			this.minActualFieldPosition = minActualFieldPosition;
			return this;
		}

		public PeriodInfoRequest build() {
			return new PeriodInfoRequest(this);
		}
	}
}