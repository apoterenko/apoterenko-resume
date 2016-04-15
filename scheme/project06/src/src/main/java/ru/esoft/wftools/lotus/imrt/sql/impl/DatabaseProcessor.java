package ru.esoft.wftools.lotus.imrt.sql.impl;

import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.apache.commons.lang.StringUtils;
import org.jetbrains.annotations.Nullable;
import org.jooq.*;
import org.jooq.impl.DSL;
import org.jooq.impl.DefaultDSLContext;
import org.jooq.impl.TableImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.esoft.wftools.lotus.imrt.entity.EntityProcessor;
import ru.esoft.wftools.lotus.imrt.entity.element.Entity;
import ru.esoft.wftools.lotus.imrt.entity.element.Item;
import ru.esoft.wftools.lotus.imrt.file.Transliterate;
import ru.esoft.wftools.lotus.imrt.xml.converter.Converter;
import ru.esoft.wftools.lotus.imrt.xml.converter.impl.*;
import ru.esoft.wftools.lotus.imrt.xml.element.Column;
import ru.esoft.wftools.lotus.imrt.xml.element.Table;

import java.sql.Connection;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import static org.jooq.SQLDialect.POSTGRES;
import static ru.esoft.wftools.lotus.imrt.sql.impl.ColumnType.*;

public class DatabaseProcessor {

	private static final Logger log = LoggerFactory.getLogger(DatabaseProcessor.class);

	private static final SQLDialect DEFAULT_DIALECT = POSTGRES;

	private final Table table;
	private final org.jooq.Table<Record> jooqTable;
	private final DSLContext create;
	private final Collection<Query> queries;
	private final Map<String, Converter> converters;
	private final List<String> rows;
	private final int districtId;
	private final long level;
	private final int folderId;
	private final Map<String, Group> groups;

	public DatabaseProcessor(int districtId, Table table, long level, int folderId) {
		this.districtId = districtId;
		this.folderId = folderId;
		this.level = level;
		this.table = table;
		this.queries = Lists.newLinkedList();
		this.rows = Lists.newArrayListWithExpectedSize(EntityProcessor.BATCH_COUNT);
		this.create = new DefaultDSLContext(DEFAULT_DIALECT);
		this.jooqTable = new TableImpl<Record>(table.getName());
		this.groups = Maps.newHashMap();

		final Converter arrayXmlConverter = new ArrayXmlConverter();
		// type + multi flag
		this.converters = ImmutableMap.<String, Converter>builder()
				.put(BOOLEAN + "false", new BooleanConverter())
				.put(TEXT + "false", new TextConverter())
				.put(ColumnType.INTEGER + "false", new IntegerConverter())
				.put(DATE + "false", new DateConverter())
				.put(TIMESTAMP + "false", new TimestampConverter())
				.put(XML + "false", new DefaultXmlConverter())
				.put(TEXT + "true", arrayXmlConverter)
				.put(ColumnType.INTEGER + "true", arrayXmlConverter)
				.put(TEXT_ARRAY + "true", arrayXmlConverter)
				.put(INTEGER_ARRAY + "true", arrayXmlConverter)
				.put(DATE_ARRAY + "true", arrayXmlConverter)
				.put(TIMESTAMP_ARRAY + "true", arrayXmlConverter)
				.build();
	}

	public void append(Entity entity, String destinationFilePath) {
		final Map<String, Item> entities = entity.getItems();
		final List<Column> columns = table.getColumns();
		final InsertSetStep<Record> insertInto = create.insertInto(jooqTable);

		@Nullable InsertSetMoreStep insertStep = null;

		for (Column column : columns) {
			final @Nullable Item item = entities.get(column.getName());
			final @Nullable String sql = column.getSql();

			final @Nullable String group = column.getGroup();
			@Nullable Group currentGroup = groups.get(group);

			if (group != null) {
				// Это группировка, хранится в зависимой таблице
				if (currentGroup == null) {
					groups.put(group, currentGroup = new Group(column.getGroupName()));
				}
				if (!currentGroup.isCompleted()) {
					currentGroup.addColumn(column.clone());
				}
			}

			final boolean isFilePath = column.getName().equals("file_path");

			if (item == null && sql == null && !isFilePath) {
				continue;
			}

			final @Nullable Converter converter = converters.get(column.getType() + "" + column.isMulti());
			if (converter == null) {
				log.error("No converter for table {}, path {}, column {} and district {}",
						table.getName(), table.getPath(), column.getName(), districtId);
				continue;
			}

			if (group != null) {
				if (isFilePath) {
					currentGroup.addValue(column, FileColumnNameBuilder.toAbsoluteFileName(StringUtils.EMPTY, entity, districtId));
				} else {
					currentGroup.addValue(column, buildValue(entity, column, converter, item, true, destinationFilePath));
				}
			} else {
				insertStep = insertInto.set(
						buildColumnName(column),
						buildValue(entity, column, converter, item, false, destinationFilePath)
				);
			}
		}

		if (insertStep != null) {
			rows.add(entity.getUnid());
			queries.add(insertStep);
		}

		for (Group group : groups.values()) {
			group.buildQueries();

			if (group.isCompleted()) {
				continue;
			}
			SchemaProcessor.CREATE_TABLE_HANDLER.handle(group.setCompleted().getTable().init());
		}
	}

