package ru.esoft.web.ui.jsonrpc.impl;

import com.google.inject.Singleton;
import org.jetbrains.annotations.Nullable;
import ru.esoft.web.ui.core.CoreBean;

@Singleton
public class DoMenuActionHandler extends AbstractActionHandler {

	@Override
	public Object handle() throws Exception {
		final @Nullable Long branchId = getValueConverter().toLong("branchId");
		if (branchId == null) {
			throw new IllegalStateException("Exception: branchId is null");
		}

		final CoreBean coreBean = getCoreBean();
		coreBean.getCore().doMenuAction(branchId, getValueConverter().toUniData());
		return handle(coreBean);
	}
}