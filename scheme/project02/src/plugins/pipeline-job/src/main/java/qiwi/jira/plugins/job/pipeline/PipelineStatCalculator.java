package qiwi.jira.plugins.job.pipeline;

import com.atlassian.jira.issue.Issue;

import java.util.List;

public interface PipelineStatCalculator {

	double calculate(List<Issue> issues);
}