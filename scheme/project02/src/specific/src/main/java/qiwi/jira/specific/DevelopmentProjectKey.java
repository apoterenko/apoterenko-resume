package qiwi.jira.specific;

import com.google.common.base.Function;
import com.google.common.collect.Collections2;
import com.google.common.collect.Lists;

import java.util.Collection;
import java.util.Collections;

public enum DevelopmentProjectKey {
	ACM,
	BM,
	DI,
	DST,
	FLASH,
	FO,
	JS,
	MOBT,
	OWNS,
	PHP,
	POS,
	PRV,
	RENT,
	RFP,
	XMLTWO;

	public static Collection<String> DEVELOPMENT_PROJECT_KEYS = Collections.unmodifiableCollection(
		Collections2.transform(
			Lists.newArrayList(DevelopmentProjectKey.values()),
			new Function<DevelopmentProjectKey, String>() {

				@Override
				public String apply(DevelopmentProjectKey from) {
					return from != null ? from.name() : null;
				}
			}
		)
	);
}
