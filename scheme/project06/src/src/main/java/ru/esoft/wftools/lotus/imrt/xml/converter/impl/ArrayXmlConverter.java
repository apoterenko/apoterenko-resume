package ru.esoft.wftools.lotus.imrt.xml.converter.impl;

import com.google.common.collect.ImmutableMap;
import ru.esoft.wftools.lotus.imrt.entity.element.ItemType;
import ru.esoft.wftools.lotus.imrt.sql.impl.ColumnValueBuilderFactory;
import ru.esoft.wftools.lotus.imrt.xml.processor.XmlNodeProcessor;
import ru.esoft.wftools.lotus.imrt.xml.processor.impl.ListProcessor;

public class ArrayXmlConverter extends XmlConverter {

	public ArrayXmlConverter() {
		super(
				ImmutableMap.<ItemType, XmlNodeProcessor>builder()
						.put(ItemType.TEXT, new ListProcessor(new ColumnValueBuilderFactory("array")))
						.put(ItemType.NUMBER, new ListProcessor(new ColumnValueBuilderFactory("array")))
						.put(ItemType.DATETIME, new ListProcessor(new ColumnValueBuilderFactory("array")))
						.put(ItemType.TEXTLIST, new ListProcessor(new ColumnValueBuilderFactory("array")))
						.put(ItemType.DATETIMELIST, new ListProcessor(new ColumnValueBuilderFactory("array")))
						.build()
		);
	}
}