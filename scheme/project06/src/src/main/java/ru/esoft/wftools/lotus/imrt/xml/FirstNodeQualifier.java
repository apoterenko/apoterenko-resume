package ru.esoft.wftools.lotus.imrt.xml;

import org.jetbrains.annotations.Nullable;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import ru.esoft.wftools.lotus.imrt.entity.element.ItemType;

public class FirstNodeQualifier {

	@Nullable
	public static Node getFirstNode(Node node) {
		@Nullable Node firstNode = node.getFirstChild();
		@Nullable ItemType type = ItemTypeQualifier.getItemType(firstNode);

		if (type != null) {
			return firstNode;
		}

		// Что-то пошло не так. Не можем определить тип ноды. Возможно спецсимволы мешают
		// Автозамена долгая, поэтому ее не делаем для всего документа
		final NodeList children = node.getChildNodes();
		final int childrenLength = children.getLength();

		// Идем со второго, т.к. 1й нас не устроил
		for (int j = 1; j < childrenLength; j++) {
			type = ItemTypeQualifier.getItemType(firstNode = children.item(j));
			if (type != null) {
				return firstNode;
			}
		}
		return null;
	}

	@Nullable
	public static ItemType getNodeType(Node node) {
		return ItemTypeQualifier.getItemType(node);
	}

	private final static class ItemTypeQualifier {

		@Nullable
		static ItemType getItemType(@Nullable Node node) {
			try {
				return node != null ? ItemType.valueOf(node.getNodeName().toUpperCase()) : null;
			} catch (Exception ignored) {
			}
			return null;
		}
	}
}