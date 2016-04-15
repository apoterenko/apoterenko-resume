package ru.esoft.web.ui.xml.impl;

import com.google.inject.Inject;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import ru.esoft.web.ui.xml.Parser;

import javax.xml.parsers.DocumentBuilderFactory;
import java.io.StringReader;

public class ParserImpl implements Parser {

	@Inject
	private DocumentBuilderFactory documentBuilderFactory;

	@Override
	public Document parse(String in) {
		try {
			return documentBuilderFactory.newDocumentBuilder().parse(new InputSource(new StringReader(in)));
		} catch (Exception e) {
			throw new IllegalStateException(e);
		}
	}
}