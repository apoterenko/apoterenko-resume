package ru.esoft.web.ui.jsonrpc.impl;

import com.google.inject.Singleton;
import org.jetbrains.annotations.Nullable;
import ru.esoft.Common.UniData.UniData;
import ru.esoft.fatclient.Core;

@Singleton
public class ReloadElementHandler extends AbstractCoreHandler {

	@Override
	public Object handle() throws Exception {
		final Core core = getCoreBean().getCore();

		final @Nullable Long elementId = getValueConverter().getId();
		if (elementId == null) {
			throw new IllegalArgumentException("Element id is null");
		}

		core.getCurrentData(new UniData());
		return core.reloadElement(getValueConverter().toUniData(), elementId);
	}
}