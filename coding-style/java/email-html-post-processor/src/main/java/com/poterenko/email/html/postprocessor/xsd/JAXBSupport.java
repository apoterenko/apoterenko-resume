package com.poterenko.email.html.postprocessor.xsd;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.net.URL;

final class JAXBSupport {

	private static final Logger log = LoggerFactory.getLogger(JAXBSupport.class);

	@SuppressWarnings("unchecked")
	static <T> T unmarshal(URL resource, Class<T> tClass) {
		try {
			return (T) toObject(resource, tClass);
		} catch (JAXBException e) {
			log.error("JAXSupport unmarshal exception", e);

			throw new IllegalStateException("JAXSupport unmarshal exception", e);
		}
	}

	private static <T> Object toObject(URL resource, Class<T> tClass) throws JAXBException {
		final JAXBContext jc = JAXBContext.newInstance(tClass);
		final Unmarshaller unmarshaller = jc.createUnmarshaller();

		return unmarshaller.unmarshal(resource);
	}
}