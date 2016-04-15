package qiwi.jira.plugins.calendar;

import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.ArrayUtils;
import org.joda.time.DateTimeConstants;
import org.joda.time.ReadableDateTime;

import com.google.common.collect.Maps;
import com.google.common.collect.Sets;

@YearHolidayDefinitions({
	@YearHolidays(year = 2012, value = {
			@MonthHolidays(
					month = Month.JANUARY,
					holidays = {1, 2, 3, 4, 5, 6, 7, 8, 9, 14, 15, 21, 22, 28, 29}
			),
			@MonthHolidays(
					month = Month.FEBRUARY,
					holidays = {4, 5, 11, 12, 18, 19, 23, 25, 26}
			),
			@MonthHolidays(
					month = Month.MARCH,
					holidays = {3, 4, 8, 9, 10, 17, 18, 24, 25, 31}
			),
			@MonthHolidays(
					month = Month.APRIL,
					holidays = {1, 7, 8, 14, 15, 21, 22, 29, 30}
			),
			@MonthHolidays(
					month = Month.MAY,
					holidays = {1, 6, 7, 8, 9, 13, 19, 20, 26, 27}
			),
			@MonthHolidays(
					month = Month.JUNE,
					holidays = {2, 3, 10, 11, 12, 16, 17, 23, 24, 30}
			),
			@MonthHolidays(
					month = Month.JULY,
					holidays = {1, 7, 8, 14, 15, 21, 22, 28, 29}
			),
			@MonthHolidays(
					month = Month.AUGUST,
					holidays = {4, 5, 11, 12, 18, 19, 25, 26}
			),
			@MonthHolidays(
					month = Month.SEPTEMBER,
					holidays = {1, 2, 8, 9, 15, 16, 22, 23, 29, 30}
			),
			@MonthHolidays(
					month = Month.OCTOBER,
					holidays = {6, 7, 13, 14, 20, 21, 27, 28}
			),
			@MonthHolidays(
					month = Month.NOVEMBER,
					holidays = {3, 4, 5, 10, 11, 17, 18, 24, 25}
			),
			@MonthHolidays(
					month = Month.DECEMBER,
					holidays = {1, 2, 8, 9, 15, 16, 22, 23, 30, 31}
			)
	})
})
public final class Holidays {

	private Holidays() {}

	private static final Map<Integer, Map<Month, Set<Integer>>> holidayMap = Maps.newHashMap();

	static {
		YearHolidayDefinitions holidayDefinitions = Holidays.class.getAnnotation(YearHolidayDefinitions.class);
		if (holidayDefinitions == null) {
			throw new IllegalStateException(
					Holidays.class.getName() +
					" class must be annotated by @YearHolidayDefinitions");
		}

		for (YearHolidays yearHolidays : holidayDefinitions.value()) {
			final Map<Month, Set<Integer>> monthHolidaysMap = Maps.newHashMap();
			for (MonthHolidays monthHolidays : yearHolidays.value()) {
				monthHolidaysMap.put(
						monthHolidays.month(),
						Sets.newHashSet(ArrayUtils.toObject(monthHolidays.holidays())));
			}
			holidayMap.put(yearHolidays.year(), monthHolidaysMap);
		}
	}


	public static boolean isHoliday(ReadableDateTime dateTime) {
		final int year = dateTime.getYear();
		final Map<Month, Set<Integer>> monthHolidayMap = holidayMap.get(year);
		return monthHolidayMap == null ?
				isSundayOrSaturday(dateTime) :
				monthHolidayMap.get(Month.byNumber(dateTime.getMonthOfYear()))
						.contains(dateTime.getDayOfMonth());
	}

	public static boolean isSundayOrSaturday(ReadableDateTime dateTime) {
		switch (dateTime.getDayOfWeek()) {
		case DateTimeConstants.SATURDAY:
		case DateTimeConstants.SUNDAY:
			return true;
		default:
			return false;
		}
	}
}
