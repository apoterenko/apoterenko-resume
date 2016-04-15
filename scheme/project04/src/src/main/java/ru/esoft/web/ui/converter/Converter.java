package ru.esoft.web.ui.converter;

public interface Converter<T> {

	Object toJSON(T object);

	static final String DATA = "data";
	static final String MENU = "menu";
	static final String IMPORTS = "imports";
	static final String FORM = "form";
	static final String STATE = "state";
	static final String SESSION = "session";
}