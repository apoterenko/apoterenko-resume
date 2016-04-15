package ru.esoft.web.ui.servlets.impl;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Request;
import com.thetransactioncompany.jsonrpc2.server.Dispatcher;
import ru.esoft.web.ui.servlets.AppDispatcher;

import javax.servlet.http.HttpServletResponse;

public class AppDispatcherImpl implements AppDispatcher {

	@Inject
	private Provider<Dispatcher> dispatcherProvider;
	@Inject
	private Provider<JSONRPC2Request> jsonrpc2RequestProvider;
	@Inject
	private Provider<HttpServletResponse> httpResponseProvider;

	@Override
	public void dispatch() throws Exception {
		final JSONRPC2Request req = jsonrpc2RequestProvider.get();
		final HttpServletResponse res = httpResponseProvider.get();

		res.getWriter().print(
				dispatcherProvider.get().process(req, null)
		);
	}
}