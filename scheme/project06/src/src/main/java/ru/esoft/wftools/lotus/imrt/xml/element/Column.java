package ru.esoft.wftools.lotus.imrt.xml.element;

import com.google.common.base.Objects;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.esoft.wftools.lotus.imrt.sql.impl.ColumnType;

import java.util.Collections;
import java.util.List;

public class Column implements Cloneable {

	private static final Logger log = LoggerFactory.getLogger(Column.class);

	private String name;
	private String type;
	@Nullable
	private String columnType;
	@Nullable
	private String nativeColumnType;
	private String description;
	@Nullable
	private String group;
	@Nullable
	private String groupName;
	@Nullable
	private String sql;
	private boolean doclink;
	@Nullable
	private String pattern;
	@Nullable
	private Integer patternGroupIndex;
	@Nullable
	private String comment;
	@Nullable
	private String separator;
	@Nullable
	private String columnName;
	private boolean quickSearch;
	@Nullable
	private String shortName;
	private String example;
	private boolean notNull;
	private boolean primary;
	private boolean typeId;
	private boolean empty;
	private boolean multi;
	private boolean groupSeparate;
	private boolean originalFileName;
	private boolean excludeFromView;
	private boolean visibility;
	@Nullable
	private Integer groupSeparateIndex;
	private List<Table> relations;

	public boolean isQuickSearch() {
		return quickSearch;
	}

	public boolean isVisibility() {
		return visibility;
	}

	@Nullable
	public String getShortName() {
		return shortName != null ? shortName : (this.getDescription() == null ? this.getComment() : this.getDescription());
	}

	public boolean isOriginalFileName() {
		return originalFileName;
	}

	public boolean isExcludeFromView() {
		return excludeFromView;
	}

	@Nullable
	public String getNativeColumnType() {
		return nativeColumnType;
	}

	@Nullable
	public Integer getPatternGroupIndex() {
		return patternGroupIndex;
	}

	public boolean isDoclink() {
		return doclink;
	}

	public String getDescription() {
		return description;
	}

	public boolean isTypeId() {
		return typeId;
	}

	@Nullable
	public String getComment() {
		return comment;
	}

	@Nullable
	public Integer getGroupSeparateIndex() {
		return groupSeparateIndex;
	}

	public boolean isGroupSeparate() {
		return groupSeparate;
	}

	@Nullable
	public String getColumnName() {
		return columnName;
	}

	public boolean isEmpty() {
		return empty;
	}

	public boolean byGroup() {
		return group != null;
	}

	@Nullable
	public String getGroup() {
		return group;
	}

	@Nullable
	public String getGroupName() {
		return groupName != null ? groupName : group;
	}

	public ColumnType getColumnType() {
		return ColumnType.INSTANCE.get(columnType != null ? columnType : type);
	}

	@Nullable
	public String getSeparator() {
		return separator;
	}

	public boolean isMulti() {
		return multi;
	}

	public Column setName(String name) {
		this.name = name;
		return this;
	}

	public Column setType(String type) {
		this.type = type;
		return this;
	}

	public Column setNotNull(boolean notNull) {
		this.notNull = notNull;
		return this;
	}

	public Column setPrimary(boolean primary) {
		this.primary = primary;
		return this;
	}

	@Nullable
	public String getSql() {
		return sql;
	}

	public String getName() {
		return name;
	}

	public String getSequenceName() {
		return name + "_seq";
	}

	public boolean isNotNull() {
		return notNull;
	}

	public List<Table> getRelations() {
		return relations == null
				? Collections.<Table>emptyList()
				: Collections.unmodifiableList(relations);
	}

	public ColumnType getType() {
		return ColumnType.INSTANCE.get(type);
	}

	public boolean isPrimary() {
		return primary;
	}

	public void setGroup(@Nullable String group) {
		this.group = group;
	}

	@Nullable
	public String getPattern() {
		return pattern;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		final Column column = (Column) o;
		return Objects.equal(name, column.getName());
	}

	@Override
	public int hashCode() {
		return Objects.hashCode(name);
	}

	@Override
	public Column clone() {
		try {
			final Column column = (Column) super.clone();
			column.setGroup(null);
			return column;
		} catch (CloneNotSupportedException e) {
			log.error("Column clone exception", e);
			throw new IllegalStateException(e);
		}
	}
}