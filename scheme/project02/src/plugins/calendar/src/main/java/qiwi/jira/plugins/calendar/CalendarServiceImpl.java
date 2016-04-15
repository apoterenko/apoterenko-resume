package qiwi.jira.plugins.calendar;

import org.joda.time.ReadableDateTime;
import org.springframework.stereotype.Service;

@Service("qiwi-calendar-service")
public class CalendarServiceImpl implements CalendarService {

	@Override
	public boolean isHoliday(ReadableDateTime dateTime) {
		return Holidays.isHoliday(dateTime);
	}

	@Override
	public boolean isWorkday(ReadableDateTime dateTime) {
		return !Holidays.isHoliday(dateTime);
	}
}
