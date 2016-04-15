package ru.esoft.wftools.lotus.imrt.xml.converter.impl;

import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.esoft.wftools.lotus.imrt.entity.element.Item;
import ru.esoft.wftools.lotus.imrt.xml.element.Column;

public class IntegerConverter extends TextConverter {

	private static final Logger log = LoggerFactory.getLogger(IntegerConverter.class);

	@Nullable
	@Override
	public Object from(Column column, Item item) {
		final @Nullable Object value = super.from(column, item);
		return value != null ? parse(value, column, item) : null;
	}

	private Long parse(Object value, Column column, Item item) {
		try {
			return Long.parseLong(String.valueOf(value));
		} catch (Exception e) {
			log.error("Can't parse value of column {}, entity {} and value {}", column.getName(), item.getName(), value);
		}
		return null;
	}
}