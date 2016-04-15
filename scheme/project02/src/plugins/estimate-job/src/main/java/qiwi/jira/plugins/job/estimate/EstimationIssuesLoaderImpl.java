package qiwi.jira.plugins.job.estimate;

import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.link.IssueLink;
import com.atlassian.jira.issue.link.IssueLinkManager;
import com.google.common.base.Functions;
import com.google.common.collect.Collections2;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import qiwi.jira.specific.DevelopmentProjectKey;
import qiwi.jira.specific.IssueStatus;
import qiwi.jira.util.EnumHelper;
import qiwi.jira.specific.IssueLinkType;

import java.util.Collections;
import java.util.List;
import java.util.Set;

@Service("qiwi-estimation-issues-loader")
public class EstimationIssuesLoaderImpl implements EstimationIssuesLoader {

	private final IssueLinkManager issueLinkManager;

	@Autowired
	public EstimationIssuesLoaderImpl(
		IssueLinkManager issueLinkManager
	) {
		this.issueLinkManager = issueLinkManager;
	}

	@Override
	public List<Issue> getBlockingIssues(Issue issue) {
		final List<Issue> blockingIssues = Lists.newLinkedList();
		for (IssueLink link : issueLinkManager.getInwardLinks(issue.getId())) {
			final Issue source = link.getSourceObject();
			if (isDependencyLinkType(link) && isActualDependency(source)) {
				blockingIssues.add(source);
			}
		}
		return blockingIssues;
	}

	@Override
	public List<Issue> getImplementationIssues(Issue issue) {
		final List<Issue> developmentIssues = Lists.newLinkedList();
		for (IssueLink outwardLink : issueLinkManager.getOutwardLinks(issue.getId())) {
			final Issue destination = outwardLink.getDestinationObject();
			if (isImplementationLinkType(outwardLink) &&
				isActualDependency(destination) &&
				EnumHelper.exists(destination.getProjectObject().getKey(), DevelopmentProjectKey.class)) {
				developmentIssues.add(destination);
			}
		}
		return developmentIssues;
	}

	private boolean isActualDependency(Issue linkedIssue) {
		return !COMPLETED_STATUSES.contains(linkedIssue.getStatusObject().getName());
	}

	private boolean isImplementationLinkType(IssueLink issueLink) {
		return IssueLinkType.IMPLEMENTATION.value().equals(issueLink.getIssueLinkType().getName());
	}

	private boolean isDependencyLinkType(IssueLink issueLink) {
		return IssueLinkType.DEPENDENCY.value().equals(issueLink.getIssueLinkType().getName());
	}

	private static final Set<String> COMPLETED_STATUSES = Collections.unmodifiableSet(
		Sets.newHashSet(
			Collections2.transform(
				IssueStatus.COMPLETED, Functions.toStringFunction()
			)
		)
	);
}