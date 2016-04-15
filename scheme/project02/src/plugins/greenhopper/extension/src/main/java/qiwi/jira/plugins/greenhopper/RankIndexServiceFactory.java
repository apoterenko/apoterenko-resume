package qiwi.jira.plugins.greenhopper;

import com.atlassian.greenhopper.service.rank.RankDao;
import com.atlassian.greenhopper.service.rank.RankIndexService;

public interface RankIndexServiceFactory {

	RankIndexService createRankIndexService(RankDao rankDao);
}
