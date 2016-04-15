package ru.esoft.wftools.lotus.imrt.xml;

import com.thoughtworks.xstream.XStream;
import ru.esoft.wftools.lotus.imrt.xml.element.Column;
import ru.esoft.wftools.lotus.imrt.xml.element.Table;
import ru.esoft.wftools.lotus.imrt.xml.element.Tables;

class XStreamFactory {

	static XStream getInstance() {
		final XStream stream = new XStream();
		stream.alias("table", Table.class);
		stream.alias("column", Column.class);
		stream.alias("tables", Tables.class);
		return stream;
	}
}