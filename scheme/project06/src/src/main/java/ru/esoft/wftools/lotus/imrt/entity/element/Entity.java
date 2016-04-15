package ru.esoft.wftools.lotus.imrt.entity.element;

import com.google.common.collect.Maps;
import org.jetbrains.annotations.Nullable;

import java.util.Collections;
import java.util.Map;

public class Entity {

	@Nullable
	private String parent;
	@Nullable
	private String form;
	@Nullable
	private String unid;
	@Nullable
	private String date;
	private int level;
	private int fileLevel;
	private Map<String, Item> items = Maps.newHashMap();

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getFileLevel() {
		return fileLevel;
	}

	public void setFileLevel(int fileLevel) {
		this.fileLevel = fileLevel;
	}

	@Nullable
	public String getDate() {
		return date;
	}

	@Nullable
	public String getParent() {
		return parent;
	}

	public Entity setParent(@Nullable String parent) {
		this.parent = parent;
		return this;
	}

	public void setDate(@Nullable String date) {
		this.date = date;
	}

	@Nullable
	public String getForm() {
		return form;
	}

	public Entity setForm(@Nullable String form) {
		this.form = form;
		return this;
	}

	@Nullable
	public String getUnid() {
		return unid;
	}

	public void setUnid(@Nullable String unid) {
		this.unid = unid;
	}

	public void addItem(Item item) {
		items.put(item.getName(), item);
	}

	public Map<String, Item> getItems() {
		return Collections.unmodifiableMap(items);
	}
}