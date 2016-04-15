package qiwi.jira.plugins.greenhopper;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.greenhopper.service.rank.RankChange;

public interface RankChangeEventDispatcher {

	public void fireRankChangeEvent(RankChange rankChange, RankChangeDirection direction, User user);

	public void addRankChangeListener(RankChangeListener listener);

	public void removeRankChangeListener(RankChangeListener listener);
}
