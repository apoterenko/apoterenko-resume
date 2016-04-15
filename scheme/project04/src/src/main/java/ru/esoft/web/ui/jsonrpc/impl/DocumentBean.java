package ru.esoft.web.ui.jsonrpc.impl;

import ru.esoft.Common.UniData.UniData;
import ru.esoft.Common.util.FormState;

public class DocumentBean {

	private String form;
	private String menu;
	private UniData uniData;
	private UniData imports;
	private FormState formState;
	private String session;

	public String getSession() {
		return session;
	}

	public DocumentBean setSession(String session) {
		this.session = session;
		return this;
	}

	public FormState getFormState() {
		return formState;
	}

	public DocumentBean setFormState(FormState formState) {
		this.formState = formState;
		return this;
	}

	public String getForm() {
		return form;
	}

	public DocumentBean setForm(String form) {
		this.form = form;
		return this;
	}

	public UniData getUniData() {
		return uniData;
	}

	public DocumentBean setUniData(UniData uniData) {
		this.uniData = uniData;
		return this;
	}

	public UniData getImports() {
		return imports;
	}

	public DocumentBean setImports(UniData imports) {
		this.imports = imports;
		return this;
	}

	public String getMenu() {
		return menu;
	}

	public DocumentBean setMenu(String menu) {
		this.menu = menu;
		return this;
	}
}