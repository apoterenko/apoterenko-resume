package qiwi.util.validation.file;

import com.google.common.collect.ImmutableSet;
import qiwi.util.file.File;

import javax.annotation.Nullable;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FileValidator implements ConstraintValidator<FileConstraint, File> {

	private Set<String> formats;
	private FileConstraint constraint;

	@Override
	public void initialize(FileConstraint constraint) {
		this.constraint = constraint;

		final ImmutableSet.Builder<String> builder = ImmutableSet.builder();
		for (String format : constraint.formats()) {
			builder.add(prepareFormat(format));
		}
		this.formats = builder.build();
	}

	@Override
	public boolean isValid(@Nullable File file, ConstraintValidatorContext context) {
		return file != null && checkSize(file) && checkFormat(file);
	}

	private boolean checkSize(File file) {
		final @Nullable byte[] array = file.getArray();
		return array != null && array.length <= constraint.size();
	}

	private boolean checkFormat(File file) {
		final @Nullable String fileName = file.getFileName();

		if (fileName == null) {
			return false;
		}
		final Matcher matcher = PATTERN.matcher(fileName);

		return matcher.find() && matcher.groupCount() > 1 &&
				formats.contains(prepareFormat(matcher.group(2)));
	}

	private String prepareFormat(@Nullable String format) {
		return format != null ? format.toLowerCase() : null;
	}

	private static final Pattern PATTERN = Pattern.compile("^(.+)\\.(.+)$");
}