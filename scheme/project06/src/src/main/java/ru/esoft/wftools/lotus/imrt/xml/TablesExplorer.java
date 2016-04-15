package ru.esoft.wftools.lotus.imrt.xml;

import com.google.common.collect.Iterables;
import ru.esoft.wftools.lotus.imrt.xml.element.Table;
import ru.esoft.wftools.lotus.imrt.xml.element.Tables;

public class TablesExplorer {

	public static void explore(TablesExplorerHandler handler) {
		explore(handler, false);
	}

	public static void explore(TablesExplorerHandler handler, boolean reverse) {
		final Tables tables = XmlObjectProvider.fromXml("tables");

		for (Table table : reverse ? Iterables.reverse(tables.getTables()) : tables.getTables()) {
			handler.handle(TableProvider.fromXml(table.getName()));
		}
	}

	public static interface TablesExplorerHandler {

		void handle(Table table);
	}
}