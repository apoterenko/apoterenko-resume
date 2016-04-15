package ru.esoft.web.ui.converter.impl;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.Lists;
import com.google.inject.Inject;
import com.google.inject.Provider;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Request;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.jetbrains.annotations.Nullable;
import ru.esoft.Common.UniData.UniData;
import ru.esoft.Common.UniData.UniDataTable;
import ru.esoft.Common.UniData.UniDataTableFields;
import ru.esoft.Platform.util.tools.UniDataTools;
import ru.esoft.web.ui.converter.ValueConverter;

import java.text.SimpleDateFormat;
import java.util.*;

public class ValueConverterImpl implements ValueConverter {

	@Inject
	private Provider<JSONRPC2Request> jsonrpc2RequestProvider;

	private JSONRPC2Request getJsonrpc2Request() {
		return jsonrpc2RequestProvider.get();
	}

	private Map<String, Object> getNamedParams() {
		final Map<String, Object> params = getJsonrpc2Request().getNamedParams();
		return params != null ? Collections.unmodifiableMap(params) : Collections.<String, Object>emptyMap();
	}

	@Override
	@Nullable
	public Long toLong(String fieldName) {
		final @Nullable Object value = getNamedParams().get(fieldName);
		return value instanceof Long ? Long.class.cast(value) : null;
	}

	@Override
	@Nullable
	public String toString(String fieldName) {
		final @Nullable Object value = getNamedParams().get(fieldName);
		return value instanceof String ? String.class.cast(value) : null;
	}

	@Override
	@Nullable
	public Long getActionId() {
		return toLong("actionId");
	}

	@Override
	@Nullable
	public Long getId() {
		return toLong("id");
	}

	@Override
	@Nullable
	public String getSession() {
		return toString("session");
	}

	@Override
	public UniData toUniData() {
		UniDataTools uniDataTools = new UniDataTools();

		final Map<String, Object> namedParams = getNamedParams();
		for (Map.Entry<String, Object> entry : namedParams.entrySet()) {

			@Nullable Object value = entry.getValue();
			if (value instanceof JSONObject) {
				value = fromJsonObject(JSONObject.class.cast(value));
			} else if (value instanceof JSONArray) {
				value = toUniDataTable(JSONArray.class.cast(value));
			}

			if (value != null) {
				uniDataTools = uniDataTools.setField(entry.getKey(), value);
			}
		}
		return uniDataTools.toUniData();
	}

	@Nullable
	private Object fromJsonObject(JSONObject jsonObject) {
		@Nullable UniDataTable table = toUniDataTable(jsonObject);
		if (table != null) {
			return table;
		}

		@Nullable Date date = toDate(jsonObject);
		if (date != null) {
			return date;
		}
		return null;
	}

	@Nullable
	private UniDataTable toUniDataTable(JSONArray jsonArray) {
		return toUniDataTable(new JSONArray(), new JSONObject(), jsonArray);
	}

	@Nullable
	private UniDataTable toUniDataTable(JSONObject jsonObject) {
		final @Nullable Object columns = jsonObject.get("columns");
		final @Nullable Object attributes = jsonObject.get("attributes");
		final @Nullable Object rows = jsonObject.get("rows");

		return toUniDataTable(columns, attributes, rows);
	}

	@Nullable
	private UniDataTable toUniDataTable(Object columns, Object attributes, Object rows) {
		if (columns != null || attributes != null || rows != null) {
			final JSONArray rowsAsArray = JSONArray.class.cast(rows);
			final JSONArray columnsAsArray = JSONArray.class.cast(columns);
			final JSONObject attributesAsObject = JSONObject.class.cast(attributes);

			final Hashtable attributesAsHashTable = new Hashtable();
			for (Map.Entry<String, Object> entry : attributesAsObject.entrySet()) {
				attributesAsObject.put(entry.getKey(), entry.getValue());
			}

			return new UniDataTable(
					columnsAsArray.toArray(new String[columnsAsArray.size()]),
					toUniDataTableFields(rowsAsArray),
					attributesAsHashTable
			);
		}
		return null;
	}

	@Nullable
	private Date toDate(JSONObject jsonObject) {
		final @Nullable Object dateValue = jsonObject.get("dateValue");
		final @Nullable Object dateHolder = jsonObject.get("dateHolder");
		final @Nullable Object isNullDate = jsonObject.get("isNullDate");

		if (dateValue != null || dateHolder != null || isNullDate != null) {
			return parseDate(dateValue);
		}
		return null;
	}

	private List<UniDataTableFields> toUniDataTableFields(JSONArray array) {
		final List<UniDataTableFields> rows = Lists.newLinkedList();

		for (Object rowAsObject : array) {
			final UniDataTableFields fields = new UniDataTableFields();

			if (rowAsObject instanceof JSONObject) {
				JSONObject jsonObject = JSONObject.class.cast(rowAsObject);

				final @Nullable Object inData = jsonObject.get("inData");
				if (inData instanceof JSONObject) {
					jsonObject = JSONObject.class.cast(inData);
				}

				for (Map.Entry<String, Object> entry : jsonObject.entrySet()) {
					initField(fields, entry);
				}
			}
			rows.add(fields);
		}
		return rows;
	}

	private void initField(UniDataTableFields fields, Map.Entry<String, Object> entry) {
		final @Nullable Object value = entry.getValue();
		if (value instanceof Long) {
			fields.setField(entry.getKey(), Long.class.cast(value));
		} else if (value instanceof String) {
			fields.setField(entry.getKey(), String.class.cast(value));
		} else if (value instanceof Boolean) {
			fields.setField(entry.getKey(), Boolean.class.cast(value));
		} else if (value instanceof JSONObject) {
			final @Nullable Object convertedValue = fromJsonObject(JSONObject.class.cast(value));
			if (convertedValue instanceof UniDataTable) {
				fields.setField(entry.getKey(), UniDataTable.class.cast(convertedValue));
			} else if (convertedValue instanceof Date) {
				fields.setField(entry.getKey(), Date.class.cast(convertedValue));
			}
		}
	}

	private Date parseDate(Object value) {
		for (String pattern : PATTERNS) {
			final @Nullable Date parsedValue = parseDate(pattern, value);
			if (parsedValue != null) {
				return parsedValue;
			}
		}
		return null;
	}

	@Nullable
	private Date parseDate(String pattern, Object value) {
		try {
			return new SimpleDateFormat(pattern).parse(String.valueOf(value));
		} catch (Exception ignored) {
		}
		return null;
	}

	private final static List<String> PATTERNS = ImmutableList.<String>builder()
			.add("dd.MM.yyyy HH:mm:ss")
			.build();
}