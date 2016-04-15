package qiwi.jira.specific.date;

import java.util.Date;
import java.util.TimeZone;

import org.joda.time.ReadableDateTime;

public interface DateService {

	Iterable<ReadableDateTime> getDaysFromDate(Date fromDate, TimeZone tz);
}
