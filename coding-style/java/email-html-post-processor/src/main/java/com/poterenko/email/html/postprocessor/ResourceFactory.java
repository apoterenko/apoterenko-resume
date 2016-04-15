package com.poterenko.email.html.postprocessor;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

public final class ResourceFactory {

	private static final Logger log = LoggerFactory.getLogger(ResourceFactory.class);

	@SuppressWarnings("unchecked")
	private static <T> T getResource(String name) {
		return (T) ResourceFactory.class.getResource(name);
	}

	@SuppressWarnings("unchecked")
	private static <T> T getResourceAsStream(String name) {
		return (T) ResourceFactory.class.getResourceAsStream(name);
	}

	private static URL getXml(String name) {
		return getResource(String.format("xml/%s.xml", name));
	}

	private static String getHtml(String name) {
		final String html = String.format("html/%s.html", name);

		InputStream in = null;

		try {
			return IOUtils.toString(in = getResourceAsStream(html));
		} catch (IOException e) {
			log.error("ResourceFactory getHtml exception", e);

			throw new IllegalStateException("ResourceFactory getHtml exception", e);
		} finally {
			IOUtils.closeQuietly(in);
		}
	}

	public static final URL HTML_STYLE = getXml("html-style");
	public static final URL HTML_ATTRIBUTES = getXml("html-attributes");
	public static final String HTML_DOC_TYPE = getHtml("document-type");
}