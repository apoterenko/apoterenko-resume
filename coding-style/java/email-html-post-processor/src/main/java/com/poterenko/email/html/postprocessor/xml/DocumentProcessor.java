package com.poterenko.email.html.postprocessor.xml;

import com.poterenko.email.html.postprocessor.tidy.TidyParser;
import com.poterenko.email.html.postprocessor.visitor.DocumentVisitor;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.*;

import javax.inject.Inject;
import javax.inject.Singleton;

import java.io.*;

@Singleton
public class DocumentProcessor {

	private static final Logger log = LoggerFactory.getLogger(DocumentProcessor.class);

	@Inject
	private TidyParser tidyParser;
	@Inject
	private DocumentFactory documentFactory;
	@Inject
	private DocumentNodeProcessor documentNodeProcessor;
	@Inject
	private Iterable<DocumentVisitor> documentVisitors;

	public void process(String inputFilePath, String outputFilePath) {
		final Document originalDocument = documentFactory.toDocument(new File(inputFilePath));

		documentNodeProcessor.process(originalDocument, originalDocument);

		final Document normalizedDocument = getNormalizedDocument(
				tidyParser.parse(originalDocument, false)
		);
		writeOutFile(
				tidyParser.parse(normalizedDocument, true),
				outputFilePath
		);
	}

	private void writeOutFile(String documentAsString, String outputFilePath) {
		OutputStream out = null;
		try {
			IOUtils.write(
					documentAsString,
					out = new FileOutputStream(new File(outputFilePath))
			);
		} catch (IOException e) {
			log.error("DocumentProcessor writeOutFile exception", e);
		} finally {
			IOUtils.closeQuietly(out);
		}
	}

	private Document getNormalizedDocument(String documentAsString) {
		final Document normalizedDocument = documentFactory.toDocument(documentAsString);
		for (DocumentVisitor documentVisitor : documentVisitors) {
			documentVisitor.visit(normalizedDocument);
		}
		return normalizedDocument;
	}
}