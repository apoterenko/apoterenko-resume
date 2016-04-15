package ru.esoft.wftools.lotus.imrt;

import org.apache.commons.lang.mutable.MutableInt;
import org.apache.commons.lang3.mutable.MutableLong;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.esoft.wftools.lotus.imrt.entity.EntityProcessor;
import ru.esoft.wftools.lotus.imrt.entity.element.Entity;
import ru.esoft.wftools.lotus.imrt.file.FileTransferManager;
import ru.esoft.wftools.lotus.imrt.file.FilesProcessor;
import ru.esoft.wftools.lotus.imrt.sql.impl.DatabaseConnectionManager;
import ru.esoft.wftools.lotus.imrt.sql.impl.DatabaseProcessor;
import ru.esoft.wftools.lotus.imrt.xml.TableProvider;
import ru.esoft.wftools.lotus.imrt.xml.TablesExplorer;
import ru.esoft.wftools.lotus.imrt.xml.element.Table;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

import static ru.esoft.wftools.lotus.imrt.file.FileSupport.*;
import static ru.esoft.wftools.lotus.imrt.file.FileTransferManager.FILE_SEPARATOR;

class Importer {

	private static final Logger log = LoggerFactory.getLogger(Importer.class);

	static void importByPath(final String sourcePath, final String districtName, final MutableLong levelCounter) {
		final int districtId = insertDistrict(districtName);
		if (districtId < 1) {
			log.error("Error initializing the region " + districtName);
			return;
		}

		TablesExplorer.explore(new TablesExplorer.TablesExplorerHandler() {

			@Override
			public void handle(Table table) {
				Importer.importByPath(sourcePath, districtId, table, levelCounter);
			}
		});
	}

	private static int insertDistrict(final String districtName) {
		try {
			final MutableInt districtId = new MutableInt(0);

			DatabaseConnectionManager.process(new DatabaseConnectionManager.DatabaseConnectionHandler() {

				@Override
				public void handler(Connection connection) throws SQLException {
					final Table table = TableProvider.getDistrictTable();
					final long did = districtId(connection, table);

					if (did == -1) {
						connection.createStatement().executeUpdate(
								String.format("insert into %s (\"ld_dstr_name\") values ('%s')", table.getName(), districtName)
						);
						districtId.setValue(districtId(connection, table));
					} else {
						districtId.setValue(did);
					}
				}

				private long districtId(Connection connection, Table table) throws SQLException {
					final ResultSet rs = connection.createStatement().executeQuery(String.format(
							"select ld_dstr_id, ld_dstr_name from %s where ld_dstr_name = ('%s')", table.getName(), districtName
					));
					if (rs.next()) {
						return rs.getInt("ld_dstr_id");
					}
					return -1;
				}
			});

			return districtId.intValue();
		} catch (Exception e) {
			log.error("Exception insertDistrict by district " + districtName, e);
			return -1;
		}
	}

	private static int insertFolder(final String folder) {
		try {
			final MutableInt districtId = new MutableInt(0);

			DatabaseConnectionManager.process(new DatabaseConnectionManager.DatabaseConnectionHandler() {

				@Override
				public void handler(Connection connection) throws SQLException {
					final Table table = TableProvider.getLevelTable();
					final long did = levelId(connection, table);

					if (did == -1) {
						connection.createStatement().executeUpdate(
								String.format("insert into %s (\"ld_level_name\") values ('%s')", table.getName(), folder)
						);
						districtId.setValue(levelId(connection, table));
					} else {
						districtId.setValue(did);
					}
				}

				private long levelId(Connection connection, Table table) throws SQLException {
					final ResultSet rs = connection.createStatement().executeQuery(String.format(
							"select ld_level_id, ld_level_name from %s where ld_level_name = ('%s')", table.getName(), folder
					));
					if (rs.next()) {
						return rs.getInt("ld_level_id");
					}
					return -1;
				}
			});

			return districtId.intValue();
		} catch (Exception e) {
			log.error("Exception insertFolder by level " + folder, e);
			return -1;
		}
	}

