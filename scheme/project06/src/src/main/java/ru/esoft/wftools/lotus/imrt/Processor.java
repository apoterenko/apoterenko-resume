package ru.esoft.wftools.lotus.imrt;

import com.google.common.collect.Sets;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang3.mutable.MutableLong;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.esoft.tools.FileHelper;
import ru.esoft.wftools.lotus.imrt.sql.impl.DatabaseConnectionManager;
import ru.esoft.wftools.lotus.imrt.sql.impl.FileColumnNameBuilder;
import ru.esoft.wftools.lotus.imrt.sql.impl.SchemaExplorer;
import ru.esoft.wftools.lotus.imrt.sql.impl.SchemaProcessor;
import ru.esoft.wftools.lotus.imrt.xml.TablesExplorer;
import ru.esoft.wftools.lotus.imrt.xml.element.Table;

import java.io.File;
import java.io.IOException;
import java.lang.String;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.*;
import java.util.concurrent.*;

/**
 * Example input arguments:
 * "c:/data/db" "c:/data/files" "jdbc:postgresql://192.168.118.181:5432/test2?user=test"
 * "c:/data/db" "c:/data/files" "jdbc:postgresql://192.168.168.218:5432/workflow?user=test&password=test"
 * <p/>
 * "c:/data/db" "c:/data/NEW_DB_WORKFLOW_FILES" "jdbc:postgresql://192.161.168.148:5432/workflow?user=test&password=test" "calculate"
 * "c:/LOTUS_TEST_DATA/DATA" "c:/LOTUS_TEST_DATA/FILES" "jdbc:postgresql://10.0.0.190:5432/test?password=test&user=test" "calculate"
 */
public class Processor {

	private static final Logger log = LoggerFactory.getLogger(Processor.class);

	public static void main(String[] args) {
		final @Nullable String in = args.length >= 1 ? args[0] : null;
		final @Nullable String filesOut = args.length >= 2 ? args[1] : null;
		final @Nullable String connectionString = args.length >= 3 ? args[2] : null;
		final @Nullable String option = args.length >= 4 ? args[3] : "";

		if (StringUtils.isEmpty(in)) {
			log.error("Input directory is empty...");
			return;
		}

		if (StringUtils.isEmpty(filesOut)) {
			log.error("Output file's directory is empty...");
			return;
		}

		if (StringUtils.isEmpty(connectionString)) {
			log.error("Connection string is empty...");
			return;
		}

		System.out.println("Input directory is: " + in);
		System.out.println("Output file's directory is: " + filesOut);
		System.out.println("Connection string is: " + connectionString);

		DatabaseConnectionManager.setConnectionString(connectionString);
		FileColumnNameBuilder.setAbsolutePath(filesOut);

		switch (option) {
			case "calculate":
				final File fileDirectory = new File(filesOut);
				processLotusFiles(fileDirectory);
				dbProcessFiles();
				break;
			default:
				final File mainDirectory = new File(in);
				final @Nullable File[] districts = mainDirectory.listFiles();

				if (districts == null || districts.length == 0) {
					log.warn("Directory {} is empty...", in);
					return;
				}

				System.out.println("Starting processing directory " + in);
				SchemaProcessor.process();
				System.out.println("Scheme created successfully!");


				final Set<String[]> paths = Sets.newHashSet();

				TablesExplorer.explore(new TablesExplorer.TablesExplorerHandler() {

					@Override
					public void handle(Table table) {
						paths.add(table.getPath().split("/"));
					}
				});

				final MutableLong levelCounter = new MutableLong(0);

				for (File districtFile : districts) {
					if (!districtFile.isDirectory()) {
						continue;
					}
					System.out.println("===============REGION " + districtFile + "=====================");

					log.info("Checking directory {}...", districtFile);

					processDirectories(districtFile, districtFile.getName(), paths, levelCounter);
				}

				SchemaExplorer.explore();
				break;
		}
	}

	private static class Worker implements Runnable {

		private final String filePath;
		private final HashBean bean;

		public Worker(String filePath, HashBean bean) {
			this.filePath = filePath;
			this.bean = bean;
		}

