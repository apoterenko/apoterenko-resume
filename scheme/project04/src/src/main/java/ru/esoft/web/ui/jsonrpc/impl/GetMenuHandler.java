package ru.esoft.web.ui.jsonrpc.impl;

import ru.esoft.fatclient.Core;
import ru.esoft.web.ui.core.CoreBean;

import javax.inject.Singleton;

@Singleton
public class GetMenuHandler extends AbstractCoreHandler {

	@Override
	public Object handle() throws Exception {
		final CoreBean coreBean = getCoreBean();
		final Core core = coreBean.getCore();

		return new DocumentBean()
				.setMenu(core.getMenu())
				.setUniData(core.getCurrentChainData())
				.setImports(coreBean.getImports());
	}
}