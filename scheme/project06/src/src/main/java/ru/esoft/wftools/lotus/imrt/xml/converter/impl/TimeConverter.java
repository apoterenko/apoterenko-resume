package ru.esoft.wftools.lotus.imrt.xml.converter.impl;

import com.google.common.collect.ImmutableList;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.esoft.wftools.lotus.imrt.entity.element.Item;
import ru.esoft.wftools.lotus.imrt.xml.element.Column;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class TimeConverter extends TextConverter {

	private static final Logger log = LoggerFactory.getLogger(TimeConverter.class);

	@Nullable
	@Override
	public Object from(Column column, Item item) {
		final @Nullable Object value = super.from(column, item);
		return value != null ? parse(value, column, item) : null;
	}

	public static Long parse(Object value) {
		return parse(value, null, null);
	}

	public static Long parse(Object value, @Nullable Column column, @Nullable Item item) {
		for (String pattern : PATTERNS) {
			final @Nullable Long parsedValue = parse(pattern, value);
			if (parsedValue != null) {
				return parsedValue;
			}
		}

		log.error("Can't parse value of column {}, item {} and value {}",
				column != null ? column.getName() : null,
				item != null ? item.getName() : null,
				value);
		return null;
	}

	@Nullable
	private static Long parse(String pattern, Object value) {
		try {
			final @Nullable Date date = new SimpleDateFormat(pattern).parse(String.valueOf(value));
			return date != null ? date.getTime() : null;
		} catch (Exception ignored) {
		}
		return null;
	}

	private final static List<String> PATTERNS = ImmutableList.<String>builder()
			.add("yyyyMMdd'T'HHmmss,Z")
			.add("yyyyMMdd'T'HHmmss")
			.add("yyyyMMdd")
			.add("dd.MM.yyyy")
			.build();
}