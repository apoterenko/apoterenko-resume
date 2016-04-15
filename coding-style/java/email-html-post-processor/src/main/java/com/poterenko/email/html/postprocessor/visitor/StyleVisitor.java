package com.poterenko.email.html.postprocessor.visitor;

import com.poterenko.email.html.postprocessor.xsd.HtmlStylesType;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.inject.Inject;
import javax.inject.Singleton;

import static org.apache.commons.lang3.StringUtils.LF;

@Singleton
public class StyleVisitor extends AbstractDocumentVisitor {

	@Inject
	private HtmlStylesType htmlStylesType;

	@Override
	public void visit(Document document) {
		final Element styleElement = document.createElement("style");
		styleElement.setAttribute("type", "text/css");
		styleElement.setTextContent(joinData(htmlStylesType.getHtmlStyle(), LF));

		getDocumentTagResolver()
				.getHead(document)
				.appendChild(styleElement);
	}
}