	private Field<Object> buildColumnName(Column column) {
		final String columnName = column.getColumnName() == null ? column.getName() : column.getColumnName();
		return DSL.field(
				column.isOriginalFileName()
						? columnName
						: ColumnNameTransformer.transform(columnName)
		);
	}

	private Object buildValue(Entity entity, Column column, Converter converter, Item item, boolean rawValue, String destinationFilePath) {
		final @Nullable String sql = column.getSql();

		if (sql == null) {
			final @Nullable Object val = converter.from(column, item);
			if (val == null) {
				return null;
			}
			return rawValue ? val : DSL.value(val);
		} else {
			return rawValue ? buildSql(entity, sql, true, destinationFilePath) : DSL.field(buildSql(entity, sql, false, destinationFilePath));
		}
	}

	private String buildSql(Entity entity, String sql, boolean rawValue, String destinationFilePath) {
		return sql
				.replace("{district}", String.valueOf(districtId))
				.replace("{parent}", buildStringValue(entity.getParent(), rawValue))
				.replace("{form}", buildStringValue(entity.getForm(), rawValue))
				.replace("{unid}", buildStringValue(entity.getUnid(), rawValue))
				.replace("{level}", String.valueOf(folderId))
				.replace("{fileLevel}", String.valueOf(level))
				.replace("{path}", buildStringValue(destinationFilePath, rawValue));
	}

	@Nullable
	private String buildStringValue(String value, boolean rawValue) {
		return value == null ? (rawValue ? "" : "null") : (rawValue ? value : ("\'" + value + "\'"));
	}

	public void execute() throws Exception {
		if (queries.isEmpty()) {
			log.warn("Empty batch for table {} path {} and district {}", table.getName(), table.getPath(), districtId);
			return;
		}

		DatabaseConnectionManager.process(new DatabaseConnectionManager.DatabaseConnectionHandler() {

			@Override
			public void handler(Connection connection) {
				final DSLContext context = new DefaultDSLContext(connection, DEFAULT_DIALECT);
				final int[] result = context.batch(queries).execute();

				for (int i = 0; i < result.length; i++) {
					if (result[i] != 1 && i < rows.size()) {
						log.error("Inserting record error with id {}", rows.get(i));
					}
				}

				for (Group group : groups.values()) {
					log.info("Handling batch for internal table {} for outer table {}, district {}, queries {} started...",
							group.getTable().getName(), table.getName(), districtId, group.getQueries().size());
					context.batch(group.getQueries()).execute();
				}
			}
		});
	}

	private final class Group {

		private boolean completed;
		private final Table table;
		private Map<Column, Object> values;

		private final Collection<Query> queries;
		private final org.jooq.Table<Record> jooqTable;

		Group(String group) {
			this.queries = Lists.newLinkedList();
			this.table = new Table().setName(group);
			this.jooqTable = new TableImpl<Record>(group);
			this.values = Maps.newLinkedHashMap();
		}

		Group buildQueries() {
			final int recordCount = getRecordCount();

			for (int i = 0; i < recordCount; i++) {
				final InsertSetStep<Record> insertInto = create.insertInto(jooqTable);
				@Nullable InsertSetMoreStep insertStep = null;

				@Nullable String fileName = null;

				for (Map.Entry<Column, Object> entry : values.entrySet()) {
					final Column column = entry.getKey();

					final boolean isFilePath = column.getName().equals("file_path");
					final boolean isFileName = "file_name".equals(column.getColumnName());

					@Nullable Object value = entry.getValue();

					if (value instanceof Object[]) {
						// Если это массив, извлекаем значение в строке, иначе берем значение первой строки
						final Object[] array = Object[].class.cast(value);
						value = array.length > i ? array[i] : null;
					}

					if (!column.isEmpty()) {
						if (isFilePath) {
							value = value != null ? String.valueOf(value) + Transliterate.translate(fileName) : null;
						}
						if (isFileName) {
							fileName = value != null ? String.valueOf(value) : null;
						}

						insertStep = insertInto.set(
								buildColumnName(column),
								value == null || String.valueOf(value).trim().isEmpty() ? null : (Field<?>) DSL.value(value)
						);
					}
				}
				if (insertStep != null) {
					queries.add(insertStep);
					log.debug(insertStep.getSQL());
				}
			}

			values = Maps.newLinkedHashMap();
			return this;
		}

		Group setCompleted() {
			completed = true;
			return this;
		}

		boolean isCompleted() {
			return completed;
		}

		Table getTable() {
			return table;
		}

		void addColumn(Column column) {
			table.addColumn(column);
		}

		void addValue(Column column, @Nullable Object value) {
			values.put(column, value);
		}

		public Collection<Query> getQueries() {
			return queries;
		}

		private int getRecordCount() {
			int count = 0;
			for (Map.Entry<Column, Object> entry : values.entrySet()) {
				final @Nullable Object value = entry.getValue();
				if (value instanceof Object[]) {
					count = Math.max(count, Object[].class.cast(value).length);
				}
			}
			return count;
		}
	}
}