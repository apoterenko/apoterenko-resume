package qiwi.util.validation;

import com.google.common.collect.ImmutableSet;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import qiwi.core.util.converter.ValueConverter;

import javax.imageio.ImageReader;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.io.IOException;
import java.util.Set;

public class ImageValidator implements ConstraintValidator<ImageConstraint, byte[]> {

	private static final Logger log = LoggerFactory.getLogger(ImageValidator.class);

	private Set<String> formats;
	private ImageConstraint constraint;

	@Override
	public void initialize(ImageConstraint constraint) {
		this.constraint = constraint;

		final ImmutableSet.Builder<String> builder = ImmutableSet.builder();
		for (String format : constraint.formats()) {
			builder.add(prepareFormat(format));
		}
		this.formats = builder.build();
	}

	@Override
	public boolean isValid(@Nullable byte[] image, ConstraintValidatorContext context) {
		return image != null && checkSize(image) && checkFormat(image);
	}

	private boolean checkSize(@NotNull byte[] image) {
		return image.length <= constraint.size();
	}

	private boolean checkFormat(@NotNull byte[] image) {
		@Nullable
		final ImageReader reader = getImageReader(image);

		if (reader == null) {
			return false;
		}

		@Nullable
		final String formatName = getFormatName(reader);

		return formats.contains(prepareFormat(formatName));
	}

	private String prepareFormat(@Nullable String format) {
		return format != null ? format.toLowerCase() : null;
	}

	@Nullable
	private ImageReader getImageReader(@NotNull byte[] image) {
		try {
			return ValueConverter.convertTo(ImageReader.class, image);
		} catch (Exception e) {
			log.debug("ImageValidator getImageReader exception", e);

			return null;
		}
	}

	@Nullable
	private String getFormatName(@NotNull ImageReader reader) {
		try {
			return reader.getFormatName();
		} catch (IOException e) {
			log.debug("ImageValidator getFormatName exception", e);

			return null;
		}
	}
}