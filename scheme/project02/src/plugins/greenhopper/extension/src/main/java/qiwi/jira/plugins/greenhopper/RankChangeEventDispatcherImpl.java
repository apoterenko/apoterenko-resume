package qiwi.jira.plugins.greenhopper;

import java.util.List;

import org.springframework.stereotype.Service;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.greenhopper.service.rank.RankChange;
import com.google.common.collect.Lists;

@Service("qiwi-greenhopper-rank-change-event-dispatcher")
public class RankChangeEventDispatcherImpl implements RankChangeEventDispatcher {

	private final List<RankChangeListener> listeners = Lists.newLinkedList();

	@Override
	public void fireRankChangeEvent(RankChange rankChange, RankChangeDirection direction, User user) {
		for (RankChangeListener listener : listeners) {
			listener.onRankChange(rankChange, direction, user);
		}
	}

	@Override
	public void addRankChangeListener(RankChangeListener listener) {
		listeners.add(listener);
	}

	@Override
	public void removeRankChangeListener(RankChangeListener listener) {
		listeners.remove(listener);
	}
}
