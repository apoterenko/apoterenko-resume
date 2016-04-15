package ru.esoft.wftools.lotus.imrt.file;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.apache.commons.lang.StringUtils;
import org.jetbrains.annotations.Nullable;

import java.io.File;
import java.util.List;
import java.util.Map;

public class FilesProcessor {

	private static String joinPath(String path, String path2) {
		return StringUtils.join(new String[]{path, path2}, "/");
	}

	public static void process(final String path, final FilesProcessorHandler handler) {
		FilesExplorer.handle(path, new FilesExplorer.FilesExplorerHandler() {

			@Override
			public void handle(String directory) {
				final String directoryPath = joinPath(path, directory);

				final Map<String, File> attachmentDirectories = Maps.newHashMap();
				final List<File> documents = Lists.newLinkedList();

				FilesExplorer.handle(directoryPath, new FilesExplorer.FilesExplorerHandler() {

					@Override
					public void handle(String fileName) {
						final File file = new File(joinPath(directoryPath, fileName));
						if (file.isDirectory()) {
							attachmentDirectories.put(fileName, file);
						} else {
							documents.add(file);
						}
					}
				});

				final Map<File, File> result = Maps.newLinkedHashMap();
				for (File document : documents) {
					@Nullable File attachment = attachmentDirectories.get(document.getName());
					if (attachment == null) {
						final String[] parts = StringUtils.split(document.getName(), ".");
						if (parts.length > 0) {
							attachment = attachmentDirectories.get(parts[0]);
						}
					}
					result.put(document, attachment);
				}

				for (Map.Entry<File, File> entry : result.entrySet()) {
					handler.handle(entry.getKey(), entry.getValue());
				}
			}
		});
	}

	public static interface FilesProcessorHandler {

		void handle(File file, @Nullable File attachment);
	}
}