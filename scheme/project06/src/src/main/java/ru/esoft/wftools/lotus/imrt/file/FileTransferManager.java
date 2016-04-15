package ru.esoft.wftools.lotus.imrt.file;

import org.jetbrains.annotations.Nullable;
import org.jooq.tools.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.esoft.wftools.lotus.imrt.entity.element.Entity;

import java.io.File;
import java.io.IOException;

import static org.apache.commons.lang.StringUtils.*;
import static org.apache.commons.lang.StringUtils.split;
import static ru.esoft.wftools.lotus.imrt.file.FileSupport.*;
import static ru.esoft.wftools.lotus.imrt.file.FileSupport.moveFile;

public class FileTransferManager {

	private static final Logger log = LoggerFactory.getLogger(FileTransferManager.class);
	public static final String FILE_SEPARATOR = "/";

	private final String destinationPath;
	private final String folder;

	public FileTransferManager(String destinationPath, String folder) {
		this.destinationPath = destinationPath;
		this.folder = folder;
	}

	public String buildDestinationFileName(File file) {
		@Nullable String[] array = getFileArray(file);

		if (array == null || array.length != 2) {
			log.error("Splitted path is invalid fo file {}", file);
			return StringUtils.EMPTY;
		}

		final String fileName = array[1];
		final String destinationDirectory = buildDestinationDirectory(array[0]);

		return buildDestinationFileName(destinationDirectory, fileName).replace("\\", FILE_SEPARATOR);
	}

	public void move(File file, @Nullable File attachment, Entity entity, int districtId) throws IOException {
		@Nullable String[] array = getFileArray(file);

		if (array == null || array.length != 2) {
			log.error("Splitted path is invalid for file {}", file);
			return;
		}

		final String fileName = array[1];
		final String destinationDirectory = buildDestinationDirectory(array[0]);

		moveFile(file, buildDestinationFileName(destinationDirectory, fileName));
		if (attachment != null) {
			moveAttachments(attachment, entity, districtId);
		}
	}

	@Nullable
	private String[] getFileArray(File file) {
		return split(
				file.getAbsolutePath()
						.replace(File.separator, FILE_SEPARATOR)
						.replaceAll(".+" + folder + FILE_SEPARATOR, ""),
				FILE_SEPARATOR
		);
	}

	private String buildDestinationFileName(String destinationDirectory, String fileName) {
		return join(new String[]{Transliterate.translate(destinationDirectory), fileName}, FILE_SEPARATOR);
	}

	private String buildDestinationDirectory(String outerFolder) {
		return join(new String[]{destinationPath, folder, outerFolder}, FILE_SEPARATOR);
	}
}