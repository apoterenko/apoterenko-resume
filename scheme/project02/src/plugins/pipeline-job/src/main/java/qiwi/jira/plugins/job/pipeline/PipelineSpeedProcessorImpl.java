package qiwi.jira.plugins.job.pipeline;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.search.SearchException;
import org.joda.time.DurationFieldType;
import org.joda.time.MutableDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("qiwi-pipeline-speed-processor")
public class PipelineSpeedProcessorImpl implements PipelineSpeedProcessor {

	private final PipelineStatCalculator pipelineStat;
	private final PipelineStatFinder pipelineStatFinder;

	@Autowired
	public PipelineSpeedProcessorImpl(
		PipelineStatCalculator pipelineStat,
		PipelineStatFinder pipelineStatFinder
	) {
		this.pipelineStat = pipelineStat;
		this.pipelineStatFinder = pipelineStatFinder;
	}

	@Override
	public double process(long projectId, User user) throws SearchException {
		final long to = System.currentTimeMillis();
		final MutableDateTime from = new MutableDateTime(to);
		from.add(DurationFieldType.months(), -PipelineStatConstants.TOTAL_MONTH_COUNT);
		return pipelineStat.calculate(findIssues(projectId, user, from.getMillis(), to)) /
			PipelineStatConstants.TOTAL_MONTH_COUNT;
	}

	private List<Issue> findIssues(long projectId, User user, long from, long to) throws SearchException {
		return pipelineStatFinder.find(
			new PipelineStatRequest()
				.setProjectId(projectId)
				.setFrom(from)
				.setTo(to),
			user
		);
	}
}