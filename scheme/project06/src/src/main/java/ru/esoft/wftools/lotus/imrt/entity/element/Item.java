package ru.esoft.wftools.lotus.imrt.entity.element;

import org.jetbrains.annotations.Nullable;
import org.w3c.dom.Node;

public class Item {

	private Node node;
	private String name;
	@Nullable
	private String text;
	private ItemType type;

	public Node getNode() {
		return node;
	}

	public Item setNode(Node node) {
		this.node = node;
		return this;
	}

	public String getName() {
		return name;
	}

	public Item setName(String name) {
		this.name = name;
		return this;
	}

	@Nullable
	public String getText() {
		return text;
	}

	public Item setText(@Nullable String text) {
		this.text = text;
		return this;
	}

	public ItemType getType() {
		return type;
	}

	public Item setType(ItemType type) {
		this.type = type;
		return this;
	}
}