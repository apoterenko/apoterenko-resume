package com.poterenko.proxy.servlets;

import com.google.api.client.http.HttpTransport;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;
import com.poterenko.proxy.ProxyModule;
import com.poterenko.proxy.guice.InjectorHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nullable;
import javax.servlet.ServletContextEvent;
import java.io.IOException;

public class ProxyContextListener extends GuiceServletContextListener {

	private static final Logger log = LoggerFactory.getLogger(ProxyContextListener.class);

	@Override
	public void contextInitialized(ServletContextEvent event) {
		try {
			super.contextInitialized(event);
		} catch (Throwable e) {
			log.error("ProxyContextListener contextInitialized exception", e);
			System.exit(1);
		}
	}

	@Override
	protected Injector getInjector() {
		return Guice.createInjector(new ProxyModule());
	}

	@Override
	public void contextDestroyed(ServletContextEvent servletContextEvent) {
		super.contextDestroyed(servletContextEvent);

		try {
			onDestroyContext(servletContextEvent);
		} catch (IOException e) {
			log.error("ProxyContextListener contextDestroyed exception", e);
		}
	}

	private void onDestroyContext(ServletContextEvent servletContextEvent) throws IOException {
		final @Nullable Injector injector = InjectorHelper.getInjector(servletContextEvent);
		if (injector == null) {
			log.warn("ProxyContextListener onDestroyContext warning: injector is null");
			return;
		}

		injector.getInstance(HttpTransport.class).shutdown();
	}
}