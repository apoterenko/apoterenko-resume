package com.poterenko.email.html.postprocessor.xml;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import javax.annotation.Nullable;
import javax.inject.Singleton;

@Singleton
public class DocumentTagResolver {

	public Element getTitle(Document document) {
		return getNode(document, "title");
	}

	public Element getHead(Document document) {
		return getNode(document, "head");
	}

	public Element getHtml(Document document) {
		return getNode(document, "html");
	}

	private Element getNode(Document document, String name) {
		final @Nullable NodeList nl = document.getElementsByTagName(name);
		if (nl == null) {
			throw new IllegalStateException("Node by name " + name + " is not found!");
		}

		if (nl.getLength() == 0) {
			throw new IllegalStateException("Empty child list by node name " + name + "!");
		}
		return Element.class.cast(nl.item(0));
	}
}