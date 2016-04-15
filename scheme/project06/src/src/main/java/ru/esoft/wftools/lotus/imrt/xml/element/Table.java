package ru.esoft.wftools.lotus.imrt.xml.element;

import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import org.apache.commons.lang.StringUtils;
import org.jetbrains.annotations.Nullable;
import ru.esoft.wftools.lotus.imrt.xml.predicate.PrimaryKeyPredicate;
import ru.esoft.wftools.lotus.imrt.xml.predicate.TypeIdKeyPredicate;

import java.util.List;
import java.util.NoSuchElementException;

public class Table {

	private String name;
	private String description;
	private String path;
	private String type;
	@Nullable
	private String entity;
	@Nullable
	private String view;
	@Nullable
	private String form;
	@Nullable
	private String comment;
	@Nullable
	private Column primaryKey;
	@Nullable
	private Column typeIdKey;
	private List<Column> columns = Lists.newLinkedList();
	@Nullable
	private String parentTable;

	@Nullable
	public String[] getEntity() {
		return entity != null ? entity.split(";") : null;
	}

	@Nullable
	public Long getFormId() {
		return form != null ? Long.parseLong(form) : null;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Nullable
	public String[] getView() {
		return view != null ? view.split(";") : null;
	}

	@Nullable
	public String getParentTable() {
		return parentTable;
	}

	public Table setParentTable(@Nullable String parentTable) {
		this.parentTable = parentTable;
		return this;
	}

	@Nullable
	public String getComment() {
		return comment;
	}

	public String getName() {
		return name;
	}

	public List<Column> getColumns() {
		return columns;
	}

	public TableType getType() {
		return StringUtils.isEmpty(type) ? TableType.DEFAULT : TableType.valueOf(type.toUpperCase());
	}

	@Nullable
	public Column getPrimaryKey() {
		return primaryKey;
	}

	@Nullable
	public Column getTypeIdKey() {
		return typeIdKey;
	}

	public Table init() {
		primaryKey = findPrimaryColumn();
		typeIdKey = findTypeIdColumn();
		return this;
	}

	public String getPath() {
		return path;
	}

	public Table setName(String name) {
		this.name = name;
		return this;
	}

	public Table setPath(String path) {
		this.path = path;
		return this;
	}

	public void addColumn(Column column) {
		columns.add(column);
	}

	@Nullable
	private Column findPrimaryColumn() {
		try {
			return Iterables.find(columns, PrimaryKeyPredicate.INSTANCE);
		} catch (NoSuchElementException e) {
			return null;
		}
	}

	@Nullable
	private Column findTypeIdColumn() {
		try {
			return Iterables.find(columns, TypeIdKeyPredicate.INSTANCE);
		} catch (NoSuchElementException e) {
			return null;
		}
	}
}