package ru.esoft.wftools.lotus.imrt.file;

import com.google.common.collect.Lists;
import org.apache.commons.io.FileUtils;
import org.jetbrains.annotations.Nullable;
import ru.esoft.wftools.lotus.imrt.entity.element.Entity;
import ru.esoft.wftools.lotus.imrt.sql.impl.FileColumnNameBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.List;

public class FileSupport {

	private static final boolean ENABLED_FILE_TRANSFER = true;

	public static boolean makeDirectory(String path) throws IOException {
		if (ENABLED_FILE_TRANSFER) {
			FileUtils.forceMkdir(new File(path));
		}
		return true;
	}

	public static void moveFile(File sourceFile, File destinationFile) throws IOException {
		if (ENABLED_FILE_TRANSFER) {
			final Path file = Paths.get(sourceFile.toURI());
			final Path targetFile = Paths.get(destinationFile.toURI());
			moveFile(file, targetFile);
		}
	}

	public static void moveAttachments(File attachment, Entity entity, int districtId) throws IOException {
		if (ENABLED_FILE_TRANSFER) {
			final List<Path> attachments = geAttachmentFiles(attachment);
			if (attachments.isEmpty()) {
				return;
			}

			for (Path path : attachments) {
				final Path targetFile = Paths.get(new File(FileColumnNameBuilder.toAbsoluteFileName(String.valueOf(path.getFileName()), entity, districtId)).toURI());
				moveFile(path, targetFile);
			}
		}
	}

	public static void moveFile(File sourceFile, String destinationFile) throws IOException {
		moveFile(sourceFile, new File(destinationFile));
	}

	private static void moveFile(Path file, Path targetFile) throws IOException {
		final Path parent = targetFile.getParent();

		Files.createDirectories(parent);
		Files.move(file, targetFile, StandardCopyOption.ATOMIC_MOVE, StandardCopyOption.REPLACE_EXISTING);
	}

	private static List<Path> geAttachmentFiles(File attachment) throws IOException {
		final List<Path> files = Lists.newLinkedList();

		Files.walkFileTree(Paths.get(attachment.toURI()), new FileVisitor<Path>() {

			@Override
			public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) throws IOException {
				return FileVisitResult.CONTINUE;
			}

			@Override
			public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
				files.add(file);
				return FileVisitResult.CONTINUE;
			}

			@Override
			public FileVisitResult visitFileFailed(Path file, IOException exc) throws IOException {
				return FileVisitResult.CONTINUE;
			}

			@Override
			public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
				return FileVisitResult.CONTINUE;
			}
		});
		return files;
	}

	public static void cleanDirectory(String path) throws IOException {
		if (ENABLED_FILE_TRANSFER) {
			final File file = new File(path);
			if (!file.isDirectory()) {
				return;
			}

			final @Nullable File[] files = file.listFiles();
			if (files == null || files.length == 0) {
				return;
			}

			for (File entry : files) {
				if (FileUtils.sizeOfDirectory(entry) == 0) {
					FileUtils.deleteDirectory(entry);
				}
			}
		}
	}
}