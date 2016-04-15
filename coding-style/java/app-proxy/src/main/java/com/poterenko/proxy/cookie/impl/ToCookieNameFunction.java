package com.poterenko.proxy.cookie.impl;

import com.google.common.base.Function;

import javax.servlet.http.Cookie;

public class ToCookieNameFunction implements Function<Cookie, String> {

	@Override
	public String apply(Cookie c) {
		return c.getName();
	}
}