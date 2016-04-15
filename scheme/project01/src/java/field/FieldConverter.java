package qiwi.util.bean.converter;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

interface FieldConverter {

	@Nullable
	Object convert(@NotNull FieldDescriptor fieldDescriptor);
}