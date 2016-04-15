package com.poterenko.email.html.postprocessor.xml;

import com.google.inject.Provider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.xml.sax.EntityResolver;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;


import javax.inject.Singleton;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.io.StringReader;

import static org.apache.commons.lang3.StringUtils.EMPTY;

@Singleton
public class DocumentBuilderProvider implements Provider<DocumentBuilder> {

	private static final Logger log = LoggerFactory.getLogger(DocumentBuilderProvider.class);

	@Override
	public DocumentBuilder get() {
		try {
			return getDocumentBuilder();
		} catch (ParserConfigurationException e) {
			log.error("DocumentBuilderProvider get exception", e);

			throw new IllegalStateException("DocumentBuilderProvider get exception");
		}
	}

	private DocumentBuilder getDocumentBuilder() throws ParserConfigurationException {
		final DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
		final DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();

		documentBuilder.setEntityResolver(new EntityResolver() {

			@Override
			public InputSource resolveEntity(String publicId, String systemId) throws SAXException, IOException {
				return new InputSource(new StringReader(EMPTY));
			}
		});
		return documentBuilder;
	}
}