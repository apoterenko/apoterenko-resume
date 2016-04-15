package ru.esoft.web.ui.jsonrpc.impl;

import com.google.common.collect.ImmutableMap;
import com.google.inject.Inject;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Error;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Request;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Response;
import com.thetransactioncompany.jsonrpc2.server.MessageContext;
import com.thetransactioncompany.jsonrpc2.server.RequestHandler;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.esoft.web.ui.converter.ConverterFactory;
import ru.esoft.web.ui.jsonrpc.CoreHandler;

import java.util.Map;

public class GlobalRequestHandler implements RequestHandler {

	private static final Logger log = LoggerFactory.getLogger(GlobalRequestHandler.class);

	private final Map<String, CoreHandler> handlers;
	private final ConverterFactory converterFactory;

	@Inject
	public GlobalRequestHandler(
			ConverterFactory converterFactory,
			GetMenuHandler menuHandler,
			DoMenuActionHandler doMenuActionHandler,
			ReloadElementHandler reloadElementHandler,
			DoActionHandler doActionHandler,
			DoDestroySessionHandler doDestroySessionHandler) {
		this.converterFactory = converterFactory;
		this.handlers = ImmutableMap.<String, CoreHandler>builder()
				.put("getMenu", menuHandler)
				.put("doMenuAction", doMenuActionHandler)
				.put("reloadElement", reloadElementHandler)
				.put("doAction", doActionHandler)
				.put("doDestroySession", doDestroySessionHandler)
				.build();
	}

	@Override
	public String[] handledRequests() {
		final String[] methods = new String[handlers.size()];
		int i = 0;
		for (String method : handlers.keySet()) {
			methods[i++] = method;
		}
		return methods;
	}

	@Override
	public JSONRPC2Response process(JSONRPC2Request req, MessageContext ctx) {
		final @Nullable CoreHandler handler = handlers.get(req.getMethod());

		if (handler != null) {
			return new JSONRPC2Response(toResponse(process(handler)), req.getID());
		} else {
			return new JSONRPC2Response(JSONRPC2Error.METHOD_NOT_FOUND, req.getID());
		}
	}

	@SuppressWarnings("unchecked")
	private Object toResponse(Object response) {
		return converterFactory.getInstance(response).toJSON(response);
	}

	private Object process(CoreHandler handler) {
		try {
			return handler.handle();
		} catch (Exception e) {
			log.error("GlobalRequestHandler process exception", e);

			return JSONRPC2Error.INTERNAL_ERROR;
		}
	}
}