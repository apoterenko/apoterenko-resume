package qiwi.jira.plugins.job.pipeline;

import com.atlassian.jira.issue.Issue;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("qiwi-pipeline-stat-calculator")
public class PipelineStatCalculatorImpl implements PipelineStatCalculator {

	private static final int MAN_DAY_AT_SECONDS = 8 * 60 * 60;

	@Override
	public double calculate(List<Issue> issues) {
		double totalOriginalEstimate = 0;
		for (final Issue issue : issues) {
			final Long originalEstimate = issue.getOriginalEstimate();
			if (originalEstimate == null) {
				continue;
			}
			totalOriginalEstimate += originalEstimate;
		}
		return totalOriginalEstimate / MAN_DAY_AT_SECONDS;
	}
}