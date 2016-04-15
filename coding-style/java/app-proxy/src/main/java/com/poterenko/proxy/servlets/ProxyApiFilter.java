package com.poterenko.proxy.servlets;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Singleton;
import javax.servlet.*;
import java.io.IOException;

@Singleton
public class ProxyApiFilter extends AbstractFilter {

	private static transient Logger log = LoggerFactory.getLogger(ProxyApiFilter.class);

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {

		try {
			final String response = IOUtils.toString(getHttpRequest()
					.execute()
					.getContent());

			log.info("[PROXY_API_FILTER][DO_FILTER][RESPONSE: {}]", response);

			IOUtils.write(response, servletResponse.getWriter());
		} catch (Exception e) {
			log.error("ProxyApiFilter doFilter exception", e);
		}
	}
}