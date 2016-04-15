package ru.esoft.wftools.lotus.imrt.xml.converter.impl;

import org.jetbrains.annotations.Nullable;
import ru.esoft.wftools.lotus.imrt.entity.element.Item;
import ru.esoft.wftools.lotus.imrt.xml.element.Column;

public class BooleanConverter extends IntegerConverter {

	@Nullable
	@Override
	public Object from(Column column, Item item) {
		final @Nullable Object value = super.from(column, item);
		return value != null && value instanceof Long && Long.class.cast(value) == 1;
	}
}