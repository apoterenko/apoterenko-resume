package ru.esoft.web.ui.converter.impl;

import com.google.common.collect.ImmutableMap;
import com.google.inject.Singleton;
import ru.esoft.web.ui.converter.Converter;

@Singleton
public class StringConverter implements Converter<Object> {

	@Override
	public Object toJSON(Object response) {
		return ImmutableMap.<String, Object>builder()
				.put(DATA, response)
				.build();
	}
}