package com.poterenko.guice;

import com.google.inject.Key;
import com.google.inject.Provider;
import com.google.inject.Scope;
import org.apache.shiro.util.SoftHashMap;

import javax.annotation.Nullable;
import java.util.Map;

public class LocalCacheSpecificScope implements Scope {

	private final Map<String, Object> reloadedData = new SoftHashMap<>();

	@Override
	public <T> Provider<T> scope(final Key<T> key, final Provider<T> provider) {
		final String keyValue = key.toString();

		return new Provider<T>() {

			@Override
			@SuppressWarnings("unchecked")
			public T get() {
				@Nullable T value;

				synchronized (reloadedData) {
					value = (T) reloadedData.get(keyValue);

					if (null == value) {
						reloadedData.put(keyValue, value = provider.get());
					}
				}
				return value;
			}
		};
	}

	@Override
	public String toString() {
		return "SpecificScope.LocalCacheSpecificScope";
	}
}