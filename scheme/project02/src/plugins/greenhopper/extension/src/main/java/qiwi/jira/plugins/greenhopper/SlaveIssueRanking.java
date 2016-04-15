package qiwi.jira.plugins.greenhopper;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.greenhopper.service.rank.RankChange;
import com.atlassian.greenhopper.service.rank.RankService;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.IssueManager;
import com.google.common.base.Predicate;
import com.google.common.collect.Collections2;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;

@Service("qiwi-slave-issue-ranking")
public class SlaveIssueRanking implements RankChangeListener {
	private static final transient Logger log = LoggerFactory.getLogger(SlaveIssueRanking.class);

	@Autowired
	private IssueManager issueManager;
	@Autowired
	private MasterIssueFactory masterIssueFactory;
	@Autowired
	private SlaveIssueFactory slaveIssueFactory;
	@Autowired
	private RankEntryFactory rankEntryFactory;
	@Autowired
	private RankService rankService;

	public void setRankService(RankService rankService) {
		checkNotNull(rankService);
		this.rankService = rankService;
	}

	public void setRankEntryFactory(RankEntryFactory rankEntryFactory) {
		checkNotNull(rankEntryFactory);
		this.rankEntryFactory = rankEntryFactory;
	}

	@Override
	public void onRankChange(RankChange rankChange, RankChangeDirection direction, final User user) {
		switch (rankChange.getType()) {
		case MOVE:
			break;
		default:
			return;
		}

		final long rankFieldId = rankChange.getCustomFieldId();
		final Issue issue = issueManager.getIssueObject(rankChange.getIssueId());

		if (masterIssueFactory.isMasterIssue(issue)) {
			final Collection<Issue> slaveIssues = slaveIssueFactory.getSlaveIssues(issue, user);
			if (slaveIssues.isEmpty()) {
				return;
			}

			final Set<String> projectKeys = getProjectKeys(slaveIssues);

			if (log.isDebugEnabled()) {
				log.debug("Issues to rank: {}, affected projects: {}",
						Collections2.transform(slaveIssues, ToStringFunctions.ISSUE),
						projectKeys
					);
			}

			for (final Issue master : masterIssueFactory.getMasterIssues(issue, rankFieldId, direction, user, rankService, rankEntryFactory)) {

				final Collection<Issue> allLinkedIssues =
						slaveIssueFactory.getSlaveIssues(master, user);
					//	issueLinkManager.getLinkCollection(master, user).getAllIssues();
				if (allLinkedIssues.isEmpty()) {
					continue;
				}

				final Collection<Issue> linkedIssues = Collections2.filter(
						allLinkedIssues,
						new Predicate<Issue>() {
							@Override
							public boolean apply(Issue issue) {
								return projectKeys.contains(issue.getProjectObject().getKey());
							}
						});

				if (log.isDebugEnabled()) {
					log.debug("Issues related with {}: {}",
							master.getKey(),
							linkedIssues
						);
				}

				for (Issue slave : linkedIssues) {
					final String slaveProjectKey = slave.getProjectObject().getKey();

					// We can't remove slaveProjectKey from projectKeys here because it breaks predicate for linkedIssues.
					if (!projectKeys.contains(slaveProjectKey)) {
						continue;
					}

					if (log.isDebugEnabled()) {
						log.debug("Update related issues of project: {}", slaveProjectKey);
					}

					final Issue targetIssue = getTargetIssue(linkedIssues, slaveProjectKey, rankFieldId, direction);
					// Removing of slaveProjectKey from projectKeys here allowed
					// because no further iterations through linkedIssues in this cycle iteration.
					projectKeys.remove(slaveProjectKey);
					if (targetIssue == null) {
						log.warn("Target issue is null!");
						continue;
					}

					final List<Issue> issuesOfProject = getIssuesOfProject(slaveIssues, slaveProjectKey, targetIssue);
					if (issuesOfProject.isEmpty()) {
						continue;
					}

					log.info("Rank issues {} {} issue: {}", new Object[] {
							Lists.transform(issuesOfProject, ToStringFunctions.ISSUE),
							direction,
							targetIssue.getKey()
					});

					switch (direction) {
					case BEFORE:
						rankService.rankBefore(user, rankFieldId, issuesOfProject, targetIssue);
						break;
					case AFTER:
						rankService.rankAfter(user, rankFieldId, issuesOfProject, targetIssue);
						break;
					}
				}

				if (projectKeys.isEmpty()) {
					break;
				}
			}
		}
	}

	protected Set<String> getProjectKeys(Collection<Issue> issues) {
		final Set<String> projectKeys = Sets.newHashSet();
		for (Issue issue : issues) {
			projectKeys.add(issue.getProjectObject().getKey());
		}
		return projectKeys;
	}

	protected RankEntry getNextRankEntry(RankChange rankChange, RankChangeDirection direction) {
		return rankEntryFactory.getRankEntry(rankChange.getCustomFieldId(), rankChange.getIssueId(), direction);
	}

	protected List<Issue> getIssuesOfProject(Collection<Issue> issues, String projectKey, Issue targetIssue) {
		final List<Issue> result = Lists.newArrayList();
		for (Issue issue : issues) {
			if (projectKey.equals(issue.getProjectObject().getKey())
				&& !targetIssue.equals(issue)) {
				result.add(issue);
			}
		}
		return result;
	}

	private Issue getTargetIssue(Iterable<Issue> issues, String projectKey, Long rankFieldId, RankChangeDirection direction) {
		if (log.isTraceEnabled()) {
			log.trace("Target issue candidates count: {}", Iterables.size(issues));
		}

		Issue result = null;
		RankEntry rank = null;
		for (Issue issue : issues) {
			String issueProjectKey = issue.getProjectObject().getKey();

			if (!projectKey.equals(issueProjectKey)) {
				if (log.isTraceEnabled()) {
					log.trace("Skipping issue {}, not of project {}", issue.getKey(), projectKey);
				}
				continue;
			}

			if (rank == null) {
				rank = rankEntryFactory.getRankEntry(rankFieldId, issue.getId(), direction);
				if (rank == null) {
					log.warn("Issue not ranked: {}", issue.getKey());
					continue;
				}
				result = issue;
				if (log.isTraceEnabled()) {
					log.trace("Initializing target issue by {} with rank {}", issue.getKey(), rank.getPosition());
				}
			} else {
				RankEntry nextRank = rankEntryFactory.getRankEntry(rankFieldId, issue.getId(), direction);
				if (nextRank.isBefore(rank)) {
					rank = nextRank;
					result = issue;
					if (log.isTraceEnabled()) {
						log.trace("Updating target issue by {} with rank {}", issue.getKey(), rank.getPosition());
					}
				}
			}
		}
		if (log.isDebugEnabled()) {
			log.debug("Target issue: {}", result == null ? null : result.getKey());
		}
		return result;
	}
}
