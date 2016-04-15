package ru.esoft.web.ui.servlets.impl;

import com.google.inject.Injector;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

public final class InjectorAccessor {

	public static Injector getInjector(ServletContext context) {
		return (Injector) context.getAttribute(Injector.class.getName());
	}

	public static Injector getInjector(HttpServletRequest request) {
		return getInjector(request.getSession(false).getServletContext());
	}
}