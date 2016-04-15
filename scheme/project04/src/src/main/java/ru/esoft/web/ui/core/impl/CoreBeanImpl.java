package ru.esoft.web.ui.core.impl;

import ru.esoft.Common.UniData.UniData;
import ru.esoft.fatclient.Core;
import ru.esoft.web.ui.core.CoreBean;

public class CoreBeanImpl implements CoreBean {

	private final Core core;
	private final UniData imports;

	public CoreBeanImpl(Core core, UniData imports) {
		this.core = core;
		this.imports = imports;
	}

	@Override
	public Core getCore() {
		return core;
	}

	@Override
	public UniData getImports() {
		return imports;
	}

	@Override
	public CoreBean cloneCoreBean() {
		return new CoreBeanImpl(
				core.clone(),
				imports
		);
	}
}