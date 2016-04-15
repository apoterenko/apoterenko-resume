package qiwi.util.bean.converter;

import java.awt.image.RenderedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Iterator;

import org.apache.camel.Converter;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageInputStream;
import javax.imageio.stream.ImageOutputStream;

@Converter
public class ImageIOConverter {

	private static final Logger log = LoggerFactory.getLogger(ImageIOConverter.class);

	@NotNull
	@Converter
	public static ImageReader toImageReader(@NotNull byte[] image) {
		final InputStream io = new ByteArrayInputStream(image);
		ImageInputStream input = null;

		try {
			final Iterator<ImageReader> iterator =
					ImageIO.getImageReaders(input = toImageInputStream(io));

			if (!iterator.hasNext()) {
				throw new IllegalStateException("Input stream doesn't contain any graphics file...");
			}

			final ImageReader reader = iterator.next();
			reader.setInput(input);

			return reader;
		} finally {
			try {
				io.close();
				if (input != null) {
					input.close();
				}
			} catch (IOException ignored) {
			}
		}
	}

	@NotNull
	@Converter
	public static ImageWriter toImageWriter(@NotNull byte[] image) {
		final @NotNull ImageReader imageReader = toImageReader(image);
		final @Nullable ImageWriter imageWriter = ImageIO.getImageWriter(imageReader);

		if (imageWriter == null) {
			throw new IllegalStateException("Unable to get ImageWriter from image...");
		}

		return imageWriter;
	}

	@NotNull
	@Converter
	public static RenderedImage toRenderedImage(@NotNull byte[] image) {
		final InputStream io = new ByteArrayInputStream(image);

		RenderedImage renderedImage;

		try {
			renderedImage = ImageIO.read(io);
		} catch (IOException e) {
			log.error("ImageIOConverter toRenderedImage exception", e);

			throw new IllegalStateException(e);
		} finally {
			try {
				io.close();
			} catch (IOException ignored) {
			}
		}

		if (renderedImage == null) {
			throw new IllegalStateException("Unable to get RenderedImage from image...");
		}

		return renderedImage;
	}

	@NotNull
	public static ImageInputStream toImageInputStream(@NotNull InputStream io) {
		ImageInputStream input;

		try {
			input = ImageIO.createImageInputStream(io);
		} catch (IOException e) {
			throw new IllegalStateException("ImageIOConverter toImageInputStream exception", e);
		}

		if (input == null) {
			throw new IllegalStateException("Unable to get ImageInputStream from image...");
		}

		return input;
	}

	@NotNull
	public static ImageOutputStream toImageOutputStream(@NotNull OutputStream out) {
		ImageOutputStream output;

		try {
			output = ImageIO.createImageOutputStream(out);
		} catch (IOException e) {
			throw new IllegalStateException("ImageIOConverter toImageInputStream exception", e);
		}

		if (output == null) {
			throw new IllegalStateException("Unable to get ImageOutputStream from image...");
		}

		return output;
	}
}