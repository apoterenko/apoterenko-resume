package ru.esoft.web.ui.servlets.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.esoft.web.ui.servlets.AppDispatcher;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/api")
public class AppServlet extends HttpServlet {

	private static final Logger log = LoggerFactory.getLogger(AppServlet.class);

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		final AppDispatcher dispatcher = (AppDispatcher) req.getSession(false)
				.getServletContext()
				.getAttribute(AppContextListener.APP_DISPATCHER_KEY);

		try {
			dispatcher.dispatch();
		} catch (Exception e) {
			log.error("AppServlet doPost exception", e);

			throw new ServletException(e);
		}
	}
}