package com.poterenko.email.html.postprocessor;

import com.google.common.collect.ImmutableList;
import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.poterenko.email.html.postprocessor.tidy.TidyProvider;
import com.poterenko.email.html.postprocessor.visitor.*;
import com.poterenko.email.html.postprocessor.xml.DocumentBuilderProvider;
import com.poterenko.email.html.postprocessor.xsd.HtmlAttributesType;
import com.poterenko.email.html.postprocessor.xsd.HtmlAttributesTypeProvider;
import com.poterenko.email.html.postprocessor.xsd.HtmlStylesTypeProvider;
import com.poterenko.email.html.postprocessor.xsd.HtmlStylesType;
import org.w3c.tidy.Tidy;

import javax.inject.Singleton;
import javax.xml.parsers.DocumentBuilder;

public class ApplicationModule extends AbstractModule {

	@Override
	protected void configure() {
		bind(DocumentBuilder.class).toProvider(DocumentBuilderProvider.class).asEagerSingleton();
		bind(HtmlStylesType.class).toProvider(HtmlStylesTypeProvider.class).asEagerSingleton();
		bind(HtmlAttributesType.class).toProvider(HtmlAttributesTypeProvider.class).asEagerSingleton();
		bind(Tidy.class).toProvider(TidyProvider.class);
	}

	@Provides
	@Singleton
	protected Iterable<DocumentVisitor> getDocumentVisitors(
			HtmlVisitor htmlVisitor,
			TitleVisitor titleVisitor,
			StyleVisitor styleVisitor,
			MetaVisitor metaVisitor) {

		return ImmutableList.<DocumentVisitor>builder()
				.add(htmlVisitor)
				.add(titleVisitor)
				.add(styleVisitor)
				.add(metaVisitor)
				.build();
	}
}