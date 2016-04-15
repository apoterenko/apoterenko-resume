package qiwi.jira.plugins.greenhopper;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.greenhopper.service.rank.RankService;
import com.atlassian.jira.issue.CustomFieldManager;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.fields.CustomField;
import com.atlassian.jira.issue.search.SearchException;
import com.atlassian.jira.issue.search.SearchProvider;
import com.atlassian.jira.jql.builder.JqlClauseBuilder;
import com.atlassian.jira.jql.builder.JqlQueryBuilder;
import com.atlassian.jira.web.bean.PagerFilter;
import com.atlassian.query.Query;
import com.atlassian.query.order.SortOrder;
import com.google.common.base.Predicate;
import com.google.common.collect.Collections2;

@Service("qiwi-ranked-issues-factory")
public class RankedIssuesFactoryImpl implements RankedIssuesFactory {
	private static final transient Logger log = LoggerFactory.getLogger(RankedIssuesFactoryImpl.class);

	@Autowired
	private CustomFieldManager customFieldManager;
	@Autowired
	private SearchProvider searchProvider;

	@Override
	public Collection<Issue> getRankedIssues(
			long rankFieldId, long rankPosition, RankChangeDirection direction,
			JqlClauseBuilder clauseBuilder, User user, RankService rankService) {
		final CustomField rankField = customFieldManager.getCustomFieldObject(rankFieldId);
		final Query searchQuery = JqlQueryBuilder.newBuilder()
			.where()
				.addClause(clauseBuilder.buildClause())
			.endWhere()
			.orderBy()
				.addSortForFieldName(
						rankField.getName(),
						direction == RankChangeDirection.BEFORE ?
								SortOrder.ASC :
								SortOrder.DESC,
						false)
			.endOrderBy()
			.buildQuery();

		final List<Issue> foundIssues = searchIssues(searchQuery, user);

		final Issue last = foundIssues.get(foundIssues.size() - 1);
		final Long lastIssuePosition = getIssuePosition(rankFieldId, last, rankService);

		if (log.isDebugEnabled()) {
			log.debug(
					"Getting ranked issues, direction: {}, rank: {}, lastFoundRank: {}",
					new Object[] {
							direction,
							rankPosition,
							lastIssuePosition
					});
		}

		if (lastIssuePosition != null) {
			switch (direction) {
			case BEFORE:
				if (lastIssuePosition <= rankPosition) {
					return Collections.emptyList();
				}
				break;
			case AFTER:
				if (lastIssuePosition >= rankPosition) {
					return Collections.emptyList();
				}
				break;
			}
		}

		Collection<Issue> rankedIssues = Collections2.filter(
				foundIssues,
				new RankingPredicate(rankFieldId, rankPosition, direction, rankService));

		if (log.isDebugEnabled()) {
			log.debug("Ranked issues: {}", Collections2.transform(rankedIssues, ToStringFunctions.ISSUE));
		}

		return rankedIssues;
	}


	private List<Issue> searchIssues(Query searchQuery, User user) {
		try {
			return searchProvider.search(searchQuery, user, PagerFilter.getUnlimitedFilter()).getIssues();
		} catch (SearchException e) {
			log.error("Issue search error", e);
			return java.util.Collections.emptyList();
		}
	}

	private Long getIssuePosition(long rankFieldId, Issue issue, RankService rankService) {
		return rankService.getIssuePosition(rankFieldId, issue).getValue();
	}


	private class RankingPredicate implements Predicate<Issue> {

		private final long rankFieldId;
		private final long rankPosition;
		private final RankChangeDirection direction;
		private final RankService rankService;

		RankingPredicate(long rankFieldId, long rankPosition, RankChangeDirection direction, RankService rankService) {
			this.rankFieldId = rankFieldId;
			this.rankPosition = rankPosition;
			this.direction = direction;
			this.rankService = rankService;
		}

		@Override
		public boolean apply(Issue issue) {
			Long issuePosition = getIssuePosition(rankFieldId, issue, rankService);
			if (issuePosition == null) {
				log.warn("Issue {} has no rank!", issue.getKey());
				return false;
			}

			switch (direction) {
			case BEFORE:
				return issuePosition > rankPosition;
			case AFTER:
				return issuePosition < rankPosition;
			default:
				log.warn("Illegal direction: {}", direction);
				return false;
			}
		}
	}
}
