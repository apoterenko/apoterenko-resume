package qiwi.util.bean.converter;

import com.google.common.collect.ImmutableMap;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.joda.time.DateTime;
import qiwi.core.util.converter.ValueConverter;
import ru.osmp.common.util.Cell;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;

@Singleton
public class FieldConverterDispatcher implements FieldConverter {

	private final Map<Class<?>, FieldConverter> converters;

	@Inject
	protected FieldConverterDispatcher(
			DateFieldConverter dateConverter,
			CellFieldConverter cellConverter) {
		converters = ImmutableMap.<Class<?>, FieldConverter>builder()
				.put(Date.class, dateConverter)
				.put(DateTime.class, dateConverter)
				.put(Timestamp.class, dateConverter)
				.put(Cell.class, cellConverter)
				.build();
	}

	@Override
	@Nullable
	public Object convert(@NotNull FieldDescriptor fieldDescriptor) {
		final String value = fieldDescriptor.getValue();
		final Class<?> fieldType = fieldDescriptor.getFieldType();

		if (value == null) {
			return null;
		}

		final FieldConverter fieldConverter = converters.get(fieldType);

		return fieldConverter != null ?
				fieldConverter.convert(fieldDescriptor.setFieldConverter(this)) :
				ValueConverter.convertTo(fieldType, value);
	}
}