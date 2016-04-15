package qiwi.jira.plugins.job.pipeline;

import com.atlassian.jira.jql.builder.JqlQueryBuilder;
import com.atlassian.query.Query;
import com.atlassian.query.order.SortOrder;
import org.springframework.stereotype.Service;
import qiwi.jira.specific.IssueResolutionType;

import java.util.Date;

import static qiwi.jira.specific.IssueStatus.CLOSED;

@Service("qiwi-pipeline-stat-query-builder")
public class PipelineStatQueryBuilderImpl implements PipelineStatQueryBuilder {

	@Override
	public Query buildQuery(PipelineStatRequest request) {
		return JqlQueryBuilder
			.newBuilder()
			.orderBy()
			.issueKey(SortOrder.ASC)
			.endOrderBy()
			.where()
			.project(request.getProjectId())
			.and()
			.updatedBetween(
				new Date(request.getFrom()),
				new Date(request.getTo())
			)
			.and()
			.status(CLOSED.value())
			.and()
			.resolution().eq().string(IssueResolutionType.FIXED.value())
			.buildQuery();
	}
}