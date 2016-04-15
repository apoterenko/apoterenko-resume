package ru.esoft.wftools.lotus.imrt.xml;

import org.apache.commons.io.IOUtils;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;

public class XmlObjectProvider {

	private static final Logger log = LoggerFactory.getLogger(XmlObjectProvider.class);

	@SuppressWarnings("unchecked")
	static <T> T fromXml(String fileName) {
		try {
			return (T) XStreamFactory.getInstance().fromXML(XmlCleaner.clean(loadXml(XmlObjectProvider.class, fileName)));
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public static String loadXml(Class<?> provider, String fileName) {
		@Nullable InputStream in = null;
		try {
			in = provider.getResourceAsStream(String.format("xml/%s.xml", fileName));
			log.info("Read file {}", fileName);

			final StringWriter writer = new StringWriter();
			IOUtils.copy(in, writer, "UTF-8");
			return writer.toString();
		} catch (IOException e) {
			log.info("XmlObjectProvider loadXml exception", e);
		} finally {
			if (in != null) {
				IOUtils.closeQuietly(in);
			}
		}

		log.error("The file " + fileName + " can not be read");
		throw new IllegalStateException("The file " + fileName + " can not be read");
	}
}