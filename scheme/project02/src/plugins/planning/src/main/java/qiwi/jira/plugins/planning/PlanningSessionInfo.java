package qiwi.jira.plugins.planning;

import com.atlassian.greenhopper.service.rank.RankIndexService;
import com.atlassian.greenhopper.service.rank.RankService;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class PlanningSessionInfo {

	private final RankService rankService;
	private final RankIndexService rankIndexService;
	private final List<PlanningIssueInfo> issuesInfo;

	private Map<String, Date> issueEstimatedDates;

	public PlanningSessionInfo(RankService rankService, RankIndexService rankIndexService, List<PlanningIssueInfo> issuesInfo) {
		this.rankService = rankService;
		this.rankIndexService = rankIndexService;
		this.issuesInfo = issuesInfo;
	}

	public RankService getRankService() {
		return rankService;
	}

	public RankIndexService getRankIndexService() {
		return rankIndexService;
	}

	public List<PlanningIssueInfo> getIssuesInfo() {
		return issuesInfo;
	}

	public Map<String, Date> getIssueEstimatedDates() {
		return issueEstimatedDates == null ? Collections.<String, Date>emptyMap() : Collections.unmodifiableMap(issueEstimatedDates);
	}

	public void setIssueEstimatedDates(Map<String, Date> issueEstimatedDates) {
		this.issueEstimatedDates = issueEstimatedDates;
	}
}
