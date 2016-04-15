package com.poterenko.email.html.postprocessor.xml;

import org.apache.commons.io.IOUtils;
import org.apache.xml.serialize.OutputFormat;
import org.apache.xml.serialize.XMLSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;

import javax.inject.Singleton;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import static com.poterenko.email.html.postprocessor.ApplicationConstants.ENCODING;
import static org.apache.xml.serialize.Method.HTML;

@Singleton
public class DocumentSerializer {

	private static final Logger log = LoggerFactory.getLogger(DocumentSerializer.class);

	public String serialize(Document document, boolean indenting) {
		try {
			return serializeDocument(document, indenting);
		} catch (IOException e) {
			log.error("DocumentSerializer serialize exception", e);

			throw new IllegalStateException("DocumentSerializer serialize exception", e);
		}
	}

	private String serializeDocument(Document document, boolean indenting) throws IOException {
		final ByteArrayOutputStream out = new ByteArrayOutputStream();
		final XMLSerializer serializer = new XMLSerializer();

		serializer.setOutputFormat(new OutputFormat(HTML, ENCODING, indenting));
		serializer.setOutputByteStream(out);

		try {
			serializer.serialize(document);
			return out.toString(ENCODING);
		} finally {
			IOUtils.closeQuietly(out);
		}
	}
}