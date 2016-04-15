package com.poterenko.proxy.guice;

import com.google.inject.Injector;

import javax.servlet.ServletContextEvent;

public class InjectorHelper {

	public static Injector getInjector(ServletContextEvent servletContextEvent) {
		return (Injector) servletContextEvent
				.getServletContext()
				.getAttribute(Injector.class.getName());
	}
}