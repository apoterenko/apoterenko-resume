package qiwi.util.period;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.inject.Singleton;

@Singleton
public class PeriodInfoSupport {

	@Inject
	private Provider<PeriodInfoFormatter> periodInfoFormatterProvider;
	@Inject
	private Provider<PeriodInfoCreator> periodInfoCreatorProvider;

	public PeriodInfoFormatter getPeriodInfoFormatter() {
		return periodInfoFormatterProvider.get();
	}

	public PeriodInfoCreator getPeriodInfoCreator() {
		return periodInfoCreatorProvider.get();
	}
}