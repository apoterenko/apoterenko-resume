package qiwi.util.bean.converter;

import org.apache.camel.Converter;
import org.joda.time.DateTime;

import java.sql.Timestamp;
import java.util.Date;

@Converter
public class DateConverter {

	@Converter
	public static DateTime toDateTime(Date date) {
		return new DateTime(date.getTime());
	}

	@Converter
	public static Timestamp toTimestamp(Date date) {
		return new Timestamp(date.getTime());
	}
}
