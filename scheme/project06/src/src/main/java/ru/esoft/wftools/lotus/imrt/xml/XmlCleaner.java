package ru.esoft.wftools.lotus.imrt.xml;

import org.jetbrains.annotations.Nullable;
import org.jooq.tools.StringUtils;

public class XmlCleaner {

	private static final String SPECIAL_CHARS_PATTERN = "\n|\t|\r";

	@Nullable
	public static String clean(@Nullable String value) {
		return value == null ? null : value.replaceAll(SPECIAL_CHARS_PATTERN, StringUtils.EMPTY).trim();
	}
}