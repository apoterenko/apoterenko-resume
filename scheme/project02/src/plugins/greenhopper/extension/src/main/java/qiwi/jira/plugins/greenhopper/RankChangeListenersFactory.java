package qiwi.jira.plugins.greenhopper;

import java.util.List;

import com.atlassian.jira.util.NotNull;

public interface RankChangeListenersFactory {

	@NotNull
	public List<RankChangeListener> getRankChangeListeners();
}
