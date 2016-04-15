package qiwi.jira.specific.date;

import java.util.Date;
import java.util.Iterator;
import java.util.TimeZone;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.ReadableDateTime;
import org.springframework.stereotype.Component;

import com.google.common.collect.AbstractIterator;

@Component
public class DateServiceImpl implements DateService {

	@Override
	public Iterable<ReadableDateTime> getDaysFromDate(Date fromDate, TimeZone tz) {
		final DateTime dateTime = new DateTime(fromDate.getTime(), DateTimeZone.forTimeZone(tz));

		return new Iterable<ReadableDateTime>() {
			@Override
			public Iterator<ReadableDateTime> iterator() {
				return new AbstractIterator<ReadableDateTime>() {
					private DateTime current = new DateTime(
							dateTime.getYear(), dateTime.getMonthOfYear(), dateTime.getDayOfMonth(),
							0, 0, 0, 0,
							dateTime.getZone());
					@Override
					protected ReadableDateTime computeNext() {
						final ReadableDateTime next = current;
						current = current.plusDays(1);
						return next;
					}
				};
			}
		};
	}
}
