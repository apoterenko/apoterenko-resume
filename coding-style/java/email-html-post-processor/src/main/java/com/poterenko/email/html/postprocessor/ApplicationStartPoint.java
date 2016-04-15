package com.poterenko.email.html.postprocessor;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.poterenko.email.html.postprocessor.xml.DocumentProcessor;

public class ApplicationStartPoint {

	public static void main(String[] args) {
		if (args.length < 2) {
			throw new IllegalArgumentException("Expected two input parameters: input file path and output file path");
		}

		final String inPath = args[0];
		final String outPath = args[1];

		final DocumentProcessor processor = getProcessor();
		processor.process(inPath, outPath);
	}

	private static DocumentProcessor getProcessor() {
		final Injector injector = Guice.createInjector(new ApplicationModule());
		return injector.getInstance(DocumentProcessor.class);
	}
}