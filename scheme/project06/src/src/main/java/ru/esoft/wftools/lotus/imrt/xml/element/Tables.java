package ru.esoft.wftools.lotus.imrt.xml.element;

import java.util.Collections;
import java.util.List;

public class Tables {

	private List<Table> list;

	public List<Table> getTables() {
		return list == null
				? Collections.<Table>emptyList()
				: Collections.unmodifiableList(list);
	}
}