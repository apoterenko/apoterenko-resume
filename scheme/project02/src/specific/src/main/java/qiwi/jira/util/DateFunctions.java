package qiwi.jira.util;

import java.util.Date;

import org.joda.time.ReadableInstant;

import com.google.common.base.Function;

public interface DateFunctions {

	Function<ReadableInstant, Date> JODATIME_TO_DATE = new Function<ReadableInstant, Date>() {
		@Override
		public Date apply(ReadableInstant from) {
			return from == null ? null : new Date(from.getMillis());
		}
	};
}
