package ru.esoft.wftools.lotus.imrt.xml.converter.impl;

import org.jetbrains.annotations.Nullable;
import org.w3c.dom.Node;
import ru.esoft.wftools.lotus.imrt.entity.element.Item;
import ru.esoft.wftools.lotus.imrt.entity.element.ItemType;
import ru.esoft.wftools.lotus.imrt.xml.FirstNodeQualifier;
import ru.esoft.wftools.lotus.imrt.xml.converter.Converter;
import ru.esoft.wftools.lotus.imrt.xml.element.Column;
import ru.esoft.wftools.lotus.imrt.xml.processor.XmlNodeProcessor;

import java.util.Map;

class XmlConverter implements Converter {

	protected final Map<ItemType, XmlNodeProcessor> xmlProcessors;

	protected XmlConverter(Map<ItemType, XmlNodeProcessor> xmlProcessors) {
		this.xmlProcessors = xmlProcessors;
	}

	@Nullable
	@Override
	public Object from(Column column, Item item) {
		final @Nullable Node firstChild = item.getNode();
		if (firstChild == null) {
			return null;
		}

		final @Nullable ItemType type = FirstNodeQualifier.getNodeType(firstChild);
		if (type == null) {
			return null;
		}

		final @Nullable XmlNodeProcessor xmlNodeProcessor = xmlProcessors.get(type);
		return xmlNodeProcessor == null ? null : xmlNodeProcessor.process(firstChild, column);
	}
}