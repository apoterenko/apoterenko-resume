package qiwi.util.image;

import org.jetbrains.annotations.Nullable;
import org.jetbrains.annotations.NotNull;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import static qiwi.core.util.converter.ValueConverter.toLong;
import static qiwi.util.bean.converter.TypeConverter.as;
import static qiwi.util.bean.converter.TypeConverter.asString;
import static qiwi.util.image.ImageInfoConverter.ImageInfoParameters.*;
import static ru.osmp.common.util.ObjectUtils.nvl;

class ImageInfoConverter {

	@Nullable
	static ImageInfo toImageInfo(@Nullable Map<String, Serializable> imageInfoMap) {
		if (imageInfoMap == null) {
			return null;
		}

		final byte[] data = as(byte[].class, imageInfoMap.get(DATA));
		if (data == null) {
			return null;
		}

		final String suffix = asString(imageInfoMap.get(SUFFIX));
		final String mimeType = asString(imageInfoMap.get(MIME_TYPE));

		return ImageInfo.builder()
				.data(data)
				.mimeType(nvl(mimeType, "image/unknown"))
				.id(toLong(imageInfoMap.get(ID)))
				.suffix(suffix)
				.build();
	}

	@NotNull
	static Map<String, Serializable> fromImageInfo(@NotNull ImageInfo imageInfo) {
		final Map<String, Serializable> data = new HashMap<String, Serializable>();
		data.put(DATA, imageInfo.getData());
		data.put(ID, imageInfo.getId());
		data.put(SUFFIX, imageInfo.getSuffix());
		data.put(MIME_TYPE, imageInfo.getMimeType());
		return data;
	}

	static final class ImageInfoParameters {

		static String DATA = "data";
		static String ID = "id";
		static String SUFFIX = "suffix";
		static String MIME_TYPE = "mimetype";
	}
}