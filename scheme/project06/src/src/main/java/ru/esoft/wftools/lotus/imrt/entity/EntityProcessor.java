package ru.esoft.wftools.lotus.imrt.entity;

import com.google.common.collect.Lists;
import org.apache.commons.lang.mutable.MutableInt;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.esoft.wftools.lotus.imrt.file.FilesProcessor;
import ru.esoft.wftools.lotus.imrt.entity.element.Entity;

import java.io.File;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;

public class EntityProcessor {

	private static final Logger log = LoggerFactory.getLogger(EntityProcessor.class);

	public static void process(
			String path,
			final EntityProcessorHandler entityHandler,
			FilesProcessor.FilesProcessorHandler errorHandler) {

		final Map<Entity, File[]> entities = new LinkedHashMap<Entity, File[]>(BATCH_COUNT);
		final Collection<File[]> failureFiles = Lists.newLinkedList();

		final Counter counter = new Counter();

		FilesProcessor.process(path, new FilesProcessor.FilesProcessorHandler() {

			@Override
			public void handle(File file, @Nullable File attachment) {
				if (!counter.check()) {
					entityHandler.handle(entities);
					counter.reset();
					entities.clear();
				}

				final @Nullable Entity entity = toEntity(file);
				if (entity != null) {
					entities.put(entity, new File[]{file, attachment});
				} else {
					failureFiles.add(new File[]{file, attachment});
				}
				counter.increment();
			}
		});

		if (!entities.isEmpty()) {
			entityHandler.handle(entities);
		}

		for (File[] files : failureFiles) {
			errorHandler.handle(files[0], files[1]);
		}
	}

	@Nullable
	private static Entity toEntity(File file) {
		try {
			return EntityBuilder.toEntity(file);
		} catch (Exception e) {
			log.error("EntityProcessor file processing exception: " + file, e);
		}
		return null;
	}

	public static interface EntityProcessorHandler {

		void handle(Map<Entity, File[]> entities);
	}

	private static class Counter extends MutableInt {

		void reset() {
			setValue(0);
		}

		boolean check() {
			return this.intValue() < BATCH_COUNT;
		}
	}

	public final static int BATCH_COUNT = 1000;
}