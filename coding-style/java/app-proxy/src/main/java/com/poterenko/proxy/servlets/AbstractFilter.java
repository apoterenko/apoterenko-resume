package com.poterenko.proxy.servlets;

import com.google.api.client.http.HttpRequest;
import com.poterenko.proxy.cookie.CookieChecker;

import javax.inject.Inject;
import javax.inject.Provider;
import javax.servlet.Filter;
import javax.servlet.FilterConfig;

abstract class AbstractFilter implements Filter {

	@Inject
	private CookieChecker cookieChecker;
	@Inject
	private Provider<HttpRequest> httpRequestProvider;

	@Override
	public void init(FilterConfig filterConfig) {
	}

	@Override
	public void destroy() {
	}

	protected CookieChecker getCookieChecker() {
		return cookieChecker;
	}

	protected HttpRequest getHttpRequest() {
		return httpRequestProvider.get();
	}
}