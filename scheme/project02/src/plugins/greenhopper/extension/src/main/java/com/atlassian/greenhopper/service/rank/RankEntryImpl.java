package com.atlassian.greenhopper.service.rank;

import qiwi.jira.plugins.greenhopper.RankEntry;

class RankEntryImpl implements RankEntry {

	final Rank rank;

	RankEntryImpl(Rank rank) {
		this.rank = rank;
	}

	@Override
	public long getPosition() {
		return rank.getPosition();
	}

	@Override
	public Long getId() { // getIssueId?
		return rank.id;
	}

	protected Rank getNextRank() {
		return rank.next;
	}

	protected Rank getPreviousRank() {
		return rank.previous;
	}

	@Override
	public boolean hasPrevious() {
		return getPreviousRank() != null;
	}

	@Override
	public boolean hasNext() {
		return getNextRank() != null;
	}

	protected RankEntry newRankEntry(Rank rank) {
		return new RankEntryImpl(rank);
	}

	@Override
	public RankEntry getPrevious() {
		final Rank previousRank = getPreviousRank();
		return previousRank != null ? newRankEntry(previousRank) : null;
	}

	@Override
	public RankEntry getNext() {
		final Rank nextRank = getNextRank();
		return nextRank != null ? newRankEntry(nextRank) : null;
	}

	@Override
	public boolean isBefore(RankEntry rankEntry) {
		return getPosition() < rankEntry.getPosition();
	}

	@Override
	public boolean isAfter(RankEntry rankEntry) {
		return getPosition() > rankEntry.getPosition();
	}
}