		@Override
		public void run() {
			try {
				final File file = new File(filePath);
				bean.setSize(file.length());
				bean.setHash(FileHelper.md5(file));
			} catch (IOException e) {
				log.error("IOException", e);
			}
			latch.countDown();
		}
	}

	private static final int MAX_SIZE = 20;
	private static final MutableLong counter = new MutableLong(0);
	private static final Map<String, HashBean> queue = new HashMap<String, HashBean>(MAX_SIZE);
	private static CountDownLatch latch = new CountDownLatch(MAX_SIZE);

	private static void processQueueOfFiles() {
		for (Map.Entry<String, HashBean> entry : queue.entrySet()) {
			new Thread(new Worker(entry.getKey(), entry.getValue())).start();
		}
		try {
			latch.await();
		} catch (InterruptedException e) {
			log.error("InterruptedException", e);
		}

		dbProcessFiles();

		latch = new CountDownLatch(MAX_SIZE);
		queue.clear();
	}

	private static void dbProcessFiles() {
		try {
			DatabaseConnectionManager.process(new DatabaseConnectionManager.DatabaseConnectionHandler() {

				@Override
				public void handler(Connection connection) throws SQLException {
					final PreparedStatement ps = connection.prepareStatement("update lotusd_files set hash = ?, size = ? where file_path = ?");

					for (Map.Entry<String, HashBean> entry : queue.entrySet()) {
						ps.setString(1, entry.getValue().getHash());
						ps.setLong(2, entry.getValue().getSize());
						ps.setString(3, entry.getKey().replace("\\", "/"));
						ps.addBatch();
					}
					ps.executeBatch();
				}
			});
		} catch (Exception e) {
			log.error("processQueueOfFiles exception", e);
		}
	}

	private static final class HashBean {

		private String hash;
		private long size;

		public String getHash() {
			return hash;
		}

		public void setHash(String hash) {
			this.hash = hash;
		}

		public long getSize() {
			return size;
		}

		public void setSize(long size) {
			this.size = size;
		}
	}

	private static void processLotusFiles(File file) {
		if (file == null) {
			return;
		}

		if (file.isDirectory()) {
			final @Nullable File[] folders = file.listFiles();
			if (folders == null || folders.length == 0) {
				return;
			}

			for (File folder : folders) {
				processLotusFiles(folder);
			}
		} else {
			if (queue.size() == MAX_SIZE) {
				final long before = System.currentTimeMillis();
				processQueueOfFiles();
				System.out.println("Files processed: " + counter + ", speed: " +
						Math.round((1 / ((System.currentTimeMillis() - before) * 0.001)) * MAX_SIZE) + " file per sec.");
			}
			counter.increment();
			queue.put(file.getAbsolutePath(), new HashBean());
		}
	}

	private static void processDirectories(File folder, String districtName, Set<String[]> paths, MutableLong levelCounter) {
		if (folder == null) {
			log.warn("Folder is null...", folder);
			return;
		}

		if (!folder.isDirectory()) {
			log.warn("Folder {} is not directory...", folder);
			return;
		}

		if (!useDirectory(folder, paths)) {
			return;
		}

		System.out.println("Processing database " + folder);
		final long before = System.currentTimeMillis();
		Importer.importByPath(folder.getAbsolutePath(), districtName, levelCounter);
		System.out.println("Base " + folder + " processed for [" + Math.round((System.currentTimeMillis() - before) * 0.001) + " sec.]");

		final @Nullable File[] folderFiles = folder.listFiles();
		if (folderFiles == null || folderFiles.length == 0) {
			log.warn("Directory {} is empty...", folder);
			return;
		}

		for (File directory : folderFiles) {
			processDirectories(directory, districtName, paths, levelCounter);
		}
	}

	private static boolean useDirectory(File folder, Set<String[]> paths) {
		final String absolutePath = folder.getAbsolutePath().replaceAll("\\\\", "/");

		boolean result = true;
		for (String[] path : paths) {
			result = result && !absolutePath.contains(path[0]) && !absolutePath.contains(path[0]);
		}
		return result && !folder.getAbsolutePath().endsWith("_out");
	}
}