package com.poterenko.email.html.postprocessor.visitor;

import org.w3c.dom.Document;
import org.w3c.dom.Node;

public interface DocumentNodeVisitor {

	void visit(Document document, Node node);
}