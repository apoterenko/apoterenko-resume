package ru.esoft.wftools.lotus.imrt.xml.converter;

import ru.esoft.wftools.lotus.imrt.entity.element.Item;
import ru.esoft.wftools.lotus.imrt.xml.element.Column;

public interface Converter {

	Object from(Column column, Item item);
}