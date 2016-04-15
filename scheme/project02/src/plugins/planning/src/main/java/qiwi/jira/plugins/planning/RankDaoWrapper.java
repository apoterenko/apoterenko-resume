package qiwi.jira.plugins.planning;

import com.atlassian.greenhopper.service.rank.IssueRankingAO;
import com.atlassian.greenhopper.service.rank.RankDao;
import com.atlassian.jira.util.Consumer;

class RankDaoWrapper implements RankDao {

	private final RankDao rankDao;

	public RankDaoWrapper(RankDao rankDao) {
		this.rankDao = rankDao;
	}

	@Override
	public void loadAll(Long paramLong, Consumer<IssueRankingAO> paramConsumer) {
		rankDao.loadAll(paramLong, paramConsumer);
	}

	@Override
	public void insert(Long paramLong1, Long paramLong2, Long paramLong3, Long paramLong4) {
	}

	@Override
	public void move(Long paramLong1, Long paramLong2, Long paramLong3, Long paramLong4, Long paramLong5, Long paramLong6) {
	}

	@Override
	public void remove(Long paramLong1, Long paramLong2, Long paramLong3, Long paramLong4) {
	}

	@Override
	public void executeOutstandingTransaction() {
	}

	@Override
	public boolean hasOutstandingTransactions() {
		return rankDao.hasOutstandingTransactions();
	}
}
