package com.atlassian.greenhopper.service.rank;

import qiwi.jira.plugins.greenhopper.RankEntry;

class OppositeRankEntryImpl extends RankEntryImpl {

	OppositeRankEntryImpl(Rank rank) {
		super(rank);
	}

	@Override
	protected Rank getNextRank() {
		return rank.previous;
	}

	@Override
	protected Rank getPreviousRank() {
		return rank.next;
	}

	@Override
	protected RankEntry newRankEntry(Rank rank) {
		return new OppositeRankEntryImpl(rank);
	}

	@Override
	public boolean isBefore(RankEntry rankEntry) {
		return super.isAfter(rankEntry);
	}

	@Override
	public boolean isAfter(RankEntry rankEntry) {
		return super.isBefore(rankEntry);
	}
}
