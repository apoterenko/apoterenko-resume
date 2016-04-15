package ru.esoft.wftools.lotus.imrt.sql.impl;

import org.apache.commons.lang.StringUtils;
import ru.esoft.wftools.lotus.imrt.entity.element.Entity;
import ru.esoft.wftools.lotus.imrt.file.Transliterate;

public class FileColumnNameBuilder {

	private static String absolutePath;

	public static void setAbsolutePath(String absolutePath) {
		FileColumnNameBuilder.absolutePath = absolutePath;
	}

	public static String toAbsoluteFileName(String fileName, Entity entity, int districtId) {
		return StringUtils.join(
				new String[]{
						absolutePath,
						String.valueOf(districtId),
						String.valueOf(entity.getFileLevel()),
						entity.getDate(),
						entity.getUnid(),
						Transliterate.translate(String.valueOf(fileName))
				}, "/"
		);
	}
}