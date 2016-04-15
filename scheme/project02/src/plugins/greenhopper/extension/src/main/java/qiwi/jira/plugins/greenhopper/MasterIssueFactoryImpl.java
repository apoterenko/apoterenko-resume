package qiwi.jira.plugins.greenhopper;

import java.util.Iterator;

import com.atlassian.greenhopper.service.rank.RankService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.IssueManager;
import com.atlassian.jira.jql.builder.JqlQueryBuilder;
import com.google.common.collect.AbstractIterator;

@Service("qiwi-greenhopper-master-issue-factory")
public class MasterIssueFactoryImpl implements MasterIssueFactory {
	private static final transient Logger log = LoggerFactory.getLogger(MasterIssueFactoryImpl.class);

	private static final String SA_PROJECT_KEY = "SA";

	@Autowired
	private IssueManager issueManager;
	@Autowired
	private RankedIssuesFactory rankedIssuesFactory;

	@Override
	public boolean isMasterIssue(Issue issue) {
		return SA_PROJECT_KEY.equals(issue.getProjectObject().getKey());
	}

	@Override
	public Iterable<Issue> getMasterIssues(
			final Issue referenceMaster,
			final Long rankFieldId, final RankChangeDirection direction,
			final User user,
			final RankService rankService,
			final RankEntryFactory rankEntryFactory) {
		final String projectKey = referenceMaster.getProjectObject().getKey();
		final RankEntry rankEntry = rankEntryFactory.getRankEntry(rankFieldId, referenceMaster.getId(), direction);

		return new Iterable<Issue>() {
			@Override
			public Iterator<Issue> iterator() {
				return new MasterIssueIterator(projectKey, rankEntry, direction, rankFieldId, user, rankService);
			}
		};
	}


	class IssueOfRankIterator extends AbstractIterator<Issue> {
		private final String projectKey;
		private RankEntry rankEntry;

		IssueOfRankIterator(String projectKey, RankEntry rankEntry) {
			this.projectKey = projectKey;
			this.rankEntry = rankEntry;
		}

		long getRankPosition() {
			return rankEntry.getPosition();
		}

		@Override
		protected Issue computeNext() {
			Issue issue;
			do {
				RankEntry next = rankEntry.getNext();
				if (next == null) {
					return endOfData();
				}
				rankEntry = next;
				issue = issueManager.getIssueObject(next.getId());
				if (issue == null) {
					log.warn("Issue by id {} is null!", next.getId());
				}
			} while (issue == null);

			return projectKey.equals(issue.getProjectObject().getKey()) ? issue : endOfData();
		}
	}


	class MasterIssueIterator extends AbstractIterator<Issue> {
		private final String projectKey;
		private final IssueOfRankIterator issueOfRankIterator;

		private final RankChangeDirection direction;
		private final Long rankFieldId;
		private final User user;
		private Iterator<Issue> sortedByRankIssues;
		private final RankService rankService;

		MasterIssueIterator(
				String projectKey,
				RankEntry rankEntry,
				RankChangeDirection direction,
				Long rankFieldId,
				User user,
				RankService rankService
			) {
			this.projectKey = projectKey;
			this.issueOfRankIterator = new IssueOfRankIterator(projectKey, rankEntry);
			this.direction = direction;
			this.rankFieldId = rankFieldId;
			this.user = user;
			this.rankService = rankService;
		}

		@Override
		protected Issue computeNext() {
			if (issueOfRankIterator.hasNext()) {
				return issueOfRankIterator.next();
			}

			if (sortedByRankIssues == null) {
				sortedByRankIssues = rankedIssuesFactory.getRankedIssues(
						rankFieldId, issueOfRankIterator.getRankPosition(), direction,
						JqlQueryBuilder.newClauseBuilder().project(projectKey),
						user, rankService)
					.iterator();
			}

			return sortedByRankIssues.hasNext() ? sortedByRankIssues.next() : endOfData();
		}
	}
}
