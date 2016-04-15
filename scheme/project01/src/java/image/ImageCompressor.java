package qiwi.util;

import com.google.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.jetbrains.annotations.NotNull;
import qiwi.util.bean.converter.ImageIOConverter;

import javax.imageio.*;
import javax.imageio.plugins.jpeg.JPEGImageWriteParam;
import javax.imageio.stream.ImageOutputStream;
import java.awt.image.RenderedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Locale;

import static qiwi.core.util.converter.ValueConverter.convertTo;

@Singleton
public class ImageCompressor {

	private static final Logger log = LoggerFactory.getLogger(ImageCompressor.class);

	@NotNull
	public byte[] compress(@NotNull byte[] image) {
		return compress(image, DEFAULT_COMPRESSION_QUALITY);
	}

	@NotNull
	public byte[] compress(@NotNull byte[] image, float compressionQuality) {

		final ByteArrayOutputStream out = new ByteArrayOutputStream();
		ImageOutputStream iout = null;

		try {
			doCompress(image, compressionQuality, iout = ImageIOConverter.toImageOutputStream(out));
			iout.flush();
			return out.toByteArray();
		} catch (IOException e) {
			log.error("ImageCompressor compress exception", e);

			throw new IllegalStateException(e);
		} finally {
			try {
				out.close();
				if (iout != null) {
					iout.close();
				}
			} catch (IOException ignored) {
			}
		}
	}

	private void doCompress(@NotNull byte[] image, float compressionQuality, ImageOutputStream iout) {

		final RenderedImage renderedImage = convertTo(RenderedImage.class, image);
		final ImageWriter imageWriter = convertTo(ImageWriter.class, image);

		imageWriter.setOutput(iout);

		try {
			imageWriter.write(
					null,
					new IIOImage(renderedImage, null, null),
					makeImageWriteParam(compressionQuality)
			);
		} catch (Exception e) {
			log.error("ImageCompressor doCompress exception", e);

			throw new IllegalStateException(e);
		} finally {
			imageWriter.dispose();
		}
	}

	private JPEGImageWriteParam makeImageWriteParam(float compressionQuality) {

		final JPEGImageWriteParam imageWriteParam = new JPEGImageWriteParam(Locale.getDefault()) {

			@Override
			public void setCompressionQuality(float quality) {
				if (quality < 0.0f || quality > 1.0f) {
					throw new IllegalArgumentException("Quality must be in the range [0.0..1.0]");
				}
				this.compressionQuality = 256 - (quality * 256);
			}
		};

		imageWriteParam.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
		imageWriteParam.setCompressionQuality(compressionQuality);

		return imageWriteParam;
	}

	/* 80%-quality of the original */
	private static final float DEFAULT_COMPRESSION_QUALITY = 0.8f;
}