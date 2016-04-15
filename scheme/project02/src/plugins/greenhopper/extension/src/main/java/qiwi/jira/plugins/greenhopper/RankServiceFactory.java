package qiwi.jira.plugins.greenhopper;

import com.atlassian.greenhopper.service.PermissionService;
import com.atlassian.greenhopper.service.rank.RankCustomFieldService;
import com.atlassian.greenhopper.service.rank.RankIndexService;
import com.atlassian.greenhopper.service.rank.RankService;

public interface RankServiceFactory {

	RankService createRankService(
			RankIndexService rankIndexService,
			RankCustomFieldService rankCustomFieldService);

	RankService createRankService(
			RankIndexService rankIndexService,
			RankCustomFieldService rankCustomFieldService,
			PermissionService permissionService);

	RankService createRankService(
			RankIndexService rankIndexService,
			RankCustomFieldService rankCustomFieldService,
			PermissionService permissionService,
			RankChangeEventDispatcher eventDispatcher);
}
