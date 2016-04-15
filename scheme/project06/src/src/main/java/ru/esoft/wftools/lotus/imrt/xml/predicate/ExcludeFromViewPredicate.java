package ru.esoft.wftools.lotus.imrt.xml.predicate;

import com.google.common.base.Predicate;
import ru.esoft.wftools.lotus.imrt.xml.element.Column;

public class ExcludeFromViewPredicate implements Predicate<Column> {

	@Override
	public boolean apply(Column column) {
		return column != null && column.isExcludeFromView();
	}

	public static final Predicate<Column> INSTANCE = new ExcludeFromViewPredicate();
}