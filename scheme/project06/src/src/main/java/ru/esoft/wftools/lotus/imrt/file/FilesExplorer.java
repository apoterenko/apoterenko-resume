package ru.esoft.wftools.lotus.imrt.file;

import com.google.common.collect.Lists;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

class FilesExplorer {

	private static final Logger log = LoggerFactory.getLogger(FilesExplorer.class);

	static void handle(String path, FilesExplorerHandler handler) {
		final File file = new File(path);
		final @Nullable String[] listFileNames = file.list();

		if (listFileNames == null) {
			log.warn("List of files to the path [PATH_EMPTY_LIST:{{}}] processed", path);
			return;
		}

		final List<String> names = Lists.newArrayList(listFileNames);
		Collections.sort(names, new Comparator<String>() {

			@Override
			public int compare(String o1, String o2) {
				return o1.compareTo(o2);
			}
		});

		for (String name : names) {
			handler.handle(name);
		}

		log.info("Path [PATH_SUCCESS:{{}}] processed success", path);
	}

	public static interface FilesExplorerHandler {

		void handle(String fileName);
	}
}