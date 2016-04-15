package qiwi.jira.plugins.planning;

import com.atlassian.greenhopper.service.rank.RankIndexService;
import com.atlassian.jira.issue.Issue;

import com.atlassian.jira.issue.fields.CustomField;
import com.google.common.collect.Lists;
import org.apache.commons.lang.StringUtils;
import org.joda.time.MutableDateTime;

import java.text.SimpleDateFormat;
import java.util.*;

public class PlanningIssueInfo {

	private final RankIndexService rankIndexService;
	private final PlanningIssuesSorter planningIssuesSorter;

	private final Issue issue;
	private final CustomField rankField;

	private Date persistenceEstimatedDate;
	private Date virtualEstimatedDate;

	private Set<PlanningIssueInfo> implementationIssues;
	private Set<PlanningIssueInfo> blockingIssues;

	public PlanningIssueInfo(
		Issue issue,
		CustomField rankField,
		RankIndexService rankIndexService,
		PlanningIssuesSorter planningIssuesSorter
	) {
		this.issue = issue;
		this.rankField = rankField;
		this.rankIndexService = rankIndexService;
		this.planningIssuesSorter = planningIssuesSorter;
	}

	private List<PlanningIssueInfo> getIssues(Set<PlanningIssueInfo> issues) {
		if (issues == null) {
			return Collections.emptyList();
		}
		final List<PlanningIssueInfo> list = Lists.newArrayList(issues);
		/* Don't worry about efficiency - uses in debug mode*/
		planningIssuesSorter.sort(list, rankIndexService);
		return list;
	}

	public List<PlanningIssueInfo> getImplementationIssues() {
		return getIssues(implementationIssues);
	}

	public void setImplementationIssues(Set<PlanningIssueInfo> implementationIssues) {
		this.implementationIssues = implementationIssues;
	}

	public Collection<PlanningIssueInfo> getBlockingIssues() {
		return getIssues(blockingIssues);
	}

	public void setBlockingIssues(Set<PlanningIssueInfo> blockingIssues) {
		this.blockingIssues = blockingIssues;
	}

	public void resetVirtualEstimatedDate() {
		virtualEstimatedDate = null;
	}

	public void setVirtualEstimatedDate(Date virtualEstimatedDate) {
		this.virtualEstimatedDate = virtualEstimatedDate;
	}

	public void setPersistenceEstimatedDate(Date persistenceEstimatedDate) {
		this.persistenceEstimatedDate = persistenceEstimatedDate;
	}

	public Date getVirtualEstimatedDate() {
		return virtualEstimatedDate;
	}

	public Date getEstimatedDate() {
		return persistenceEstimatedDate;
	}

	public Issue getIssue() {
		return issue;
	}

	/**
	 * @return Id of issue
	 */
	public long getIssueId() {
		return issue.getId();
	}

	/**
	 * @return Key of issue
	 */
	public String getIssueKey() {
		return issue.getKey();
	}

	/**
	 * @return Summary of issue
	 */
	public String getIssueSummary() {
		return issue.getSummary();
	}

	/**
	 * @return Rank of issue
	 */
	public long getIssueRank() {
		return rankIndexService.getIssuePosition(rankField.getIdAsLong(), issue.getId());
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof PlanningIssueInfo)) return false;

		final PlanningIssueInfo that = (PlanningIssueInfo) o;
		return !(issue != null ? !issue.getKey().equals(that.issue.getKey()) : that.issue != null);
	}

	@Override
	public int hashCode() {
		return issue != null ? issue.hashCode() : 0;
	}

	private Date truncatedDate(Date initDate) {
		final MutableDateTime dateTime = new MutableDateTime();
		dateTime.setMillis(initDate.getTime());
		dateTime.setHourOfDay(0);
		dateTime.setMinuteOfHour(0);
		dateTime.setSecondOfMinute(0);
		dateTime.setMillisOfSecond(0);
		return new Date(dateTime.getMillis());
	}

	public int getColorId() {
		if (virtualEstimatedDate != null && persistenceEstimatedDate == null) {
			return PlanningColor.GREEN;
		}
		if (virtualEstimatedDate != null) {
			switch (truncatedDate(virtualEstimatedDate).compareTo(truncatedDate(persistenceEstimatedDate))) {
				case 0:
					return PlanningColor.WHITE;
				case 1:
					return PlanningColor.RED;
				case -1:
					return PlanningColor.GREEN;
			}
		}
		return PlanningColor.WHITE;
	}

	private String formatDate(Date date) {
		if (date == null) {
			return StringUtils.EMPTY;
		}
		return new SimpleDateFormat(DATE_FORMAT).format(date);
	}

	public String formatVirtualEstimatedDate() {
		return formatDate(virtualEstimatedDate);
	}

	public String formatEstimatedDate() {
		return formatDate(persistenceEstimatedDate);
	}

	private static final String DATE_FORMAT = "dd.MM.yyyy";
}