package ru.esoft.wftools.lotus.imrt.xml;

import org.apache.commons.lang.StringUtils;
import org.xml.sax.EntityResolver;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.io.StringReader;

public class DocumentBuilderFactory {

	private static DocumentBuilder documentBuilder;

	public static synchronized DocumentBuilder getInstance() throws ParserConfigurationException {
		if (documentBuilder != null) {
			return documentBuilder;
		}

		final javax.xml.parsers.DocumentBuilderFactory documentBuilderFactory =
				javax.xml.parsers.DocumentBuilderFactory.newInstance();

		documentBuilder = documentBuilderFactory.newDocumentBuilder();
		documentBuilder.setEntityResolver(new EntityResolver() {

			@Override
			public InputSource resolveEntity(String publicId, String systemId) throws SAXException, IOException {
				return new InputSource(new StringReader(StringUtils.EMPTY));
			}
		});
		return documentBuilder;
	}
}