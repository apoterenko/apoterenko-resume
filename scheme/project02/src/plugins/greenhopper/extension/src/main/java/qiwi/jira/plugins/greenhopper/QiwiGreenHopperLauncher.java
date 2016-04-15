package qiwi.jira.plugins.greenhopper;

import org.springframework.beans.factory.annotation.Autowired;

import com.atlassian.greenhopper.Launcher;

public class QiwiGreenHopperLauncher extends Launcher {

	@Autowired
	private RankChangeEventDispatcher rankChangeEventDispatcher;
	@Autowired
	private RankChangeListenersFactory rankChangeListenersFactory;

	public void onStart() {
		super.onStart();
		initRankChangeEventDispatcher();
	}

	private void initRankChangeEventDispatcher() {
		for (RankChangeListener listener : rankChangeListenersFactory.getRankChangeListeners()) {
			rankChangeEventDispatcher.addRankChangeListener(listener);
		}
	}
}
