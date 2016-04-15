package qiwi.jira.plugins.greenhopper;

import com.atlassian.greenhopper.service.rank.RankIndexService;
import com.atlassian.greenhopper.service.rank.RankService;

public interface SlaveIssueRankingFactory {

	SlaveIssueRanking createSlaveIssueRanking(RankService rankService, RankIndexService rankIndexService);
}
