package ru.esoft.wftools.lotus.imrt.sql.impl;

import java.sql.Connection;
import java.sql.SQLException;

public class ObjectExistChecker {

	public static boolean check(Connection connection, String name) throws SQLException {
		return connection.createStatement().executeQuery(
				String.format("SELECT 1 FROM pg_catalog.pg_class c JOIN   pg_catalog.pg_namespace n ON n.oid = c.relnamespace WHERE  n.nspname = 'lotusd'  AND c.relname = '%s'", name)
		).next();
	}
}