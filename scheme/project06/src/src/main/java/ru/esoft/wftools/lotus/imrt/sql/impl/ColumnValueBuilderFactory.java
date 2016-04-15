package ru.esoft.wftools.lotus.imrt.sql.impl;

import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Lists;
import org.apache.commons.lang.StringEscapeUtils;
import org.jetbrains.annotations.Nullable;
import org.jooq.tools.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.esoft.wftools.lotus.imrt.sql.ColumnValueBuilder;

import java.util.List;
import java.util.Map;

import static java.lang.reflect.Array.*;

public class ColumnValueBuilderFactory {

	private static final Logger log = LoggerFactory.getLogger(ColumnValueBuilderFactory.class);

	private final static Map<String, Class<?>> map = ImmutableMap.<String, Class<?>>builder()
			.put("xml", XmlValueBuilder.class)
			.put("array", ArrayValueBuilder.class)
			.build();

	private final Class<?> builderClass;

	public ColumnValueBuilderFactory(String type) {
		this.builderClass = map.get(type);
	}

	public ColumnValueBuilder makeInstance() {
		try {
			return ColumnValueBuilder.class.cast(builderClass.getConstructor().newInstance());
		} catch (Exception e) {
			log.error("ColumnValueBuilderFactory exception", e);
			throw new IllegalStateException(e);
		}
	}

	static class ArrayValueBuilder implements ColumnValueBuilder {

		private final List<Object> data;

		public ArrayValueBuilder() {
			data = Lists.newLinkedList();
		}

		@Override
		public void append(String node, @Nullable Object value) {
			data.add(value);
		}

		@Override
		public Object build() {
			try {
				return data.isEmpty() ? data.toArray() : toArray();
			} catch (Exception e) {
				log.error("ColumnValueBuilderFactory build exception", e);
				return data.toArray();
			}
		}

		@Override
		public boolean isEmpty() {
			return data.isEmpty();
		}

		@SuppressWarnings("unchecked")
		private <T> Object[] toArray() {
			final Object v = data.iterator().next();
			if (v == null) {
				return new Object[data.size()];
			}

			final T[] array = (T[]) newInstance(v.getClass(), data.size());

			int i = 0;
			for (Object value : data) {
				array[i++] = (T) value;
			}
			return array;
		}
	}

	static class XmlValueBuilder implements ColumnValueBuilder {

		private final StringBuilder sb;
		private boolean empty;

		public XmlValueBuilder() {
			this.sb = new StringBuilder("<document>");
			this.empty = true;
		}

		@Override
		public void append(String node, @Nullable Object value) {
			node = ColumnNameTransformer.transform(node, false);
			sb.append(
					String.format(TPL, node, value == null
							? StringUtils.EMPTY
							: (value instanceof String ? StringEscapeUtils.escapeXml(String.valueOf(value)) : value), node)
			);
			empty = false;
		}

		@Override
		public String build() {
			return sb.append("</document>").toString();
		}

		@Override
		public boolean isEmpty() {
			return empty;
		}

		private static final String TPL = "<%s>%s</%s>";
	}
}