package qiwi.util.bean.converter;

import com.google.common.collect.ImmutableSet;
import com.google.inject.Singleton;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import qiwi.core.util.converter.ValueConverter;
import qiwi.portal.user.context.UserContextSupport;
import qiwi.util.StringConverter;
import ru.osmp.common.util.DateUtils;

import java.lang.reflect.Field;
import java.text.ParseException;
import java.util.Date;
import java.util.Set;

import static qiwi.util.bean.converter.DatePattern.LONG;
import static qiwi.util.bean.converter.DatePattern.SHORT;

@Singleton
class DateFieldConverter extends UserContextSupport implements FieldConverter {

	private static final Logger log = LoggerFactory.getLogger(DateFieldConverter.class);

	@Override
	@Nullable
	public Object convert(@NotNull FieldDescriptor fieldDescriptor) {
		if (fieldDescriptor.getValue() == null) {
			return null;
		}

		final Class<?> fieldType = fieldDescriptor.getFieldType();
		final Date dateValue = toDate(fieldDescriptor);

		if (Date.class == fieldType) {
			return dateValue;
		}

		return ValueConverter.convertTo(fieldType, dateValue);
	}

	private Date toDate(FieldDescriptor fieldDescriptor) {
		final String value = fieldDescriptor.getValue();
		final Field field = fieldDescriptor.getField();
		final Long longValue = toLong(value);

		if (longValue != null) {
			return new Date(longValue);
		}

		if (hasDateFieldAnnotation(field)) {
			final DateField dateField = field.getAnnotation(DateField.class);
			return extractDateValue(value, dateField.pattern(), dateField.allowUserTimeZone());
		}

		return parseByDefaultPattern(value);
	}

	private Long toLong(String value) {
		try {
			return ValueConverter.toLong(value);
		} catch (Exception ignored) {
		}
		return null;
	}

	private Date parseByDefaultPattern(String value) {
		for (final DatePattern pattern : DEFAULT_DATE_PATTERNS) {
			final Date extractedDateValue = extractDateValue(value, pattern, false);

			if (extractedDateValue != null) {
				return extractedDateValue;
			}
		}

		log.error("Parse exception occurred converting string value '{}' to date value", value);

		throw new IllegalArgumentException("Can't extract date value...");
	}

	private Date extractDateValue(String value, DatePattern pattern, boolean allowUserTimeZone) {
		try {
			return allowUserTimeZone ?
					new Date(StringConverter.toTimeMillis(value, pattern.getValue(), getUserTimeZone())) :
					DateUtils.parseDate(pattern.getValue(), value);
		} catch (ParseException ignored) {
			return null;
		}
	}

	private boolean hasDateFieldAnnotation(Field field) {
		return field.isAnnotationPresent(DateField.class);
	}

	private static final Set<DatePattern> DEFAULT_DATE_PATTERNS = ImmutableSet.<DatePattern>builder()
			.add(LONG)
			.add(SHORT)
			.build();
}