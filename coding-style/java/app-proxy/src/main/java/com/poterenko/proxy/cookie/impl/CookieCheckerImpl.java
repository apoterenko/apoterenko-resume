package com.poterenko.proxy.cookie.impl;

import com.google.common.base.Function;
import com.poterenko.proxy.cookie.CookieChecker;

import javax.annotation.Nullable;
import javax.inject.Inject;
import javax.inject.Provider;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import static com.google.common.collect.Collections2.transform;
import static java.util.Arrays.asList;

public class CookieCheckerImpl implements CookieChecker {

	@Inject
	private Provider<HttpServletRequest> servletRequestProvider;
	@Inject
	private Function<Cookie, String> toCookieNameFunction;

	@Override
	public boolean hasCookie(String name) {
		final HttpServletRequest request = servletRequestProvider.get();

		final @Nullable Cookie[] cookies = request.getCookies();
		return cookies != null && transform(asList(cookies), toCookieNameFunction).contains(name);
	}
}