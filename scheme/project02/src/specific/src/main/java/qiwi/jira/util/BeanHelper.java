package qiwi.jira.util;

import java.lang.reflect.Field;

import org.springframework.util.ReflectionUtils;

public final class BeanHelper {

	private BeanHelper() {}

	public static void setField(Object bean, String fieldName, Object value) {
		final Field field = ReflectionUtils.findField(bean.getClass(), fieldName);
		try {
			ReflectionUtils.makeAccessible(field);
			ReflectionUtils.setField(field, bean, value);
		} catch (Exception e) {
			throw new PropertyUpdateException("Can't set field's value for field " + field, e);
		}
	}
}
