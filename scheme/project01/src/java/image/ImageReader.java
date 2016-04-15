package qiwi.util.image;

import org.apache.commons.io.IOUtils;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;

public class ImageReader {

	private static final transient Logger log = LoggerFactory.getLogger(ImageReader.class);

	private final byte[] image;

	protected ImageReader(String fileName) {
		this.image = readImage(fileName);
	}

	@NotNull
	private byte[] readImage(@NotNull String name) {
		try {
			final byte[] image = IOUtils.toByteArray(readStream(name));
			if (log.isDebugEnabled()) {
				log.debug("Read the file by name " + name + " has a size " + image.length);
			}
			return image;
		} catch (IOException e) {
			log.error("DefaultImageReader exception", e);
			throw new IllegalStateException(e);
		}
	}

	@NotNull
	private InputStream readStream(@NotNull String name) {
		return this.getClass().getResourceAsStream(String.format("img/%s", name));
	}

	@NotNull
	public byte[] getImage() {
		return image;
	}
}