package qiwi.util.period;

import com.google.inject.Singleton;
import org.jetbrains.annotations.NotNull;

@Singleton
public class PeriodInfoCreator {

	@NotNull
	public PeriodInfo create(@NotNull PeriodInfoRequest periodInfoRequest) {
		return PeriodInfoBean.builder()
				.readablePeriod(PeriodCreator.create(periodInfoRequest))
				.build();
	}
}