package qiwi.jira.plugins.pipeline;

import com.google.common.collect.ImmutableMap;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static qiwi.jira.plugins.pipeline.PipelineFieldAccessorEnum.ID;
import static qiwi.jira.plugins.pipeline.PipelineFieldAccessorEnum.VIEW;

@Service("qiwi-pipeline-field-accessor")
public class PipelineFieldAccessorImpl implements PipelineFieldAccessor {

	private final Map<PipelineFieldAccessorEnum, Pattern> patterns = ImmutableMap.<PipelineFieldAccessorEnum, Pattern>builder()
		.put(ID, Pattern.compile("^id([0-9]+)$"))
		.put(VIEW, Pattern.compile("^view([0-9]+)$"))
		.build();

	@Override
	public Long getValue(PipelineFieldAccessorEnum pipelineFieldAccessorEnum, String key) {
		final Matcher matcher = patterns.get(pipelineFieldAccessorEnum).matcher(key);
		if (matcher.find() && matcher.groupCount() > 0) {
			try {
				return Long.parseLong(matcher.group(1));
			} catch (Exception e) {
				return null;
			}
		}
		return null;
	}
}
