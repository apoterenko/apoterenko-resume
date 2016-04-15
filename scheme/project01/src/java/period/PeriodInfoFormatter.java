package qiwi.util.period;

import com.google.common.base.Function;
import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.inject.Singleton;
import org.joda.time.Period;
import org.joda.time.format.PeriodFormatter;

import javax.annotation.Nullable;

@Singleton
public class PeriodInfoFormatter {

	@Inject
	private Provider<PeriodFormatter> periodFormatterProvider;

	public PeriodFormatter getPeriodFormatter() {
		return periodFormatterProvider.get();
	}

	public String format(PeriodInfo periodInfo) {
		return format(getPeriodFormatter(), periodInfo);
	}

	public String format(PeriodFormatter periodFormatter, PeriodInfo periodInfo) {
		return periodFormatter
				.print(TO_PERIOD_FUNCTION.INSTANCE.apply(periodInfo));
	}

	private static final class TO_PERIOD_FUNCTION implements Function<PeriodInfo, Period> {

		@Override
		public Period apply(@Nullable PeriodInfo input) {
			return input != null ? new Period(
					input.getYears(),
					input.getMonths(),
					input.getWeeks(),
					input.getDays(),
					input.getHours(),
					input.getMinutes(),
					input.getSeconds(),
					input.getMillis()
			) : null;
		}

		static final Function<PeriodInfo, Period> INSTANCE = new TO_PERIOD_FUNCTION();
	}
}