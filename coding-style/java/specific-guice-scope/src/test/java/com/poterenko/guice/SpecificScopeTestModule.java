package com.poterenko.guice;

import com.google.common.collect.ImmutableMap;
import com.google.inject.AbstractModule;
import com.google.inject.Provides;

import javax.inject.Named;
import java.util.Map;

public class SpecificScopeTestModule extends AbstractModule {

	@Override
	protected void configure() {
		bindScope(SpecificScope.class, new LocalCacheSpecificScope());
	}

	/**
	 * Load data from database
	 *
	 * @return Snapshot data
	 */
	@Provides
	@SpecificScope
	@Named("specific-scope-data")
	protected Map<String, String> getData() {
		return ImmutableMap.<String, String>builder()
				.put("resource-url", "http://resource.com")
				.build();
	}
}