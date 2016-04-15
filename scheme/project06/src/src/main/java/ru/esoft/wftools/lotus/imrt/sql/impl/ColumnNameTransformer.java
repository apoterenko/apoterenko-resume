package ru.esoft.wftools.lotus.imrt.sql.impl;

public class ColumnNameTransformer {

	public static String transform(String fieldName) {
		return transform(fieldName, true);
	}

	public static String transform(String fieldName, boolean usePrefix) {
		if (usePrefix && !fieldName.startsWith("ld_")) {
			fieldName = "ld_" + fieldName;
		}

		fieldName = fieldName.replaceAll("\\$", "");
		final StringBuilder sb = new StringBuilder();

		int i = 0;
		boolean canAppendUnderscore = true;

		for (Character a : fieldName.toCharArray()) {
			final boolean isUpperCase = Character.isUpperCase(a);
			if (i > 0 && canAppendUnderscore && isUpperCase) {
				sb.append("_");
			}
			sb.append(a);
			i++;
			canAppendUnderscore = !isUpperCase;
		}
		return sb.toString().toLowerCase().replaceAll("\\_\\_", "_");
	}
}