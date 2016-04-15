package qiwi.util.period;

import com.google.inject.Inject;
import com.google.inject.Singleton;

import org.jetbrains.annotations.NotNull;
import org.joda.time.format.PeriodFormatter;
import org.joda.time.format.PeriodFormatterBuilder;

import qiwi.domain.locale.LocalizedMessagesActivity;
import qiwi.portal.QiwiMessageFactory;
import qiwi.portal.protection.xss.StringCleaner;

@Singleton
public class PeriodFormatterProvider {

	@Inject
	private PeriodMessageFactory messageFactory;

	@NotNull
	public PeriodFormatter get() {
		final String[] variants = {
				PERIOD_FORMAT_SPACE_SEPARATOR, PERIOD_FORMAT_COMMA_SEPARATOR,
				getLocalizedMessage("PeriodFormat.commandand"), getLocalizedMessage("PeriodFormat.commaspaceand")
		};

		return new PeriodFormatterBuilder()
				.appendYears()
				.appendSuffix(getLocalizedMessageWithSpace("PeriodFormat.year"), getLocalizedMessageWithSpace("PeriodFormat.years"))
				.appendSeparator(PERIOD_FORMAT_COMMA_SPACE, getLocalizedMessage(PERIOD_FORMAT_SPACE_AND_SPACE), variants)
				.appendMonths()
				.appendSuffix(getLocalizedMessageWithSpace("PeriodFormat.month"), getLocalizedMessageWithSpace("PeriodFormat.months"))
				.appendSeparator(PERIOD_FORMAT_COMMA_SPACE, getLocalizedMessage(PERIOD_FORMAT_SPACE_AND_SPACE), variants)
				.appendWeeks()
				.appendSuffix(getLocalizedMessageWithSpace("PeriodFormat.week"), getLocalizedMessageWithSpace("PeriodFormat.weeks"))
				.appendSeparator(PERIOD_FORMAT_COMMA_SPACE, getLocalizedMessage(PERIOD_FORMAT_SPACE_AND_SPACE), variants)
				.appendDays()
				.appendSuffix(getLocalizedMessageWithSpace("PeriodFormat.day"), getLocalizedMessageWithSpace("PeriodFormat.days"))
				.appendSeparator(PERIOD_FORMAT_COMMA_SPACE, getLocalizedMessage(PERIOD_FORMAT_SPACE_AND_SPACE), variants)
				.appendHours()
				.appendSuffix(getLocalizedMessageWithSpace("PeriodFormat.hour"), getLocalizedMessageWithSpace("PeriodFormat.hours"))
				.appendSeparator(PERIOD_FORMAT_COMMA_SPACE, getLocalizedMessage(PERIOD_FORMAT_SPACE_AND_SPACE), variants)
				.appendMinutes()
				.appendSuffix(getLocalizedMessageWithSpace("PeriodFormat.minute"), getLocalizedMessageWithSpace("PeriodFormat.minutes"))
				.appendSeparator(PERIOD_FORMAT_COMMA_SPACE, getLocalizedMessage(PERIOD_FORMAT_SPACE_AND_SPACE), variants)
				.appendSeconds()
				.appendSuffix(getLocalizedMessageWithSpace("PeriodFormat.second"), getLocalizedMessageWithSpace("PeriodFormat.seconds"))
				.appendSeparator(PERIOD_FORMAT_COMMA_SPACE, getLocalizedMessage(PERIOD_FORMAT_SPACE_AND_SPACE), variants)
				.appendMillis()
				.appendSuffix(getLocalizedMessageWithSpace("PeriodFormat.millisecond"), getLocalizedMessageWithSpace("PeriodFormat.milliseconds"))
				.toFormatter();
	}

	private String getLocalizedMessageWithSpace(String message) {
		return PERIOD_FORMAT_SPACE_SEPARATOR + getLocalizedMessage(message);
	}

	private String getLocalizedMessage(String message) {
		return messageFactory.getMessage(message);
	}

	private static final String PERIOD_FORMAT_COMMA_SEPARATOR = ",";
	private static final String PERIOD_FORMAT_SPACE_SEPARATOR = " ";
	private static final String PERIOD_FORMAT_COMMA_SPACE = PERIOD_FORMAT_COMMA_SEPARATOR + PERIOD_FORMAT_SPACE_SEPARATOR;
	private static final String PERIOD_FORMAT_SPACE_AND_SPACE = "PeriodFormat.spaceandspace";

	@Singleton
	private static final class PeriodMessageFactory extends QiwiMessageFactory {

		@Inject
		PeriodMessageFactory(
				LocalizedMessagesActivity messageRegistry,
				StringCleaner stringCleaner) {
			super(NAMESPACE, messageRegistry, stringCleaner);
		}

		private static final String NAMESPACE = "period";
	}
}