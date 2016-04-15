package ru.esoft.web.ui.xml.impl;

import com.google.inject.Inject;
import org.apache.xml.serialize.OutputFormat;
import org.apache.xml.serialize.XMLSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import ru.esoft.web.ui.xml.Formatter;
import ru.esoft.web.ui.xml.Parser;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

public class FormatterImpl implements Formatter {

	private static final Logger log = LoggerFactory.getLogger(FormatterImpl.class);

	@Inject
	private Parser parser;

	@Override
	public String format(String xml) {
		final Document document = parser.parse(xml);
		final OutputFormat format = new OutputFormat(document);
		format.setLineWidth(70);
		format.setIndenting(true);
		format.setIndent(4);

		final Writer out = new StringWriter();
		serialize(document, out, format);
		return out.toString();
	}

	private void serialize(Document document, Writer out, OutputFormat format) {
		try {
			new XMLSerializer(out, format).serialize(document);
		} catch (IOException e) {
			log.error("IOException serialize exception", e);
		}
	}
}