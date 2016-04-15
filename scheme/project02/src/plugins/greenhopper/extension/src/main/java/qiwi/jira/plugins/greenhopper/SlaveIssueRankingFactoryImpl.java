package qiwi.jira.plugins.greenhopper;

import com.atlassian.greenhopper.service.rank.RankEntryFactoryImpl;
import com.atlassian.greenhopper.service.rank.RankIndexService;
import com.atlassian.greenhopper.service.rank.RankService;
import com.atlassian.jira.issue.IssueManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static qiwi.jira.util.BeanHelper.setField;

@Service
public class SlaveIssueRankingFactoryImpl implements SlaveIssueRankingFactory {

	@Autowired
	private IssueManager issueManager;
	@Autowired
	private MasterIssueFactory masterIssueFactory;
	@Autowired
	private SlaveIssueFactory slaveIssueFactory;

	@Override
	public SlaveIssueRanking createSlaveIssueRanking(RankService rankService, RankIndexService rankIndexService) {
		final SlaveIssueRanking slaveIssueRanking = new SlaveIssueRanking();
		final RankEntryFactory rankEntryFactory = new RankEntryFactoryImpl(rankIndexService);
		setField(slaveIssueRanking, "issueManager", issueManager);
		setField(slaveIssueRanking, "masterIssueFactory", masterIssueFactory);
		setField(slaveIssueRanking, "slaveIssueFactory", slaveIssueFactory);
		setField(slaveIssueRanking, "rankEntryFactory", rankEntryFactory);
		slaveIssueRanking.setRankService(rankService);
		slaveIssueRanking.setRankEntryFactory(rankEntryFactory);
		return slaveIssueRanking;
	}
}
