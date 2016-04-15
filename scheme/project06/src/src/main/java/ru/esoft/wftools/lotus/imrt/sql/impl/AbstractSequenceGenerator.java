package ru.esoft.wftools.lotus.imrt.sql.impl;

import org.jetbrains.annotations.Nullable;
import org.jooq.tools.StringUtils;
import ru.esoft.wftools.lotus.imrt.xml.element.Column;
import ru.esoft.wftools.lotus.imrt.xml.element.Table;

abstract class AbstractSequenceGenerator {

	protected String toSql(Table table, String template) {
		final @Nullable Column primaryKey = table.getPrimaryKey();
		if (primaryKey == null) {
			return StringUtils.EMPTY;
		}

		return String.format(template, SequenceNameGenerator.generate(table, primaryKey));
	}
}