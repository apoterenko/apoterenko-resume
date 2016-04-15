package ru.esoft.web.ui.converter;

import org.jetbrains.annotations.Nullable;
import ru.esoft.Common.UniData.UniData;

public interface ValueConverter {

	@Nullable
	Long toLong(String fieldName);

	@Nullable
	String toString(String fieldName);

	@Nullable
	Long getActionId();

	@Nullable
	Long getId();

	@Nullable
	String getSession();

	UniData toUniData();
}