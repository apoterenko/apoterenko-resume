package qiwi.util.image;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import qiwi.util.storage.DataStorage;
import qiwi.util.storage.DataStorageException;
import ru.osmp.common.cache.AbstractCache;

import static qiwi.util.image.ImageInfoConverter.*;

public class ImageInfoDataStorage implements DataStorage<ImageInfo> {

	private final String key;
	private final AbstractCache cache;

	protected ImageInfoDataStorage(String key, AbstractCache cache) {
		this.key = key;
		this.cache = cache;
	}

	@Override
	public long write(@NotNull ImageInfo data) throws DataStorageException {
		cache.put(key, String.valueOf(data.getId()), fromImageInfo(data));
		return data.getId();
	}

	@NotNull
	@Override
	public ImageInfo read(long id) throws DataStorageException {
		@Nullable final ImageInfo imageInfo = toImageInfo(cache.get(key, String.valueOf(id)));

		if (imageInfo == null) {
			throw new DataStorageException("ImageInfo is null by id " + id);
		}
		return imageInfo;
	}
}