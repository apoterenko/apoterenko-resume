package ru.esoft.wftools.lotus.imrt.xml.converter.impl;

import org.jetbrains.annotations.Nullable;
import org.jooq.tools.StringUtils;
import ru.esoft.wftools.lotus.imrt.entity.element.Item;
import ru.esoft.wftools.lotus.imrt.xml.converter.Converter;
import ru.esoft.wftools.lotus.imrt.xml.element.Column;

public class TextConverter implements Converter {

	@Nullable
	@Override
	public Object from(Column column, Item item) {
		final @Nullable String value = trim(item.getText());
		return StringUtils.isEmpty(value) || isEmpty(value) ? null : value;
	}

	private boolean isEmpty(String value) {
		return "[none]".equals(value) || "%NONE%".equals(value);
	}

	private static String trim(String value) {
		return value == null ? null : value.trim();
	}
}