package ru.esoft.web.ui.jsonrpc.impl;

import com.google.inject.Singleton;
import org.jetbrains.annotations.Nullable;

@Singleton
public class DoDestroySessionHandler extends AbstractActionHandler {

	@Override
	public Boolean handle() throws Exception {
		final @Nullable String session = getValueConverter().getSession();
		if (session == null) {
			throw new IllegalStateException("Exception: session is null");
		}

		destroyCore(session);
		return true;
	}
}