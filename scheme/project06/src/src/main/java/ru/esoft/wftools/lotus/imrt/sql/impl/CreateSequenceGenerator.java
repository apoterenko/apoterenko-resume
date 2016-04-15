package ru.esoft.wftools.lotus.imrt.sql.impl;

import ru.esoft.wftools.lotus.imrt.xml.element.Table;

class CreateSequenceGenerator extends AbstractSequenceGenerator {

	public String toSql(Table table) {
		return super.toSql(table, "CREATE SEQUENCE %s;");
	}

	static final CreateSequenceGenerator INSTANCE = new CreateSequenceGenerator();
}