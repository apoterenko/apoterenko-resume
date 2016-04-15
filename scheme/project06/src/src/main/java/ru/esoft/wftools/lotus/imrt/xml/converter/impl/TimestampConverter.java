package ru.esoft.wftools.lotus.imrt.xml.converter.impl;

import org.jetbrains.annotations.Nullable;
import ru.esoft.wftools.lotus.imrt.entity.element.Item;
import ru.esoft.wftools.lotus.imrt.xml.element.Column;

import java.sql.Timestamp;

public class TimestampConverter extends TimeConverter {

	@Nullable
	@Override
	public Object from(Column column, Item item) {
		final @Nullable Object value = super.from(column, item);
		return value != null ? new Timestamp(Long.class.cast(value)) : null;
	}
}