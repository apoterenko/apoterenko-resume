package qiwi.util.bean.converter;

import com.google.inject.Singleton;
import org.apache.commons.lang.StringUtils;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import ru.osmp.common.util.Cell;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;

@Singleton
class CellFieldConverter implements FieldConverter {

	@Override
	@Nullable
	public Object convert(@NotNull FieldDescriptor fieldDescriptor) {
		final String value = fieldDescriptor.getValue();
		final FieldConverter fieldConverter = fieldDescriptor.getFieldConverter();

		if (value == null) {
			return null;
		}

		return StringUtils.isWhitespace(value) ?
				new Cell<Object>() :
				new Cell<Object>(fieldConverter.convert(updateBean(fieldDescriptor)));
	}

	private FieldDescriptor updateBean(FieldDescriptor fieldDescriptor) {
		return fieldDescriptor.setFieldType(getFieldType(fieldDescriptor.getField()));
	}

	private Class<?> getFieldType(Field field) {
		return Class.class.cast(
				ParameterizedType.class.cast(field.getGenericType()).getActualTypeArguments()[0]
		);
	}
}