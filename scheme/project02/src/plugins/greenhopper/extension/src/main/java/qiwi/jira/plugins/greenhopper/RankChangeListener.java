package qiwi.jira.plugins.greenhopper;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.greenhopper.service.rank.RankChange;

public interface RankChangeListener {

	public void onRankChange(RankChange rankChange, RankChangeDirection direction, User user);
}
