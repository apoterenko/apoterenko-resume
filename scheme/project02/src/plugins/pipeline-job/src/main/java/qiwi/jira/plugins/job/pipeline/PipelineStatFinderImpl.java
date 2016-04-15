package qiwi.jira.plugins.job.pipeline;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.search.SearchException;
import com.atlassian.jira.issue.search.SearchProvider;
import com.atlassian.jira.web.bean.PagerFilter;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PipelineStatFinderImpl implements PipelineStatFinder {

	private final SearchProvider searchProvider;
	private final PipelineStatQueryBuilder pipelineStatQueryBuilder;

	@Autowired
	public PipelineStatFinderImpl(
		SearchProvider searchProvider,
		PipelineStatQueryBuilder pipelineStatQueryBuilder
	) {
		this.searchProvider = searchProvider;
		this.pipelineStatQueryBuilder = pipelineStatQueryBuilder;
	}

	@Override
	public List<Issue> find(PipelineStatRequest request, User user) throws SearchException {
		final List<Issue> result = searchProvider.search(
			pipelineStatQueryBuilder.buildQuery(request),
			user,
			PagerFilter.getUnlimitedFilter()
		).getIssues();
		return result == null ? Lists.<Issue>newArrayList() : result;
	}
}