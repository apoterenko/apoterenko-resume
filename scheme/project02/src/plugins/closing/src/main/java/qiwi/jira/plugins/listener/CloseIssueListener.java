package qiwi.jira.plugins.listener;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.jira.ComponentManager;
import com.atlassian.jira.event.issue.AbstractIssueEventListener;
import com.atlassian.jira.event.issue.IssueEvent;
import com.atlassian.jira.event.issue.IssueEventListener;
import com.atlassian.jira.issue.MutableIssue;
import com.atlassian.jira.issue.comments.CommentManager;
import com.atlassian.jira.issue.link.IssueLink;
import com.atlassian.jira.issue.link.IssueLinkManager;
import com.atlassian.jira.util.ImportUtils;
import com.atlassian.jira.util.JiraUtils;
import com.atlassian.jira.workflow.WorkflowTransitionUtil;
import com.atlassian.jira.workflow.WorkflowTransitionUtilImpl;
import com.google.common.collect.Lists;
import com.opensymphony.workflow.loader.ActionDescriptor;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import qiwi.jira.specific.IssueStatus;
import qiwi.jira.specific.IssueType;
import qiwi.jira.specific.ProjectName;

import java.util.List;


public class CloseIssueListener extends AbstractIssueEventListener implements IssueEventListener {
	private static final int WORKFLOW_ID = 151;
	private static final String CLOSE_STATUS = "1";

	private final ComponentManager componentManager;
	private final IssueLinkManager issueLinkManager;


	public CloseIssueListener(){
		componentManager = ComponentManager.getInstance();
		issueLinkManager = componentManager.getIssueLinkManager();
	}

	@Override
	public void workflowEvent(IssueEvent event) {
		boolean checkEventType = componentManager.getEventTypeManager().getEventType(event.getEventTypeId()).isSystemEventType();
		String eventIssueStatus = event.getIssue().getStatusObject().getName();

		if (checkEventType && (IssueStatus.CLOSED.value()).equals(eventIssueStatus)) {
			List<MutableIssue> eventLinkIssues = getLinkIssues(event.getIssue().getId());

			for (MutableIssue eventLinkIssue : eventLinkIssues) {
				if ((ProjectName.SYSTEMS_ANALYSIS.value()).equals(eventLinkIssue.getProjectObject().getKey()) && (IssueStatus.RESOLVED.value()).equals(eventLinkIssue.getStatusObject().getName())) {
					String typeName = eventLinkIssue.getIssueTypeObject().getName();

					if (isNeedIssueType(typeName)) {
						List<MutableIssue> saLinkIssues = getLinkIssues(eventLinkIssue.getId());

						int i = 0;
						for (MutableIssue saLinkIssue : saLinkIssues) {
							if (!(IssueStatus.CLOSED.value()).equals(saLinkIssue.getStatusObject().getName()) && !(event.getIssue().getKey()).equals(saLinkIssue.getKey())) {
								break;
							}
							if (i == saLinkIssues.size() - 1) {
								createComment(eventLinkIssue, getUserName(eventLinkIssue));
								closeIssue(eventLinkIssue, getUserName(eventLinkIssue));
							}
							i++;
						}
					}
				}
			}
		}
	}

	private boolean isNeedIssueType(String type) {
		return (IssueType.BUG.value().equals(type) || IssueType.TASK.value().equals(type) || IssueType.STORY.value().equals(type) || IssueType.IMPROVEMENT.value().equals(type));
	}

	@NotNull
	private List<MutableIssue> getLinkIssues(Long issueId) {
		List<MutableIssue> linkIssues = Lists.newArrayList();

		List<IssueLink> issueInLinks = issueLinkManager.getInwardLinks(issueId);
		for (IssueLink issueInLink : issueInLinks) {
			MutableIssue issueIn = issueInLink.getSourceObject();
			if (null != issueIn) {
				linkIssues.add(issueIn);
			}
		}

		List<IssueLink> issueOutLinks = issueLinkManager.getOutwardLinks(issueId);
		for (IssueLink issueOutLink : issueOutLinks) {
			MutableIssue issueOut = issueOutLink.getDestinationObject();
			if (issueOut != null) {
				linkIssues.add(issueOut);
			}
		}

		return linkIssues;
	}

	private void closeIssue(MutableIssue issue, String username) {
		boolean wasIndexing = ImportUtils.isIndexIssues();
		ImportUtils.setIndexIssues(true);

		WorkflowTransitionUtil workflowTransitionUtil = JiraUtils.loadComponent(WorkflowTransitionUtilImpl.class);

		workflowTransitionUtil.setIssue(issue);
		workflowTransitionUtil.setUsername(username);
		workflowTransitionUtil.setAction(WORKFLOW_ID);
		issue.setResolutionId(CLOSE_STATUS);

		ActionDescriptor actionDescriptor = workflowTransitionUtil.getActionDescriptor();
		actionDescriptor.setAutoExecute(true);

		workflowTransitionUtil.validate();
		workflowTransitionUtil.progress();

		actionDescriptor.setAutoExecute(false);

		ImportUtils.setIndexIssues(wasIndexing);
	}

	private void createComment(MutableIssue issue, String username) {
		CommentManager commentManager = ComponentManager.getComponentInstanceOfType(CommentManager.class);
		commentManager.create(issue, username, "All issues are closed.", true);
	}

	private String getUserName(MutableIssue issue) {
		@Nullable final User assignedUser = issue.getAssigneeUser();
		final User reporterUser = issue.getReporterUser();

		if (assignedUser != null) {
			return assignedUser.getName();
		} else {
			return reporterUser.getName();
		}
	}
}