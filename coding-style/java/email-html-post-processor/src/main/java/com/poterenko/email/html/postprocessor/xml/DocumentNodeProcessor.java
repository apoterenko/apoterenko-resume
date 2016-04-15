package com.poterenko.email.html.postprocessor.xml;

import com.poterenko.email.html.postprocessor.visitor.TextNodeVisitor;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.annotation.Nullable;
import javax.inject.Inject;
import javax.inject.Singleton;

import static org.w3c.dom.Node.*;

@Singleton
class DocumentNodeProcessor {

	@Inject
	private TextNodeVisitor textNodeVisitor;

	public void process(Document document, @Nullable Node node) {
		if (node == null) {
			return;
		}

		switch (node.getNodeType()) {
			case ELEMENT_NODE:
				break;
			case TEXT_NODE:
				textNodeVisitor.visit(document, node);
				break;
		}

		final @Nullable NodeList nodeList = node.getChildNodes();
		if (nodeList == null) {
			return;
		}

		final int nodeListLength = nodeList.getLength();
		for (int i = 0; i < nodeListLength; i++) {
			process(document, nodeList.item(i));
		}
	}
}