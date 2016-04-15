package com.poterenko.email.html.postprocessor.xsd;

import com.google.inject.Provider;

import javax.inject.Singleton;

import static com.poterenko.email.html.postprocessor.ResourceFactory.HTML_STYLE;

@Singleton
public class HtmlStylesTypeProvider implements Provider<HtmlStylesType> {

	@Override
	public HtmlStylesType get() {
		return JAXBSupport.unmarshal(HTML_STYLE, HtmlStylesType.class);
	}
}