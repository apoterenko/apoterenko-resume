package ru.esoft.wftools.lotus.imrt.xml.processor;

import org.jetbrains.annotations.Nullable;
import org.w3c.dom.Node;
import ru.esoft.wftools.lotus.imrt.xml.element.Column;

public interface XmlNodeProcessor {

	@Nullable
	Object process(Node node, Column column);
}