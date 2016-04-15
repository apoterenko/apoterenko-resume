package ru.esoft.web.ui.converter.impl;

import com.google.gson.Gson;
import ru.esoft.web.ui.converter.Converter;

abstract class AbstractConverter<T> implements Converter<T> {

	protected String toJson(Object o) {
		return new Gson().toJson(o);
	}
}