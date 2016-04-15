package ru.esoft.wftools.lotus.imrt.sql.impl;

import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;

public class DatabaseConnectionManager {

	private static final Logger log = LoggerFactory.getLogger(DatabaseConnectionManager.class);

	private static String connectionString;

	public static void setConnectionString(String connectionString) {
		DatabaseConnectionManager.connectionString = connectionString;
	}

	static {
		try {
			Class.forName("org.postgresql.Driver");
		} catch (ClassNotFoundException e) {
			log.error("DatabaseConnectionManager load jdbc driver exception", e);
		}
	}

	@Nullable
	private static Connection getConnection() throws SQLException {
		return DriverManager.getConnection(connectionString);
	}

	public static void process(DatabaseConnectionHandler handler) throws Exception {
		final @Nullable Connection connection = getConnection();

		if (connection == null) {
			throw new IllegalStateException("Connection is null..");
		}

		connection.createStatement().execute("set search_path to 'lotusd'");
		connection.setAutoCommit(false);
		final Savepoint savepoint = connection.setSavepoint();

		try {
			handler.handler(connection);
			connection.commit();
		} catch (SQLException e) {
			connection.rollback(savepoint);

			logRecursively(e);
			throw e;
		} catch (Exception e) {
			connection.rollback(savepoint);

			final Throwable cause = e.getCause();
			if (cause instanceof BatchUpdateException) {
				for (Throwable sex : ((BatchUpdateException) cause)) {
					log.error("DatabaseConnectionManager process exception", sex);
				}
			}

			logRecursively(e);
			throw e;
		} finally {
			try {
				connection.close();
			} catch (SQLException e) {
				log.error("DatabaseConnectionManager close connection exception", e);
			}
		}
	}

	private static void logRecursively(Throwable e) {
		if (e.getCause() == null) {
			log.error("DatabaseConnectionManager process exception", e);
			return;
		}
		logRecursively(e.getCause());
	}

	public static interface DatabaseConnectionHandler {

		void handler(Connection connection) throws SQLException;
	}
}