package com.poterenko.proxy.servlets;

import com.poterenko.proxy.ProxyConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Singleton;
import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static java.lang.Boolean.TRUE;

@Singleton
public class ProxyCookieFilter extends AbstractFilter {

	private static transient Logger log = LoggerFactory.getLogger(ProxyCookieFilter.class);

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
		final HttpServletResponse originalResponse = HttpServletResponse.class.cast(servletResponse);

		if (!getCookieChecker().hasCookie(ProxyConstants.DEBUG_COOKIE_NAME)) {
			final Cookie debugCookie = new Cookie(ProxyConstants.DEBUG_COOKIE_NAME, TRUE.toString());
			debugCookie.setMaxAge(-1);
			originalResponse.addCookie(debugCookie);

			log.info("[PROXY_COOKIE_FILTER][DO_FILTER][Debug cookie successfully added!]");
		}

		filterChain.doFilter(servletRequest, servletResponse);
	}
}