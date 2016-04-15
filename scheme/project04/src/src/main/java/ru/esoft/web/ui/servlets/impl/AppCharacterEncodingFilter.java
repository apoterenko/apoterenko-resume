package ru.esoft.web.ui.servlets.impl;

import javax.annotation.Nullable;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter(filterName = "AppCharacterEncodingFilter", urlPatterns = {"/api"})
public class AppCharacterEncodingFilter implements Filter {

	@Nullable
	protected String encoding;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		this.encoding = filterConfig.getInitParameter("encoding");
	}

	@Override
	public void destroy() {
		this.encoding = null;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		response.setCharacterEncoding("UTF-8");
		chain.doFilter(request, response);
	}
}