package com.poterenko.guice;

import org.testng.annotations.Guice;
import org.testng.annotations.Test;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Provider;

import java.util.Map;

import static org.testng.Assert.*;

@Test
@Guice(modules = SpecificScopeTestModule.class)
public class SpecificScopeTest {

	@Inject
	@Named("specific-scope-data")
	private Provider<Map<String, String>> dataProvider;

	public void testResourceUrl() {
		final String resourceUrl = dataProvider
				.get()
				.get("resource-url");
		assertEquals(resourceUrl, "http://resource.com");

		final String resourceUrl2 = dataProvider
				.get()
				.get("resource-url");
		assertEquals(resourceUrl2, "http://resource.com");
	}
}