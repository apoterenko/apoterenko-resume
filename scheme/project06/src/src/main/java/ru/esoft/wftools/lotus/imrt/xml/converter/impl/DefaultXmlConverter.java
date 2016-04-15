package ru.esoft.wftools.lotus.imrt.xml.converter.impl;

import com.google.common.collect.ImmutableMap;
import ru.esoft.wftools.lotus.imrt.entity.element.ItemType;
import ru.esoft.wftools.lotus.imrt.sql.impl.ColumnValueBuilderFactory;
import ru.esoft.wftools.lotus.imrt.xml.processor.XmlNodeProcessor;
import ru.esoft.wftools.lotus.imrt.xml.processor.impl.ListProcessor;
import ru.esoft.wftools.lotus.imrt.xml.processor.impl.RichProcessor;

public class DefaultXmlConverter extends XmlConverter {

	public DefaultXmlConverter() {
		super(
				ImmutableMap.<ItemType, XmlNodeProcessor>builder()
						.put(ItemType.TEXTLIST, new ListProcessor(new ColumnValueBuilderFactory("xml")))
						.put(ItemType.RICHTEXT, new RichProcessor())
						.build()
		);
	}
}