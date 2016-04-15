package ru.esoft.wftools.lotus.imrt.sql.impl;

import org.apache.commons.lang.mutable.MutableBoolean;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.esoft.wftools.lotus.imrt.xml.TableProvider;
import ru.esoft.wftools.lotus.imrt.xml.TablesExplorer;
import ru.esoft.wftools.lotus.imrt.xml.element.Column;
import ru.esoft.wftools.lotus.imrt.xml.element.Table;

import java.sql.Connection;
import java.sql.SQLException;

public class SchemaProcessor {

	private static final Logger log = LoggerFactory.getLogger(SchemaProcessor.class);

	public static void process() {
		process(false);
	}

	public static void process(boolean deleteBefore) {
		if (deleteBefore) {
			for (Table dependencyTable : TableProvider.getDependencyTables()) {
				DROP_TABLE_HANDLER.handle(dependencyTable);
			}
			DROP_TABLE_HANDLER.handle(TableProvider.getDistrictTable());
			DROP_TABLE_HANDLER.handle(TableProvider.getLevelTable());

			TablesExplorer.explore(DROP_TABLE_HANDLER, false);
		}

		final Table districtTable = TableProvider.getDistrictTable();
		CREATE_TABLE_HANDLER.handle(districtTable);
		execute(
				String.format(
						"ALTER TABLE %s ADD CONSTRAINT %s_unique_key UNIQUE (\"ld_dstr_name\")",
						districtTable.getName(),
						districtTable.getName()
				),
				districtTable.getName(),
				true,
				true
		);
		final Table levelTable = TableProvider.getLevelTable();
		CREATE_TABLE_HANDLER.handle(levelTable);
		execute(
				String.format(
						"ALTER TABLE %s ADD CONSTRAINT %s_unique_key UNIQUE (\"ld_level_name\")",
						levelTable.getName(),
						levelTable.getName()
				),
				levelTable.getName(),
				true,
				true
		);
		TablesExplorer.explore(CREATE_TABLE_HANDLER);
	}

	private static boolean execute(final String sql, final String name, final boolean create) {
		return execute(sql, name, create, false);
	}

	private static boolean execute(final String sql, final String name, final boolean create, final boolean forceAll) {
		final MutableBoolean result = new MutableBoolean(false);

		try {
			DatabaseConnectionManager.process(new DatabaseConnectionManager.DatabaseConnectionHandler() {

				@Override
				public void handler(Connection connection) throws SQLException {
					if (!forceAll) {
						if (create) {
							if (ObjectExistChecker.check(connection, name)) {
								return;
							}
						} else {
							if (!ObjectExistChecker.check(connection, name)) {
								return;
							}
						}
					}

					connection.createStatement().executeUpdate(sql);
					result.setValue(true);
				}
			});

			return result.booleanValue();
		} catch (Exception e) {
			log.error("Exception SchemaProcessor execute", e);
		}
		return false;
	}

	public static final TablesExplorer.TablesExplorerHandler DROP_TABLE_HANDLER =
			new TablesExplorer.TablesExplorerHandler() {

				@Override
				public void handle(Table table) {
					final String tableName = table.getName();

					if (execute(DropTableGenerator.toSql(table), table.getName(), false)) {
						log.info("Drop table {} successfully", tableName);
					}

					if (execute(DropSequenceGenerator.INSTANCE.toSql(table), getSequenceName(table), false)) {
						log.info("Drop sequence for {} successfully", tableName);
					}
				}
			};

	public static final TablesExplorer.TablesExplorerHandler CREATE_TABLE_HANDLER =
			new TablesExplorer.TablesExplorerHandler() {

				@Override
				public void handle(Table table) {
					final String tableName = table.getName();

					if (table.getPrimaryKey() != null) {
						if (execute(CreateSequenceGenerator.INSTANCE.toSql(table), getSequenceName(table), true)) {
							log.info("Make sequence for {} successfully", tableName);
						}
					}

					final String tableSql = CreateTableGenerator.toSql(table);
					log.debug(tableSql);

					if (execute(tableSql, table.getName(), true)) {
						log.info("Make table {} successfully", tableName);
					}
				}
			};

	@Nullable
	private static String getSequenceName(Table table) {
		final @Nullable Column primaryKey = table.getPrimaryKey();
		return primaryKey != null
				? SequenceNameGenerator.generate(table, primaryKey)
				: null;
	}
}