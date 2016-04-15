package qiwi.jira.plugins.greenhopper;

public interface RankEntry {

	public long getPosition();

	public Long getId();

	public boolean hasPrevious();

	public boolean hasNext();

	public RankEntry getPrevious();

	public RankEntry getNext();

	public boolean isBefore(RankEntry rankEntry);

	public boolean isAfter(RankEntry rankEntry);
}
