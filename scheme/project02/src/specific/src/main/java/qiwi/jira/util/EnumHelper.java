package qiwi.jira.util;

public final class EnumHelper {

	public static <E extends Enum<E>> E valueOf(String name, Class<E> enumType) {
		try {
			return Enum.valueOf(enumType, name);
		} catch (RuntimeException e) {
			return null;
		}
	}

	public static <E extends Enum<E>> boolean exists(String name, Class<E> enumType) {
		return valueOf(name, enumType) != null;
	}
}
