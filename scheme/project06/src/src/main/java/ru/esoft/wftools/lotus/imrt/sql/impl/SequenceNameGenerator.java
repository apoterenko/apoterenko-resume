package ru.esoft.wftools.lotus.imrt.sql.impl;

import ru.esoft.wftools.lotus.imrt.xml.element.Column;
import ru.esoft.wftools.lotus.imrt.xml.element.Table;

class SequenceNameGenerator {

	static String generate(Table table, Column column) {
		return String.format("%s_%s", table.getName(), column.getSequenceName());
	}
}