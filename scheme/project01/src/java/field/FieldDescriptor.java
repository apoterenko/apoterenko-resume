package qiwi.util.bean.converter;

import java.lang.reflect.Field;

public class FieldDescriptor {

	private Field field;
	private String value;
	private Class<?> fieldType;
	private FieldConverter fieldConverter;

	Class<?> getFieldType() {
		return fieldType == null ? field.getType() : fieldType;
	}

	FieldDescriptor setFieldType(Class<?> fieldType) {
		this.fieldType = fieldType;
		return this;
	}

	Field getField() {
		return field;
	}

	public FieldDescriptor setField(Field field) {
		this.field = field;
		return this;
	}

	String getValue() {
		return value;
	}

	public FieldDescriptor setValue(String value) {
		this.value = value;
		return this;
	}

	FieldConverter getFieldConverter() {
		return fieldConverter;
	}

	FieldDescriptor setFieldConverter(FieldConverter fieldConverter) {
		this.fieldConverter = fieldConverter;
		return this;
	}
}