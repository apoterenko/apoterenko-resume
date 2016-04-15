package qiwi.jira.plugins.greenhopper;

import static qiwi.jira.util.BeanHelper.setField;

import com.atlassian.greenhopper.service.rank.*;
import com.atlassian.greenhopper.upgrade.UpgradeVersionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("qiwi-rank-index-service-factory")
public class RankIndexServiceFactoryImpl implements RankIndexServiceFactory {

	@Autowired
	private RankCustomFieldService rankCustomFieldService;
	@Autowired
	private UpgradeVersionService upgradeVersionService;

	@Override
	public RankIndexService createRankIndexService(RankDao rankDao) {
		final RankIndexService rankIndexService = new RankIndexServiceImpl();
		setField(rankIndexService, "rankDao", rankDao);
		setField(rankIndexService, "rankCustomFieldService", rankCustomFieldService);
		setField(rankIndexService, "upgradeVersionService", upgradeVersionService);
		return rankIndexService;
	}
}
