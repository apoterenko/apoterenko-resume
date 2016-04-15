package qiwi.jira.plugins.estimate;

import java.util.Collections;
import java.util.List;

import com.atlassian.jira.issue.Issue;
import com.google.common.collect.Lists;

public class ProjectEstimationException extends Exception {

	private static final long serialVersionUID = 3328624044279415362L;

	private List<Issue> blockedIssuesChain;

	public ProjectEstimationException() {
	}

	public ProjectEstimationException(String message, Throwable cause) {
		super(message, cause);
	}

	public ProjectEstimationException(String message) {
		super(message);
	}

	public ProjectEstimationException(Throwable cause) {
		super(cause);
	}

	public List<Issue> getBlockedIssuesChain() {
		return blockedIssuesChain == null ?
				Collections.<Issue>emptyList() :
				Collections.<Issue>unmodifiableList(blockedIssuesChain);
	}

	List<Issue> provideBlockedIssuesChain() {
		if (blockedIssuesChain == null) {
			blockedIssuesChain = Lists.newLinkedList();
		}
		return blockedIssuesChain;
	}

	void addBlockedIssue(Issue issue) {
		provideBlockedIssuesChain().add(issue);
	}

	void setBlockedIssuesChain(List<Issue> blockedIssuesChain) {
		this.blockedIssuesChain = blockedIssuesChain;
	}
}
