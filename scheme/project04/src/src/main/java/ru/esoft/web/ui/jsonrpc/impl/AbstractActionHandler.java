package ru.esoft.web.ui.jsonrpc.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.esoft.Common.UniData.UniData;
import ru.esoft.fatclient.Core;
import ru.esoft.web.ui.core.CoreBean;

abstract class AbstractActionHandler extends AbstractCoreHandler {

	private static final Logger log = LoggerFactory.getLogger(AbstractActionHandler.class);

	protected DocumentBean handle(CoreBean coreBean) throws Exception {
		final Core core = coreBean.getCore();
		final String form = core.getForm();
		final UniData uniData = core.getCurrentData();

		if (log.isDebugEnabled()) {
			log.debug(getFormatter().format(form));
			log.debug(String.valueOf(uniData));
		}
		return new DocumentBean()
				.setForm(form)
				.setImports(coreBean.getImports())
				.setUniData(uniData)
				.setFormState(core.getFormState())
				.setSession(String.valueOf(core.getSessionId()));
	}
}