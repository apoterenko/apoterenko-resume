package qiwi.jira.plugins.calendar;

import org.joda.time.ReadableDateTime;

public interface CalendarService {

	boolean isHoliday(ReadableDateTime dateTime);
	boolean isWorkday(ReadableDateTime dateTime);
}
