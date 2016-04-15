package com.poterenko.email.html.postprocessor.support;

import static org.apache.commons.lang3.StringUtils.*;

public final class StringCleaner {

	private static final String PATTERN = String.format("%s|%s", LF, CR);

	public static String clean(String value) {
		return value.replaceAll(PATTERN, EMPTY).trim();
	}
}