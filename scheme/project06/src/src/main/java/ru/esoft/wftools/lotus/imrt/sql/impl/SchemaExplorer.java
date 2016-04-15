package ru.esoft.wftools.lotus.imrt.sql.impl;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.esoft.wftools.lotus.imrt.xml.TableProvider;
import ru.esoft.wftools.lotus.imrt.xml.element.Table;

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

public class SchemaExplorer {

	private static final Logger log = LoggerFactory.getLogger(SchemaExplorer.class);

	public static void explore() {
		final Map<String, TableBean> data = Maps.newLinkedHashMap();

		try {
			DatabaseConnectionManager.process(new DatabaseConnectionManager.DatabaseConnectionHandler() {

				@Override
				public void handler(Connection connection) throws SQLException {
					final ResultSet rs = connection.createStatement().executeQuery(SQL);

					while (rs.next()) {
						final String tableName = rs.getString("table_name");
						final String columnName = rs.getString("column_name");
						final String dataType = rs.getString("data_type");
						final String description = rs.getString("description");
						final String columnDefault = rs.getString("column_default");
						final String primaryKey = rs.getString("primary_key");
						final String foreignKey = rs.getString("foreign_key");

						@Nullable TableBean tableBean;

						final @Nullable Table tableObject = TableProvider.getTable(tableName);
						if (tableObject != null) {
							final @Nullable String parentTable = tableObject.getParentTable();
							if (parentTable != null) {
								tableBean = data.get(parentTable);
								if (tableBean == null) {
									data.put(parentTable, tableBean = new TableBean(parentTable));
								}
								tableBean.addRow(tableName, columnName, dataType, description, columnDefault, primaryKey, foreignKey);
								continue;
							}
						}

						tableBean = data.get(tableName);
						if (tableBean == null) {
							data.put(tableName, tableBean = new TableBean(tableName));
						}
						tableBean.addRow(columnName, dataType, description, columnDefault, primaryKey, foreignKey);
					}
				}
			});
		} catch (Exception e) {
			log.error("Exception SchemaExplorer explore", e);
		}

		final StringBuilder sb = new StringBuilder("" +
				"<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\">");

		for (Map.Entry<String, TableBean> entry : data.entrySet()) {
			final TableBean bean = entry.getValue();
			final Map<String, List<List<Object>>> tables = bean.getTables();

			if (tables.isEmpty()) {
				sb.append(getTableContent(bean.getTableName(), getTableBody(bean.getRows()), 32));
			} else {
				final StringBuilder sb0 = new StringBuilder();
				sb0.append(getTableBody(bean.getRows()));
				sb0.append("<tr><td colspan=6 style='padding: 14px;';>");
				for (Map.Entry<String, List<List<Object>>> table : tables.entrySet()) {
					sb0.append(getTableContent(table.getKey(), getTableBody(table.getValue()), 22));
					sb0.append("<div style='height: 14px;'></div>");
				}
				sb0.append("</td></tr>");
				sb.append(getTableContent(bean.getTableName(), sb0.toString(), 32));
			}
			sb.append("<br>");
			sb.append("<br>");
		}

		try {
			final PrintWriter writer = new PrintWriter("schema.html", "UTF-8");
			writer.println(sb);
			writer.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}

	private static String getTableContent(String table, String tableBody, int size) {
		final StringBuilder sb = new StringBuilder();
		sb.append(String.format("<div style='font-size: %dpx; font-weight: bold; color: black;'>", size)).append(table);
		sb.append(":&nbsp;<span style='font-size: 14px; font-weight: bold;'>").append(getTableComment(table)).append("</span>").append("</div>");
		final @Nullable Table tableObject = TableProvider.getTable(table);
		if (tableObject != null) {
			final @Nullable String comment = tableObject.getComment();
			if (comment != null) {
				sb.append("<div style='font-size: 12px; font-weight: bold;'>").append(comment).append("</div>");
			}
		}
		sb.append("<table border=\"1\" style='margin-top: 5px;'>");
		sb.append("<thead>");
		sb.append("<tr style='background-color: black; color: white;'>");
		sb.append("<td>column</td><td>type</td><td>description</td><td>default</td><td>primary</td><td>foreign</td>");
		sb.append("</tr>");
		sb.append("</thead>");
		sb.append("<tbody>");
		sb.append(tableBody);
		sb.append("</tbody>");
		sb.append("</table>");
		return sb.toString();
	}

	private static String getTableBody(List<List<Object>> data) {
		final StringBuilder sb = new StringBuilder();
		for (List<Object> row : data) {
			final String name = (String) row.get(0);
			final String type = (String) row.get(1);
			final String description = (String) row.get(2);

			final boolean primaryKey = description != null && description.contains("первичный ключ");
			final boolean foreignSelfKey = description != null && (name.endsWith("parent_id") || name.endsWith("parent_unid"));
			final boolean dstr = name.endsWith("dstr_id");
			final boolean foreignKey = description != null &&
					(description.contains("внешний ключ") || description.contains("внешний уникальный ключ"))
					&& !foreignSelfKey && !dstr;
			final boolean idKey = (name.endsWith("_id") || name.toLowerCase().endsWith("unid")) && !primaryKey && !foreignKey && !foreignSelfKey && !dstr;
			final boolean emptyIdKey = idKey && row.get(5) == null && !name.toLowerCase().endsWith("unid");
			final boolean linkedUNID = name.startsWith("ld_linked_");

			if (linkedUNID) {
				sb.append("<tr style='background-color: #20cdff; color: white; font-weight: bold;'>");
			} else if (primaryKey) {
				sb.append("<tr style='background-color: #ff7676; color: white; font-weight: bold;'>");
			} else if (foreignSelfKey) {
				sb.append("<tr style='background-color: #ffab08; color: white; font-weight: bold;'>");
			} else if (foreignKey) {
				sb.append("<tr style='background-color: #7f7fff; color: white; font-weight: bold;'>");
			} else if (dstr) {
				sb.append("<tr style='background-color: green; color: white; font-weight: bold;'>");
			} else if (emptyIdKey) {
				sb.append("<tr style='background-color: #ff0000; color: white; font-weight: bold;'>");
			} else if (idKey) {
				sb.append("<tr style='background-color: #b04040; color: white; font-weight: bold;'>");
			} else if ("text[]".equals(type) || "integer[]".equals(type) || "boolean[]".equals(type)) {
				sb.append("<tr style='background-color: #daf0e0;'>");
			} else {
				sb.append("<tr>");
			}
			sb.append("<td>").append(name).append("</td>");
			sb.append("<td>").append(type).append("</td>");
			sb.append("<td>").append(description == null ? "" : row.get(2)).append("</td>");
			sb.append("<td>").append(row.get(3) != null ? (String) row.get(3) : "").append("</td>");
			sb.append("<td>").append(row.get(4) != null ? (String) row.get(4) : "").append("</td>");
			sb.append("<td>").append(row.get(5) != null ? (String) row.get(5) : "").append("</td>");
			sb.append("</tr>");
		}
		return sb.toString();
	}

	private static final class TableBean {

		private final String tableName;
		private final Map<String, List<List<Object>>> tables = Maps.newLinkedHashMap();
		private final List<List<Object>> rows = Lists.newLinkedList();

		private TableBean(String tableName) {
			this.tableName = tableName;
		}

		void addRow(String tableName, String columnName, String dataType, String description, String columnDefault, String primaryKey, String foreignKey) {
			List<List<Object>> rows = tables.get(tableName);
			if (rows == null) {
				tables.put(tableName, rows = Lists.newLinkedList());
			}
			rows.add(Lists.<Object>newArrayList(columnName, dataType, description, columnDefault, primaryKey, foreignKey));
			sort(rows);
		}

		void addRow(String columnName, String dataType, String description, String columnDefault, String primaryKey, String foreignKey) {
			rows.add(Lists.<Object>newArrayList(columnName, dataType, description, columnDefault, primaryKey, foreignKey));
			sort(rows);
		}

		void sort(List<List<Object>> rows) {
			Collections.sort(rows, new Comparator<List<Object>>() {

				@Override
				public int compare(List<Object> o1, List<Object> o2) {
					final boolean idColumn = String.valueOf(o1.get(0)).endsWith("_id");
					final boolean unidColumn = String.valueOf(o1.get(0)).endsWith("_unid");

					final boolean idColumn2 = String.valueOf(o2.get(0)).endsWith("_id");
					final boolean unidColumn2 = String.valueOf(o2.get(0)).endsWith("_unid");

					final boolean primaryColumn = String.valueOf(o1.get(2)).contains("первичный ключ");
					final boolean primaryUnidColumn = String.valueOf(o1.get(2)).contains("предыдущий первичный ключ");

					final boolean primaryColumn2 = String.valueOf(o2.get(2)).contains("первичный ключ");
					final boolean primaryUnidColumn2 = String.valueOf(o2.get(2)).contains("предыдущий первичный ключ");

					final boolean foreignColumn = String.valueOf(o1.get(2)).contains("внешний ключ");
					final boolean foreignUnidColumn = String.valueOf(o1.get(2)).contains("внешний уникальный ключ");

					final boolean foreignColumn2 = String.valueOf(o2.get(2)).contains("внешний ключ");
					final boolean foreignUnidColumn2 = String.valueOf(o2.get(2)).contains("внешний уникальный ключ");

					if (primaryColumn || primaryUnidColumn) {
						return -1;
					}

					if (primaryColumn2 || primaryUnidColumn2) {
						return 1;
					}

					if (foreignColumn || foreignUnidColumn) {
						return -1;
					}

					if (foreignColumn2 || foreignUnidColumn2) {
						return 1;
					}

					if (idColumn || unidColumn) {
						return -1;
					}

					if (idColumn2 || unidColumn2) {
						return 1;
					}

					return String.valueOf(o1.get(0)).compareToIgnoreCase(String.valueOf(o1.get(0)));
				}
			});
		}

		public String getTableName() {
			return tableName;
		}

		public List<List<Object>> getRows() {
			return rows;
		}

		public Map<String, List<List<Object>>> getTables() {
			return tables;
		}
	}

	private static String getTableComment(final String tableName) {
		final StringBuilder sb = new StringBuilder();
		try {
			DatabaseConnectionManager.process(new DatabaseConnectionManager.DatabaseConnectionHandler() {

				@Override
				public void handler(Connection connection) throws SQLException {
					final ResultSet rs = connection.createStatement().executeQuery(String.format(SQL_TABLE, tableName));

					while (rs.next()) {
						sb.append(rs.getString("description"));
					}
				}
			});
		} catch (Exception e) {
			log.error("Exception SchemaExplorer getTableComment", e);
		}
		return sb.toString();
	}

	private static final String SQL = "SELECT \n" +
			"    pg_tables.tablename as table_name, \n" +
			"    pg_attribute.attname AS column_name, \n" +
			"    format_type(pg_attribute.atttypid, NULL) as data_type, \n" +
			"    (SELECT col_description(pg_attribute.attrelid, \n" +
			"            pg_attribute.attnum)) as description, \n" +
			"    CASE pg_attribute.attnotnull \n" +
			"        WHEN false THEN 1  ELSE 0  \n" +
			"    END AS \"notnull\", \n" +
			"    pg_constraint.conname as primary_key, \n" +
			"    pc2.conname as foreign_key,\n" +
			"    (SELECT pg_attrdef.adsrc FROM pg_attrdef \n" +
			"        WHERE pg_attrdef.adrelid = pg_class.oid \n" +
			"        AND pg_attrdef.adnum = pg_attribute.attnum) AS column_default\n" +
			"FROM pg_tables, pg_class \n" +
			"JOIN  pg_catalog.pg_namespace n ON n.oid = pg_class.relnamespace and n.nspname = 'lotusd'\n" +
			"JOIN pg_attribute ON pg_class.oid = pg_attribute.attrelid \n" +
			"    AND pg_attribute.attnum > 0 \n" +
			"LEFT JOIN pg_constraint ON pg_constraint.contype = 'p'::\"char\" \n" +
			"    AND pg_constraint.conrelid = pg_class.oid AND\n" +
			"    (pg_attribute.attnum = ANY (pg_constraint.conkey)) \n" +
			"LEFT JOIN pg_constraint AS pc2 ON pc2.contype = 'f'::\"char\" \n" +
			"    AND pc2.conrelid = pg_class.oid \n" +
			"    AND (pg_attribute.attnum = ANY (pc2.conkey)) \n" +
			"WHERE pg_class.relname = pg_tables.tablename  \n" +
			"    AND pg_attribute.atttypid <> 0::oid  \n" +
			"    AND tablename like 'lotusd%' \n" +
			"order by pg_tables.tablename, column_name";

	private static final String SQL_TABLE =
			"select pd.description from pg_description pd join pg_class pc on pd.objoid = pc.oid where pc.relname = '%s' and objsubid = 0";
}