package com.poterenko.email.html.postprocessor.xml;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.xml.parsers.DocumentBuilder;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Singleton
class DocumentFactory {

	private static final Logger log = LoggerFactory.getLogger(DocumentFactory.class);

	@Inject
	private DocumentBuilder documentBuilder;

	private Document toDocument(InputStream in) {
		try {
			return documentBuilder.parse(in);
		} catch (Exception e) {
			log.error("DocumentFactory toDocument exception", e);

			throw new IllegalStateException("DocumentFactory toDocument exception", e);
		}
	}

	public Document toDocument(String in) {
		InputStream input = null;

		try {
			return toDocument(input = IOUtils.toInputStream(in));
		} finally {
			IOUtils.closeQuietly(input);
		}
	}

	public Document toDocument(File file) {
		InputStream in = null;

		try {
			return toDocument(in = new FileInputStream(file));
		} catch (IOException e) {
			log.error("DocumentFactory toDocument exception", e);

			throw new IllegalStateException("DocumentFactory toDocument exception", e);
		} finally {
			IOUtils.closeQuietly(in);
		}
	}
}