package qiwi.jira.plugins.greenhopper;

import static qiwi.jira.util.BeanHelper.setField;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atlassian.greenhopper.service.PermissionService;
import com.atlassian.greenhopper.service.rank.RankCustomFieldService;
import com.atlassian.greenhopper.service.rank.RankIndexService;
import com.atlassian.greenhopper.service.rank.RankService;

@Service("qiwi-rank-service-factory")
public class RankServiceFactoryImpl implements RankServiceFactory {
	@Autowired
	private PermissionService permissionService;
	@Autowired
	private SlaveIssueRankingFactory slaveIssueRankingFactory;

	protected RankService newRankService(
			RankIndexService rankIndexService,
			RankCustomFieldService rankCustomFieldService,
			PermissionService permissionService,
			RankChangeEventDispatcher eventDispatcher) {
		final QiwiRankServiceImpl rankService = new QiwiRankServiceImpl();
		setField(rankService, "rankIndexService", rankIndexService);
		setField(rankService, "rankCustomFieldService", rankCustomFieldService);
		setField(rankService, "permissionService", permissionService);
		setField(rankService, "eventDispatcher", eventDispatcher);
		return rankService;
	}

	@Override
	public RankService createRankService(
			RankIndexService rankIndexService,
			RankCustomFieldService rankCustomFieldService) {
		return createRankService(rankIndexService, rankCustomFieldService, permissionService);
	}

	@Override
	public RankService createRankService(
			RankIndexService rankIndexService,
			RankCustomFieldService rankCustomFieldService,
			PermissionService permissionService) {
		final RankChangeEventDispatcher eventDispatcher = new RankChangeEventDispatcherImpl();
		final RankService rankService = newRankService(rankIndexService, rankCustomFieldService, permissionService, eventDispatcher);
		final SlaveIssueRanking slaveIssueRanking = slaveIssueRankingFactory.createSlaveIssueRanking(rankService, rankIndexService);
		eventDispatcher.addRankChangeListener(slaveIssueRanking);
		return rankService;
	}

	@Override
	public RankService createRankService(
			RankIndexService rankIndexService,
			RankCustomFieldService rankCustomFieldService,
			PermissionService permissionService,
			RankChangeEventDispatcher eventDispatcher) {
		return newRankService(rankIndexService, rankCustomFieldService, permissionService, eventDispatcher);
	}
}
