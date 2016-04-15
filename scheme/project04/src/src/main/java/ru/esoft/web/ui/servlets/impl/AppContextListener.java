package ru.esoft.web.ui.servlets.impl;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;
import com.google.inject.servlet.ServletModule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.esoft.web.ui.AppModule;
import ru.esoft.web.ui.servlets.AppDispatcher;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.annotation.WebListener;

@WebListener
public class AppContextListener extends GuiceServletContextListener {

	private static final Logger log = LoggerFactory.getLogger(AppContextListener.class);

	@Override
	public void contextInitialized(ServletContextEvent event) {
		try {
			super.contextInitialized(event);

			initApplication(event.getServletContext());
		} catch (Throwable e) {
			log.error("AppContextListener contextInitialized exception", e);
			System.exit(1);
		}
	}


	@Override
	public void contextDestroyed(ServletContextEvent event) {
		super.contextDestroyed(event);

		event.getServletContext().removeAttribute(APP_DISPATCHER_KEY);
	}

	@Override
	protected Injector getInjector() {
		return Guice.createInjector(
				new ServletModule(),
				new AppModule()
		);
	}

	private void initApplication(ServletContext context) throws Exception {
		context.setAttribute(
				APP_DISPATCHER_KEY,
				InjectorAccessor.getInjector(context).getInstance(AppDispatcher.class)
		);
	}

	public static final String APP_DISPATCHER_KEY = "AppDispatcher";
}