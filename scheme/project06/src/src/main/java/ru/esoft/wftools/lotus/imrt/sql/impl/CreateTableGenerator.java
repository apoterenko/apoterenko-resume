package ru.esoft.wftools.lotus.imrt.sql.impl;

import com.google.common.base.Predicates;
import com.google.common.collect.Collections2;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.jetbrains.annotations.Nullable;
import ru.esoft.wftools.lotus.imrt.xml.TableProvider;
import ru.esoft.wftools.lotus.imrt.xml.XmlCleaner;
import ru.esoft.wftools.lotus.imrt.xml.element.Column;
import ru.esoft.wftools.lotus.imrt.xml.element.Table;
import ru.esoft.wftools.lotus.imrt.xml.predicate.GroupPredicate;
import ru.esoft.wftools.lotus.imrt.xml.predicate.MasterTypePredicate;
import ru.esoft.wftools.lotus.imrt.xml.predicate.PrimaryKeyPredicate;

import java.util.List;
import java.util.NoSuchElementException;

public class CreateTableGenerator {

	private static final String CREATE_TABLE_TEMPLATE = "CREATE TABLE {table_name}\n" +
			"   (\n" +
			"   {columns} \n" +
			"   )\n" +
			"WITH (\n" +
			"   OIDS=FALSE\n" +
			");\n" +
			"ALTER TABLE {table_name}\n" +
			"       OWNER TO postgres;\n" +
			"{comments}";

	public static String toSql(Table table) {
		final String[] sql = makeColumns(table);
		return CREATE_TABLE_TEMPLATE
				.replace("{table_name}", table.getName())
				.replace("{columns}", sql[0])
				.replace("{comments}", sql[1]);
	}

	private static String[] makeColumns(Table table) {
		final StringBuilder sb = new StringBuilder();
		final List<Column> columns = Lists.newArrayList(
				Collections2.filter(
						table.getColumns(),
						Predicates.not(GroupPredicate.INSTANCE)
				)
		);

		final int size = columns.size();
		@Nullable Column primaryColumn = null;

		final StringBuilder comments = new StringBuilder();

		int i = 0;
		for (Column column : columns) {
			final String originalColumnName = column.getName();
			final String columnName = getColumnName(column);

			if (primaryColumn == null) {
				primaryColumn = PrimaryKeyPredicate.INSTANCE.apply(column) ? column : primaryColumn;
			}

			sb.append("   ").append(columnName).append(" ").append(
					column.getNativeColumnType() != null ? column.getNativeColumnType() : column.getColumnType().getValue()
			);

			if (column.isPrimary()) {
				sb.append(String.format(" DEFAULT NEXTVAL('%s') ", SequenceNameGenerator.generate(table, column)));
			}

			if (column.isNotNull()) {
				sb.append(" NOT NULL");
			}

			processRelations(column, sb);

			if (i < size - 1) {
				sb.append(",");
			}
			sb.append("            --").append("{").append(originalColumnName).append("}");

			if (i < size - 1) {
				sb.append("\n");
			}
			i++;

			final @Nullable String comment = column.getComment();
			final @Nullable String description = column.getDescription();
			if (comment != null || description != null) {
				comments.append(String.format("\nCOMMENT ON COLUMN %s.%s IS '%s';",
						table.getName(), columnName, StringEscapeUtils.escapeSql(XmlCleaner.clean(description != null ? description : comment))));
			}
		}

		if (primaryColumn != null) {
			final String primaryColumnName = getColumnName(primaryColumn);

			sb.append("\n, ")
					.append(makePrimaryConstraint(primaryColumnName, new String[]{primaryColumnName}));
		}

		final @Nullable Table table0 = TableProvider.getTable(table.getName());
		final @Nullable String tablePath = table0 != null ? (table0.getPath() != null ? table0.getPath() : table.getPath()) : table.getPath();
		if (tablePath != null) {
			comments.append(String.format("\nCOMMENT ON TABLE %s IS '%s';", table.getName(), tablePath));
		}
		return new String[]{sb.toString(), comments.toString()};
	}

	public static String getAlias(Column column) {
		final String columnName = getColumnName(column);
		final StringBuilder sb = new StringBuilder();

		boolean up = false;
		for (char c : columnName.toCharArray()) {
			if (c == '_') {
				up = true;
			} else {
				sb.append(up ? String.valueOf(c).toUpperCase() : c);
				up = false;
			}
		}
		return sb.toString();
	}

	public static String getColumnName(Column column) {
		final String columnName = column.getColumnName() == null ? column.getName() : column.getColumnName();

		return column.isOriginalFileName()
				? columnName
				: ColumnNameTransformer.transform(columnName);
	}

	private static String makePrimaryConstraint(String name, String[] keys) {
		return makeConstraint(name, keys, "_pkey", "primary key");
	}

	private static String makeConstraint(String name, String[] keys, String appendToKeyName, String constraintName) {
		final StringBuilder sb = new StringBuilder();

		return sb.append("constraint ")
				.append(name)
				.append(appendToKeyName)
				.append(" ")
				.append(constraintName)
				.append(" (")
				.append(StringUtils.join(keys, ","))
				.append(")")
				.toString();
	}

	private static void processRelations(Column column, StringBuilder sb) {
		final List<Table> relations = column.getRelations();
		if (relations.isEmpty()) {
			return;
		}

		@Nullable Table masterTable = findTable(relations);
		if (masterTable == null) {
			return;
		}

		masterTable = TableProvider.getTable(masterTable.getName());

		@Nullable final Column primaryColumn = masterTable.getPrimaryKey();
		if (primaryColumn == null) {
			return;
		}

		sb.append(" ")
				.append("references ")
				.append(masterTable.getName())
				.append(" ")
				.append("(")
				.append(primaryColumn.getName())
				.append(")");

	}

	@Nullable
	private static Table findTable(List<Table> relations) {
		try {
			return Iterables.find(relations, MasterTypePredicate.INSTANCE);
		} catch (NoSuchElementException e) {
			return null;
		}
	}
}