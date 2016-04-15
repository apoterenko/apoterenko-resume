package ru.esoft.web.ui.jsonrpc.impl;

import com.google.inject.Inject;
import ru.esoft.web.ui.converter.ValueConverter;
import ru.esoft.web.ui.core.CoreBean;
import ru.esoft.web.ui.jsonrpc.CoreHandler;
import ru.esoft.web.ui.servlets.CoreBeanManager;
import ru.esoft.web.ui.xml.Formatter;

abstract class AbstractCoreHandler implements CoreHandler {

	@Inject
	private CoreBeanManager coreBeanManager;
	@Inject
	private ValueConverter valueConverter;
	@Inject
	private Formatter formatter;

	protected CoreBean getCoreBean(boolean clone) throws Exception {
		return coreBeanManager.getCoreBean(clone);
	}

	protected void destroyCore(String session) throws Exception {
		coreBeanManager.destroyCoreBean(session);
	}

	protected CoreBean getCoreBean() throws Exception {
		return getCoreBean(false);
	}

	protected Formatter getFormatter() {
		return formatter;
	}

	protected ValueConverter getValueConverter() {
		return valueConverter;
	}
}