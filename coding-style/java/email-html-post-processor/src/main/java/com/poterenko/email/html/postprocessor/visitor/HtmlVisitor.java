package com.poterenko.email.html.postprocessor.visitor;

import com.poterenko.email.html.postprocessor.xsd.HtmlAttributesType;
import org.w3c.dom.Document;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class HtmlVisitor extends AbstractDocumentVisitor {

	@Inject
	private HtmlAttributesType htmlAttributesType;

	@Override
	public void visit(Document document) {
		getDocumentTagResolver()
				.getHtml(document)
				.setAttribute("style", joinData(htmlAttributesType.getHtmlAttribute(), ";"));
	}
}