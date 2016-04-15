package ru.esoft.wftools.lotus.imrt.sql.impl;

import ru.esoft.wftools.lotus.imrt.xml.element.Table;

class DropSequenceGenerator extends AbstractSequenceGenerator {

	public String toSql(Table table) {
		return super.toSql(table, "DROP SEQUENCE %s;");
	}

	static final DropSequenceGenerator INSTANCE = new DropSequenceGenerator();
}