package qiwi.jira.plugins.planning;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.greenhopper.service.ServiceOutcome;
import com.atlassian.greenhopper.service.rank.RankChange;
import com.atlassian.greenhopper.service.rank.RankCustomFieldService;
import com.atlassian.jira.issue.fields.CustomField;
import com.atlassian.jira.util.NotNull;
import com.atlassian.query.Query;

import java.util.List;

class RankCustomFieldServiceWrapper implements RankCustomFieldService {

	private final RankCustomFieldService rankCustomFieldService;

	public RankCustomFieldServiceWrapper(RankCustomFieldService rankCustomFieldService) {
		this.rankCustomFieldService = rankCustomFieldService;
	}

	@Override
	public CustomField getDefaultRankField() {
		return rankCustomFieldService.getDefaultRankField();
	}

	@Override
	public void addChangeItem(User user, RankChange rankChange) {
	}

	@Override
	public boolean isRankField(CustomField customField) {
		return rankCustomFieldService.isRankField(customField);
	}

	@Override
	public boolean isRankField(long l) {
		return rankCustomFieldService.isRankField(l);
	}

	@Override
	@NotNull
	public ServiceOutcome<CustomField> getSortedByRankField(Query query) {
		return rankCustomFieldService.getSortedByRankField(query);
	}

	@Override
	public boolean isSortedByRankField(Query query) {
		return rankCustomFieldService.isSortedByRankField(query);
	}

	@Override
	public List<CustomField> getRankFields() {
		return rankCustomFieldService.getRankFields();
	}
}
