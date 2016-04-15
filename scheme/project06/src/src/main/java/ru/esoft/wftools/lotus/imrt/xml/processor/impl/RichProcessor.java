package ru.esoft.wftools.lotus.imrt.xml.processor.impl;

import com.google.common.collect.Lists;
import org.jetbrains.annotations.Nullable;
import org.jooq.tools.StringUtils;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import ru.esoft.wftools.lotus.imrt.entity.element.ItemType;
import ru.esoft.wftools.lotus.imrt.xml.FirstNodeQualifier;
import ru.esoft.wftools.lotus.imrt.xml.element.Column;
import ru.esoft.wftools.lotus.imrt.xml.processor.XmlNodeProcessor;

import java.util.List;

import static org.jooq.tools.StringUtils.EMPTY;
import static ru.esoft.wftools.lotus.imrt.entity.element.ItemType.ATTACHMENTREF;
import static ru.esoft.wftools.lotus.imrt.entity.element.ItemType.DOCLINK;

public class RichProcessor implements XmlNodeProcessor {

	@Nullable
	@Override
	public Object process(Node node, Column column) {
		final List<String> attachments = Lists.newLinkedList();

		if (column.isDoclink()) {
			observeNode(node, attachments, DOCLINK_HANDLER);
			return attachments.isEmpty() ? null : attachments.iterator().next();
		} else {
			observeNode(node, attachments, ATTACH_HANDLER);
			return attachments.isEmpty() ? null : attachments.toArray(new String[attachments.size()]);
		}
	}

	private void observeNode(@Nullable Node node, List<String> values, RichNodeHandler handler) {
		if (node == null) {
			return;
		}

		handler.handle(node, values);

		final NodeList list = node.getChildNodes();
		final int length = list.getLength();

		for (int i = 0; i < length; i++) {
			observeNode(list.item(i), values, handler);
		}
	}

	private static interface RichNodeHandler {

		void handle(Node node, List<String> values);
	}

	private static final RichNodeHandler DOCLINK_HANDLER = new RichNodeHandler() {

		@Override
		public void handle(Node node, List<String> values) {
			final @Nullable ItemType type = FirstNodeQualifier.getNodeType(node);

			if (!DOCLINK.equals(type)) {
				return;
			}

			final NamedNodeMap attributes = node.getAttributes();
			if (attributes != null) {
				final @Nullable Node name = attributes.getNamedItem("document");

				if (name != null && !StringUtils.isEmpty(name.getTextContent())) {
					values.add(name.getTextContent());
				}
			}
		}
	};

	private static final RichNodeHandler ATTACH_HANDLER = new RichNodeHandler() {

		@Override
		public void handle(Node node, List<String> values) {
			final @Nullable ItemType type = FirstNodeQualifier.getNodeType(node);

			if (!ATTACHMENTREF.equals(type)) {
				return;
			}

			final NamedNodeMap attributes = node.getAttributes();
			if (attributes != null) {
				final @Nullable Node name = attributes.getNamedItem("name");
				final @Nullable Node displayName = attributes.getNamedItem("displayname");

				@Nullable String nameValue = null;
				@Nullable String displayNameValue = null;

				if (name != null) {
					nameValue = name.getTextContent();
				}
				if (displayName != null) {
					displayNameValue = displayName.getTextContent();
				}

				final String value = displayNameValue == null ? (nameValue == null ? EMPTY : nameValue) : displayNameValue;
				if (!values.contains(value)) {
					values.add(value);
				}
			}
		}
	};
}