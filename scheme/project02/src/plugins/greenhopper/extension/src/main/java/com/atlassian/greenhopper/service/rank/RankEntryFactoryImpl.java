package com.atlassian.greenhopper.service.rank;

import java.lang.reflect.Method;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import qiwi.jira.plugins.greenhopper.RankChangeDirection;
import qiwi.jira.plugins.greenhopper.RankEntry;
import qiwi.jira.plugins.greenhopper.RankEntryFactory;

@Service("qiwi-greenhopper-rank-factory")
public class RankEntryFactoryImpl implements RankEntryFactory {

	private final RankIndexService rankIndexService;
	private final Method getIndexMethod;

	@Autowired
	public RankEntryFactoryImpl(RankIndexService rankIndexService) {
		if (rankIndexService == null) {
			throw new NullPointerException("rankIndexService");
		}
		this.rankIndexService = rankIndexService;
		this.getIndexMethod = getGetIndexMethod(rankIndexService);
	}

	protected Method getGetIndexMethod(RankIndexService rankIndexService) {
		final Method method;
		try {
			method = rankIndexService.getClass().getDeclaredMethod("getIndex", Long.class);
			method.setAccessible(true);
			if (!RankIndex.class.isAssignableFrom(method.getReturnType())) {
				throw new IllegalStateException("wrong getIndex() result type: " + method.getReturnType());
			}
			return method;
		} catch (Exception e) {
			throw new IllegalArgumentException("rankIndexService", e);
		}
	}

	private RankIndex getRankIndex(Long rankFieldId) {
		try {
			return (RankIndex) getIndexMethod.invoke(rankIndexService, rankFieldId);
		} catch (Exception e) {
			throw new IllegalStateException(e);
		}
	}

	Rank getRank(Long rankFieldId, Long issueId) {
		return getRankIndex(rankFieldId).getRank(issueId);
	}

	@Override
	public RankEntryImpl getRankEntry(Long rankFieldId, Long issueId) {
		final Rank rank = getRank(rankFieldId, issueId);
		return rank == null ? null : new RankEntryImpl(rank);
	}

	@Override
	public RankEntryImpl getOppositeRankEntry(Long rankFieldId, Long issueId) {
		final Rank rank = getRank(rankFieldId, issueId);
		return rank == null ? null : new OppositeRankEntryImpl(rank);
	}

	@Override
	public RankEntry getRankEntry(Long rankFieldId, Long issueId, RankChangeDirection direction) {
		switch (direction) {
		case BEFORE:
			return getRankEntry(rankFieldId, issueId);
		case AFTER:
			return getOppositeRankEntry(rankFieldId, issueId);
		default:
			throw new IllegalArgumentException("direction: " + direction);
		}
	}
}
