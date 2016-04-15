package com.poterenko.proxy.request;

import com.google.api.client.http.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Provider;
import javax.inject.Singleton;
import javax.servlet.http.HttpServletRequest;

import java.io.IOException;

import static com.google.api.client.http.HttpMethods.*;
import static com.poterenko.proxy.ProxyConstants.*;

@Singleton
public class ProxyRequestProvider implements Provider<HttpRequest> {

	private static transient Logger log = LoggerFactory.getLogger(ProxyRequestProvider.class);

	@Inject
	private HttpRequestFactory requestFactory;
	@Inject
	@Named(PROXY_TARGET)
	private Provider<String> hostNameProvider;
	@Inject
	private Provider<HttpServletRequest> servletRequestProvider;

	@Override
	public HttpRequest get() {
		final HttpServletRequest servletRequest = servletRequestProvider.get();
		final String url = buildUrl(servletRequest);

		log.info("[PROXY_REQUEST_PROVIDER][GET][URL: {}]", url);

		try {
			return buildRequest(servletRequest, url);
		} catch (IOException e) {
			log.error("ProxyRequestProvider get exception", e);

			throw new IllegalStateException("ProxyRequestProvider get exception", e);
		}
	}

	private String buildUrl(HttpServletRequest servletRequest) {
		final String method = servletRequest.getMethod();
		final String url = hostNameProvider.get() + servletRequest.getServletPath();

		switch (method) {
			case GET:
				return url + QUERY_SEPARATOR + servletRequest.getQueryString();
			default:
				return url;
		}
	}

	private HttpRequest buildRequest(HttpServletRequest servletRequest, String url) throws IOException {
		final String method = servletRequest.getMethod();
		final GenericUrl genericUrl = new GenericUrl(url);

		switch (method) {
			case GET:
				return requestFactory.buildGetRequest(genericUrl);
			case POST:
				return requestFactory.buildPostRequest(
						genericUrl,
						new InputStreamContent(servletRequest.getContentType(), servletRequest.getInputStream())
				);
			default:
				throw new UnsupportedOperationException();
		}
	}
}