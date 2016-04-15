package com.poterenko.email.html.postprocessor.tidy;

import com.google.inject.Provider;
import com.poterenko.email.html.postprocessor.ResourceFactory;
import org.w3c.tidy.Tidy;

import javax.inject.Singleton;

import static com.poterenko.email.html.postprocessor.ApplicationConstants.ENCODING;

@Singleton
public class TidyProvider implements Provider<Tidy> {

	@Override
	public Tidy get() {
		final Tidy tidy = new Tidy();
		tidy.setInputEncoding(ENCODING);
		tidy.setOutputEncoding(ENCODING);
		tidy.setDocType(ResourceFactory.HTML_DOC_TYPE);
		tidy.setTidyMark(false);
		tidy.setShowWarnings(false);

		return tidy;
	}
}