	private static void importByPath(String sourcePath, int districtId, Table table, MutableLong levelCounter) {
		try {
			importPath(sourcePath, districtId, table, levelCounter);
		} catch (Exception e) {
			log.error("Error importing a directory {} for the source {} and district {}", table.getPath(), sourcePath, districtId);
			log.error("Importer importByPath exception", e);
		}
	}

	private static void importPath(String sourcePath, final int districtId, final Table table, final MutableLong levelCounter) throws IOException {

		final String folder = table.getPath();
		final String targetPath = sourcePath + "_out";
		final String sourceFolder = sourcePath + FILE_SEPARATOR + folder;

		if (!makeDirectory(targetPath)) {
			return;
		}

		final int folderId = insertFolder(sourceFolder.replace("\\", "/"));
		final FileTransferManager fileSuccessTransferManager = new FileTransferManager(targetPath, folder);

		log.info("Starting processing directory {}", sourceFolder);

		final long begin = System.currentTimeMillis();

		final MutableInt counterOnSuccessMoving = new MutableInt(0);
		final MutableInt counterOnFailureMoving = new MutableInt(0);
		final MutableInt counterOnExceptionMoving = new MutableInt(0);

		EntityProcessor.process(
				sourceFolder,
				new EntityProcessor.EntityProcessorHandler() {

					@Override
					public void handle(Map<Entity, File[]> entities) {
						final int fileLevel = Math.max(1, (int) Math.round(Math.ceil(levelCounter.longValue() * 0.001)));
						final DatabaseProcessor databaseProcessor = new DatabaseProcessor(districtId, table, fileLevel, folderId);

						for (Map.Entry<Entity, File[]> entry : entities.entrySet()) {
							final File file = entry.getValue()[0];
							entry.getKey().setLevel(fileLevel);
							entry.getKey().setFileLevel(fileLevel);
							databaseProcessor.append(entry.getKey(), fileSuccessTransferManager.buildDestinationFileName(file));
						}

						if (!execute(databaseProcessor, entities)) {
							return;
						}

						for (Map.Entry<Entity, File[]> entry : entities.entrySet()) {
							final File file = entry.getValue()[0];
							final @Nullable File attachment = entry.getValue()[1];

							try {
								fileSuccessTransferManager.move(file, attachment, entry.getKey(), districtId);
								counterOnSuccessMoving.increment();
							} catch (Exception e) {
								log.error("Error (success handler) moving file: " + file + ", or attachment: " + attachment, e);
								counterOnFailureMoving.increment();
							}
						}

						levelCounter.add(entities.size());
					}

					private boolean execute(DatabaseProcessor databaseProcessor, Map<Entity, File[]> entities) {
						try {
							databaseProcessor.execute();
							return true;
						} catch (Exception e) {
							log.error("Error (success handler) execute batch", e);

							for (Map.Entry<Entity, File[]> entry : entities.entrySet()) {
								log.error("Batch exception, unid: {}", entry.getKey().getUnid());
							}
						}
						return false;
					}
				},
				new FilesProcessor.FilesProcessorHandler() {

					@Override
					public void handle(File file, @Nullable File attachment) {
						log.error("File [PATH_FAILURE:{{}}] processed failed", file);
						counterOnExceptionMoving.increment();
					}
				}
		);

		log.info("Directory {} processed for {}. Successfully processed good files {}, bad files {}. " +
				"Unsuccessfully processed good files {}.",
				sourceFolder, (System.currentTimeMillis() - begin) * 0.001,
				counterOnSuccessMoving.intValue(),
				counterOnExceptionMoving.intValue(),
				counterOnFailureMoving.intValue());
		log.info("Starting automatic cleaning directory {}", sourceFolder);

		cleanDirectory(sourceFolder);
	}
}