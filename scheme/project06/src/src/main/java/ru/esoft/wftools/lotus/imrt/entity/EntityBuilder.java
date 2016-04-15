package ru.esoft.wftools.lotus.imrt.entity;

import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;
import ru.esoft.wftools.lotus.imrt.entity.element.Entity;
import ru.esoft.wftools.lotus.imrt.entity.element.Item;
import ru.esoft.wftools.lotus.imrt.entity.element.ItemType;
import ru.esoft.wftools.lotus.imrt.sql.impl.ColumnNameTransformer;
import ru.esoft.wftools.lotus.imrt.xml.DocumentBuilderFactory;
import ru.esoft.wftools.lotus.imrt.xml.FirstNodeQualifier;
import ru.esoft.wftools.lotus.imrt.xml.converter.impl.TimeConverter;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.*;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class EntityBuilder {

	private static final Logger log = LoggerFactory.getLogger(EntityBuilder.class);

	public static Entity toEntity(File file)
			throws TransformerException, ParserConfigurationException, IOException, SAXException {

		final Document document = DocumentBuilderFactory.getInstance().parse(file);

		final Node root = document.getChildNodes().item(1);
		final NodeList rootItems = root.getChildNodes();
		final int rootItemsLength = rootItems.getLength();
		final NamedNodeMap rootAttributes = root.getAttributes();

		final Entity entity = new Entity();
		applyParent(entity, rootAttributes);
		applyForm(entity, rootAttributes);

		final Date date = new Date();
		final SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");

		for (int i = 0; i < rootItemsLength; i++) {
			final Node node = rootItems.item(i);
			final @Nullable NamedNodeMap itemAttributes = node.getAttributes();

			if (itemAttributes == null) {
				continue;
			}

			if ("noteinfo".equals(node.getNodeName())) {

				final @Nullable Node created = FirstNodeQualifier.getFirstNode(node);
				if (created != null) {
					final @Nullable Long createdTime = TimeConverter.parse(created.getTextContent());
					if (createdTime != null) {
						date.setTime(createdTime);
						entity.setDate(df.format(date));
					} else {
						entity.setDate(DEFAULT_DATE);
					}
				}

				final @Nullable Node unid = itemAttributes.getNamedItem("unid");
				if (unid != null && unid.getTextContent() != null) {
					entity.setUnid(String.valueOf(unid.getTextContent()));
				}
				continue;
			}

			final @Nullable Node name = itemAttributes.getNamedItem("name");
			if (name == null) {
				continue;
			}

			final @Nullable Node firstChild = FirstNodeQualifier.getFirstNode(node);
			if (firstChild == null) {
				log.error("First sheet does not exist, file {} and node name {}", file, name);
				continue;
			}

			final @Nullable ItemType type = FirstNodeQualifier.getNodeType(firstChild);
			if (type == null) {
				log.error("Can't determine the type of the node, file {} and node name {}", file, name);
				continue;
			}

			entity.addItem(
					new Item()
							.setName(name.getNodeValue())
							.setText(node.getTextContent())
							.setNode(firstChild)
							.setType(type)
			);
		}
		return entity;
	}

	private static void applyParent(Entity entity, NamedNodeMap rootAttributes) {
		final Node parentAttribute = rootAttributes.getNamedItem("parent");

		if (parentAttribute != null) {
			entity.setParent(parentAttribute.getTextContent());
		}
	}

	private static void applyForm(Entity entity, NamedNodeMap rootAttributes) {
		final Node parentAttribute = rootAttributes.getNamedItem("form");

		if (parentAttribute != null) {
			entity.setForm(ColumnNameTransformer.transform(parentAttribute.getTextContent()));
		}
	}

	private static final String DEFAULT_DATE = "01.01.1980";
}