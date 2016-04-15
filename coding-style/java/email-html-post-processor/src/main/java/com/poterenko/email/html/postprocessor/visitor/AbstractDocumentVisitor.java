package com.poterenko.email.html.postprocessor.visitor;

import com.poterenko.email.html.postprocessor.xml.DocumentTagResolver;

import javax.inject.Inject;

import java.util.List;

import static com.google.common.collect.Collections2.transform;
import static org.apache.commons.lang3.StringUtils.join;

abstract class AbstractDocumentVisitor implements DocumentVisitor {

	@Inject
	private DocumentTagResolver documentTagResolver;
	@Inject
	private StringCleanerFunction stringCleanerFunction;

	protected DocumentTagResolver getDocumentTagResolver() {
		return documentTagResolver;
	}

	protected StringCleanerFunction getStringCleanerFunction() {
		return stringCleanerFunction;
	}

	protected String joinData(List<String> data, String separator) {
		return join(transform(data, getStringCleanerFunction()), separator);
	}
}