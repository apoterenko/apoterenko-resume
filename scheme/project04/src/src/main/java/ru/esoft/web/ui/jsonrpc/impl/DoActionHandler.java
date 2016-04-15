package ru.esoft.web.ui.jsonrpc.impl;

import com.google.inject.Singleton;
import org.jetbrains.annotations.Nullable;
import ru.esoft.Common.util.FormState;
import ru.esoft.fatclient.Core;
import ru.esoft.web.ui.core.CoreBean;

@Singleton
public class DoActionHandler extends AbstractActionHandler {

	@Override
	public Object handle() throws Exception {
		final @Nullable Long actionId = getValueConverter().getActionId();
		if (actionId == null) {
			throw new IllegalArgumentException("Exception: actionId is null");
		}

		final CoreBean coreBean = getCoreBean(true);
		final Core core = coreBean.getCore();
		core.doAction(actionId, getValueConverter().toUniData(), new FormState());
		return handle(coreBean);
	}
}