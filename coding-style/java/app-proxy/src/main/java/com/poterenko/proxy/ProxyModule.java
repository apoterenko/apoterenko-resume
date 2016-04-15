package com.poterenko.proxy;

import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestFactory;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.common.base.Function;

import com.google.inject.Provides;
import com.google.inject.TypeLiteral;
import com.google.inject.servlet.ServletModule;
import com.poterenko.proxy.cookie.CookieChecker;
import com.poterenko.proxy.cookie.impl.CookieCheckerImpl;
import com.poterenko.proxy.cookie.impl.ToCookieNameFunction;
import com.poterenko.proxy.request.ProxyRequestProvider;
import com.poterenko.proxy.servlets.ProxyApiFilter;
import com.poterenko.proxy.servlets.ProxyCookieFilter;

import static java.lang.System.getProperty;
import static org.apache.maven.shared.utils.StringUtils.isEmpty;

import javax.inject.Named;
import javax.inject.Singleton;
import javax.servlet.http.Cookie;

public class ProxyModule extends ServletModule {

	@Override
	protected void configureServlets() {
		if (!isEmpty(getProperty(ProxyConstants.PROXY_DEBUG))) {
			filter("*").through(ProxyCookieFilter.class);
		}
		filter(getProperty(ProxyConstants.PROXY_PATTERN)).through(ProxyApiFilter.class);

		bind(HttpRequest.class).toProvider(ProxyRequestProvider.class);
		bind(HttpTransport.class).toInstance(new NetHttpTransport.Builder().build());
		bind(CookieChecker.class).to(CookieCheckerImpl.class).asEagerSingleton();
		bind(new TypeLiteral<Function<Cookie, String>>() {}).to(ToCookieNameFunction.class);
	}

	@Provides
	@Singleton
	@Named(ProxyConstants.PROXY_TARGET)
	protected String getHost() {
		return getProperty(ProxyConstants.PROXY_TARGET);
	}

	@Provides
	@Singleton
	protected HttpRequestFactory getHttpRequestFactory(HttpTransport transport) {
		return transport.createRequestFactory();
	}
}