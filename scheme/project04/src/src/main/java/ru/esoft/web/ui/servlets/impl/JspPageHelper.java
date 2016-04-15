package ru.esoft.web.ui.servlets.impl;

import ru.esoft.web.ui.servlets.ArtifactVersionResolver;

import javax.servlet.http.HttpServletRequest;

public final class JspPageHelper {

	private static String version;

	public static synchronized String getArtifactVersion(HttpServletRequest request) {
		if (version == null) {
			version = InjectorAccessor.getInjector(request)
					.getInstance(ArtifactVersionResolver.class)
					.getVersion();
		}
		return version;
	}
}