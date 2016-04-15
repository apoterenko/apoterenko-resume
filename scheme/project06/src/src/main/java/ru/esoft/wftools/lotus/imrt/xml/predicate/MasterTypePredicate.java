package ru.esoft.wftools.lotus.imrt.xml.predicate;

import com.google.common.base.Predicate;
import ru.esoft.wftools.lotus.imrt.xml.element.Table;
import ru.esoft.wftools.lotus.imrt.xml.element.TableType;

public class MasterTypePredicate implements Predicate<Table> {

	@Override
	public boolean apply(Table table) {
		return table.getType().equals(TableType.MASTER);
	}

	public static final Predicate<Table> INSTANCE = new MasterTypePredicate();
}