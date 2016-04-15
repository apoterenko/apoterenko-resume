package com.poterenko.email.html.postprocessor.tidy;

import com.poterenko.email.html.postprocessor.xml.DocumentSerializer;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.tidy.Tidy;

import javax.inject.Inject;
import javax.inject.Provider;
import javax.inject.Singleton;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;

import static com.poterenko.email.html.postprocessor.ApplicationConstants.ENCODING;
import static org.apache.commons.lang3.StringEscapeUtils.unescapeXml;

@Singleton
public class TidyParser {

	private static final Logger log = LoggerFactory.getLogger(TidyParser.class);

	@Inject
	private Provider<Tidy> tidyProvider;
	@Inject
	private DocumentSerializer documentSerializer;

	public String parse(Document doc, boolean indenting) {
		final Tidy tidy = tidyProvider.get();
		tidy.setSmartIndent(indenting);
		tidy.setIndentContent(indenting);

		InputStream in = null;
		ByteArrayOutputStream out = null;

		final String serializedDocument = documentSerializer.serialize(doc, indenting);

		try {
			in = IOUtils.toInputStream(serializedDocument);
			tidy.parse(in, out = new ByteArrayOutputStream());

			return unescapeXml(
					out.toString(ENCODING)
			);
		} catch (UnsupportedEncodingException e) {
			log.error("TidyParser parse exception", e);

			throw new IllegalStateException("TidyParser parse exception", e);
		} finally {
			IOUtils.closeQuietly(in);
			IOUtils.closeQuietly(out);
		}
	}
}