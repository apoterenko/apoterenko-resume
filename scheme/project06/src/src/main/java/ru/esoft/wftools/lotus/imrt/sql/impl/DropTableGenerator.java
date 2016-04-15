package ru.esoft.wftools.lotus.imrt.sql.impl;

import ru.esoft.wftools.lotus.imrt.xml.element.Table;

class DropTableGenerator {

	private static final String DROP_TABLE_TEMPLATE = "DROP TABLE {table_name} CASCADE;";

	static String toSql(Table table) {
		return DROP_TABLE_TEMPLATE
				.replace("{table_name}", table.getName());
	}
}