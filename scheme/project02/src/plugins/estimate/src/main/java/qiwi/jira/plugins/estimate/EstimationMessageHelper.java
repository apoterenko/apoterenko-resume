package qiwi.jira.plugins.estimate;

import java.util.List;

import com.atlassian.jira.issue.Issue;
import com.google.common.base.Function;
import com.google.common.collect.Collections2;

public class EstimationMessageHelper {

	public static String makeEstimationProblemMessage(EstimationException e) {
		final List<ProjectEstimationException> causes = e.getCauses();
		final StringBuilder builder = new StringBuilder();

		int problemNumber = 1;
		for (ProjectEstimationException cause : causes) {
			builder
				.append(problemNumber++).append(". ")
				.append(cause.getMessage());

			final List<Issue> issueChain = cause.getBlockedIssuesChain();
			if (issueChain != null && !issueChain.isEmpty()) {
				builder
					.append(", issue chain: ")
					.append(Collections2.transform(
						issueChain,
						new Function<Issue, String>() {
							@Override
							public String apply(Issue from) {
								return from.getKey();
							}
						}));
			}

			builder.append('\n');
		}

		return builder.toString();
	}
}
