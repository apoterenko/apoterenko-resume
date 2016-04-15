package qiwi.jira.plugins.greenhopper;

public interface RankEntryFactory {

	public RankEntry getRankEntry(Long rankFieldId, Long issueId);

	public RankEntry getRankEntry(Long rankFieldId, Long issueId, RankChangeDirection direction);

	public RankEntry getOppositeRankEntry(Long rankFieldId, Long issueId);
}
