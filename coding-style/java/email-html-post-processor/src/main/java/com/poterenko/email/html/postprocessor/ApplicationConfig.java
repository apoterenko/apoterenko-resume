package com.poterenko.email.html.postprocessor;

import javax.inject.Singleton;
import java.util.regex.Pattern;

// TODO
@Singleton
public class ApplicationConfig {

	public String getTitle() {
		return "Title";
	}

	public Pattern getSkipTextNodeExtraPattern() {
		return Pattern.compile("\\{\\%.+\\%\\}");
	}
}