package qiwi.util.period;

import com.google.common.base.Joiner;
import org.jetbrains.annotations.NotNull;

import static com.google.common.collect.Lists.newArrayList;

final class PeriodInfoJoiner {

	static String join(@NotNull PeriodInfo periodInfo) {
		return Joiner.on(" ").join(
				Joiner.on("/").join(newArrayList(periodInfo.getYears(), periodInfo.getMonths(), periodInfo.getDays())),
				Joiner.on(":").join(newArrayList(periodInfo.getHours(), periodInfo.getMinutes(), periodInfo.getSeconds(), periodInfo.getMillis()))
		);
	}
}