package qiwi.jira.plugins.greenhopper;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atlassian.jira.util.NotNull;
import com.google.common.collect.ImmutableList;

@Service("qiwi-greenhopper-rank-change-listeners-factory")
public class RankChangeListenersFactoryImpl implements RankChangeListenersFactory {
	@Autowired
	private SlaveIssueRanking slaveIssueRanking;

	@NotNull
	@Override
	public List<RankChangeListener> getRankChangeListeners() {
		return ImmutableList.<RankChangeListener>of(slaveIssueRanking);
	}
}
