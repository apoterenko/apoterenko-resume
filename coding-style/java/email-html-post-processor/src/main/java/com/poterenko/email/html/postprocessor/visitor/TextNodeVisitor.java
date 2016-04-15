package com.poterenko.email.html.postprocessor.visitor;

import com.poterenko.email.html.postprocessor.ApplicationConfig;
import com.poterenko.email.html.postprocessor.support.StringCleaner;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import javax.inject.Inject;
import javax.inject.Singleton;

import static org.apache.commons.lang3.StringUtils.EMPTY;

@Singleton
public class TextNodeVisitor implements DocumentNodeVisitor {

	@Inject
	private ApplicationConfig applicationConfig;

	@Override
	public void visit(Document document, Node node) {
		final String nodeContent = StringCleaner.clean(node.getTextContent());
		final boolean itFitsTemplate = applicationConfig
				.getSkipTextNodeExtraPattern()
				.matcher(nodeContent)
				.find();

		if (itFitsTemplate) {
			return;
		}
		node.setTextContent(EMPTY);

		final Element wrapperElement = document.createElement("span");
		wrapperElement.setAttribute("class", "media-inner-text");
		wrapperElement.setTextContent(nodeContent);
		node.getParentNode().appendChild(wrapperElement);
	}
}