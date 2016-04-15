package ru.esoft.web.ui.servlets.impl;

import com.google.inject.Provider;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.esoft.web.ui.servlets.ArtifactVersionResolver;

import javax.inject.Inject;
import javax.servlet.ServletContext;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ArtifactVersionResolverImpl implements ArtifactVersionResolver {

	private static final Logger log = LoggerFactory.getLogger(ArtifactVersionResolverImpl.class);

	@Inject
	private Provider<ServletContext> servletContextProvider;

	@Override
	public String getVersion() {
		String version = readProperties().getProperty("version", null);
		if (version != null) {
			return version;
		}

		final Package package0 = getClass().getPackage();
		if (package0 != null) {
			version = package0.getImplementationVersion();
			if (version == null) {
				version = package0.getSpecificationVersion();
			}
		}
		if (version != null) {
			return version;
		}
		return String.valueOf(System.currentTimeMillis());
	}

	private Properties readProperties() {
		final ServletContext context = servletContextProvider.get();
		final String pomPropertiesPath = context.getRealPath("/META-INF/maven/ru.esoft/webui/pom.properties");

		final Properties p = new Properties();
		InputStream is = null;

		try {
			p.load(is = new FileInputStream(pomPropertiesPath));
		} catch (IOException e) {
			log.trace("ArtifactVersionResolverImpl readProperties exception", e);
		} finally {
			if (is != null) {
				IOUtils.closeQuietly(is);
			}
		}
		return p;
	}
}