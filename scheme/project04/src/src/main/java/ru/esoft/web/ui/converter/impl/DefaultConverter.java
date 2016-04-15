package ru.esoft.web.ui.converter.impl;

import com.google.common.collect.ImmutableMap;
import com.google.inject.Singleton;

@Singleton
public class DefaultConverter extends AbstractConverter<Object> {

	@Override
	public Object toJSON(Object response) {
		return ImmutableMap.<String, String>builder()
				.put(DATA, toJson(response))
				.build();
	}
}