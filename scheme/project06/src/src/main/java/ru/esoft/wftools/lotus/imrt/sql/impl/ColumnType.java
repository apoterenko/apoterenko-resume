package ru.esoft.wftools.lotus.imrt.sql.impl;

import com.google.common.collect.ImmutableMap;

import java.util.Map;

public enum ColumnType {

	BOOLEAN("boolean"),
	CHARACTER("character"),
	TEXT("text"),
	TEXT_ARRAY("text[]"),
	INTEGER("integer"),
	INTEGER_ARRAY("integer[]"),
	DATE("date"),
	DATE_ARRAY("date[]"),
	XML("xml"),
	TIMESTAMP("timestamp with time zone"),
	TIMESTAMP_ARRAY("timestamp with time zone[]");

	private final String value;

	private ColumnType(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}

	public static final Map<String, ColumnType> INSTANCE;

	static {
		final ImmutableMap.Builder<String, ColumnType> builder = ImmutableMap.builder();

		for (ColumnType columnType : ColumnType.values()) {
			builder.put(columnType.getValue(), columnType);
		}

		INSTANCE = builder.build();
	}
}