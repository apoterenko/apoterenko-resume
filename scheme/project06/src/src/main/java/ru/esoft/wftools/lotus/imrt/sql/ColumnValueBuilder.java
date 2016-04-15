package ru.esoft.wftools.lotus.imrt.sql;

import org.jetbrains.annotations.Nullable;

public interface ColumnValueBuilder {

	Object build();

	void append(String node, @Nullable Object value);

	boolean isEmpty();
}