package qiwi.jira.plugins.greenhopper;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import qiwi.jira.specific.DevelopmentProjectKey;
import qiwi.jira.util.EnumHelper;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.link.IssueLinkManager;
import com.google.common.base.Predicate;
import com.google.common.collect.Collections2;

@Service("qiwi-greenhopper-slave-issue-factory")
public class SlaveIssueFactoryImpl implements SlaveIssueFactory {

	private static final Predicate<Issue> DEVELOPMENT_PROJECT_ISSUE = new Predicate<Issue>() {
		@Override
		public boolean apply(Issue issue) {
			return EnumHelper.exists(
					issue.getProjectObject().getKey(),
					DevelopmentProjectKey.class);
		}
	};

	@Autowired
	private IssueLinkManager issueLinkManager;

	@Override
	public Collection<Issue> getSlaveIssues(Issue master, User user) {
		return Collections2.filter(
				issueLinkManager.getLinkCollectionOverrideSecurity(master).getAllIssues(),
				DEVELOPMENT_PROJECT_ISSUE);
	}
}
