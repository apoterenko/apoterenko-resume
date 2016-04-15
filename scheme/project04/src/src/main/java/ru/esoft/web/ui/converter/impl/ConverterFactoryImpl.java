package ru.esoft.web.ui.converter.impl;

import com.google.common.collect.ImmutableMap;
import com.google.inject.Inject;
import ru.esoft.web.ui.converter.Converter;
import ru.esoft.web.ui.converter.ConverterFactory;
import ru.esoft.web.ui.jsonrpc.impl.DocumentBean;

import java.util.Map;

public class ConverterFactoryImpl implements ConverterFactory {

	private final Map<Class<?>, Converter<?>> converters;
	private final Converter<?> defaultConverter;

	@Inject
	ConverterFactoryImpl(
			StringConverter stringConverter,
			DefaultConverter defaultConverter,
			DocumentBeanConverter documentBeanConverter
	) {
		this.defaultConverter = defaultConverter;
		this.converters = ImmutableMap.<Class<?>, Converter<?>>builder()
				.put(String.class, stringConverter)
				.put(DocumentBean.class, documentBeanConverter)
				.build();
	}

	@Override
	public Converter<?> getInstance(Object response) {
		final Converter<?> converter = converters.get(response.getClass());
		return converter != null ? converter : defaultConverter;
	}
}