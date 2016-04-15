package com.poterenko.email.html.postprocessor.visitor;

import org.w3c.dom.Document;

public interface DocumentVisitor {

	void visit(Document document);
}