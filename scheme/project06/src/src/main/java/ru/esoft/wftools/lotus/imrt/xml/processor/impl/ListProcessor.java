package ru.esoft.wftools.lotus.imrt.xml.processor.impl;

import com.google.common.collect.ImmutableMap;
import org.jetbrains.annotations.Nullable;
import org.jooq.tools.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import ru.esoft.wftools.lotus.imrt.entity.element.Item;
import ru.esoft.wftools.lotus.imrt.entity.element.ItemType;
import ru.esoft.wftools.lotus.imrt.sql.impl.ColumnType;
import ru.esoft.wftools.lotus.imrt.sql.ColumnValueBuilder;
import ru.esoft.wftools.lotus.imrt.sql.impl.ColumnValueBuilderFactory;
import ru.esoft.wftools.lotus.imrt.xml.FirstNodeQualifier;
import ru.esoft.wftools.lotus.imrt.xml.XmlCleaner;
import ru.esoft.wftools.lotus.imrt.xml.converter.Converter;
import ru.esoft.wftools.lotus.imrt.xml.converter.impl.*;
import ru.esoft.wftools.lotus.imrt.xml.element.Column;
import ru.esoft.wftools.lotus.imrt.xml.processor.XmlNodeProcessor;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static ru.esoft.wftools.lotus.imrt.sql.impl.ColumnType.*;

public class ListProcessor implements XmlNodeProcessor {

	private static final Logger log = LoggerFactory.getLogger(ListProcessor.class);

	private final ColumnValueBuilderFactory columnValueBuilderFactory;
	private final Map<ColumnType, Converter> converters;

	public ListProcessor(ColumnValueBuilderFactory columnValueBuilderFactory) {
		this.columnValueBuilderFactory = columnValueBuilderFactory;
		this.converters = ImmutableMap.<ColumnType, Converter>builder()
				.put(TEXT, new TextConverter())
				.put(TEXT_ARRAY, new TextConverter())
				.put(ColumnType.INTEGER, new IntegerConverter())
				.put(INTEGER_ARRAY, new IntegerConverter())
				.put(DATE, new DateConverter())
				.put(DATE_ARRAY, new DateConverter())
				.put(TIMESTAMP, new TimestampConverter())
				.put(TIMESTAMP_ARRAY, new TimestampConverter())
				.build();
	}

	@Nullable
	@Override
	public Object process(Node node, Column column) {
		final NodeList list = node.getChildNodes();
		final int length = list.getLength();

		final ColumnValueBuilder xmlNodeBuilder = columnValueBuilderFactory.makeInstance();

		for (int i = 0; i < length; i++) {
			final Node child = list.item(i);
			final @Nullable ItemType type = FirstNodeQualifier.getNodeType(child);
			if (type == null) {
				continue;
			}

			@Nullable String textContent = XmlCleaner.clean(child.getTextContent());
			if (StringUtils.isEmpty(textContent)) {
				continue;
			}

			@Nullable String pattern = column.getPattern();
			if (pattern != null) {
				final Matcher matcher = Pattern.compile(pattern).matcher(textContent);

				@Nullable String name = null;
				@Nullable String value = null;

				final int groupCount = matcher.groupCount();

				if (matcher.matches()) {
					final @Nullable Integer patternGroupIndex = column.getPatternGroupIndex();
					if (patternGroupIndex != null) {
						if (matcher.groupCount() >= patternGroupIndex) {
							xmlNodeBuilder.append(name, prepareColumnValue(matcher.group(patternGroupIndex), column));
						}
					} else {
						if (groupCount > 0) {
							name = matcher.group(1);
						}
						if (groupCount > 1) {
							value = matcher.group(2);
						}
						if (name != null) {
							xmlNodeBuilder.append(name, prepareColumnValue(value, column));
						}
					}
				}
			} else {
				xmlNodeBuilder.append("text", prepareColumnValue(textContent, column));
			}
		}

		if (xmlNodeBuilder.isEmpty()) {
			// Возможно это single нода или нода со сложным текстом
			@Nullable String textContent = XmlCleaner.clean(node.getTextContent());
			@Nullable String separator = column.getSeparator();

			if (textContent == null || textContent.isEmpty()) {
				return null;
			}

			if (separator != null) {
				@Nullable Integer groupSeparateIndex = column.getGroupSeparateIndex();
				if (groupSeparateIndex != null && groupSeparateIndex > 0 && column.isMulti()) {
					/**
					 * Ошибка в данных, т.к. поле помечено как список, а в документе только single-ноды со сложным текстом
					 */
					log.error("Contract is broken {} {} {}", node.getNodeName(), column.getColumnName(), column.getName());
					xmlNodeBuilder.append(node.getNodeName(), prepareColumnValue(textContent, column));
				} else {
					final String[] values = textContent.split(separator);
					for (String value : values) {
						xmlNodeBuilder.append(node.getNodeName(), prepareColumnValue(value, column));
					}
				}
			} else {
				xmlNodeBuilder.append(node.getNodeName(), prepareColumnValue(textContent, column));
			}
		}
		return xmlNodeBuilder.build();
	}

	private Object prepareColumnValue(String value, Column column) {
		if (isCustomEmpty(value)) {
			return StringUtils.EMPTY;
		}

		@Nullable String separator = column.getSeparator();
		if (separator != null && column.isGroupSeparate()) {
			final String[] splitList = value.split(separator);
			final @Nullable Integer groupSeparateIndex = column.getGroupSeparateIndex();

			if (groupSeparateIndex != null && splitList.length > groupSeparateIndex) {
				return splitList[groupSeparateIndex];
			} else {
				return splitList;
			}
		}

		final @Nullable Converter converter = converters.get(column.getType());
		if (converter == null) {
			return value;
		}
		return converter.from(column, new Item().setText(value));
	}

	private boolean isCustomEmpty(String value) {
		return "<Empty>".equals(value) || "|".equals(value);
	}
}