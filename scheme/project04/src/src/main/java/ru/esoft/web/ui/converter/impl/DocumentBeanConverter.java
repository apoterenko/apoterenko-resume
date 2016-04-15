package ru.esoft.web.ui.converter.impl;

import com.google.common.collect.ImmutableMap;
import com.google.inject.Singleton;
import ru.esoft.web.ui.jsonrpc.impl.DocumentBean;

import javax.annotation.Nullable;

@Nullable
@Singleton
public class DocumentBeanConverter extends AbstractConverter<DocumentBean> {

	@Override
	public Object toJSON(DocumentBean response) {
		final ImmutableMap.Builder<String, String> builder = ImmutableMap.builder();

		if (response.getUniData() != null) {
			builder.put(DATA, toJson(response.getUniData()));
		}
		if (response.getFormState() != null) {
			builder.put(STATE, toJson(response.getFormState()));
		}
		if (response.getImports() != null) {
			builder.put(IMPORTS, toJson(response.getImports()));
		}
		if (response.getForm() != null) {
			builder.put(FORM, response.getForm());
		}
		if (response.getMenu() != null) {
			builder.put(MENU, response.getMenu());
		}
		if (response.getSession() != null) {
			builder.put(SESSION, response.getSession());
		}
		return builder.build();
	}
}