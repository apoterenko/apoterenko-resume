package qiwi.jira.plugins.planning;

import com.atlassian.greenhopper.service.rank.RankCustomFieldService;
import com.atlassian.greenhopper.service.rank.RankDao;
import com.atlassian.greenhopper.service.rank.RankIndexService;
import com.atlassian.greenhopper.service.rank.RankService;
import com.atlassian.jira.issue.CustomFieldManager;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.IssueManager;
import com.atlassian.jira.issue.fields.CustomField;
import com.atlassian.jira.project.Project;
import com.atlassian.jira.project.ProjectManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import qiwi.jira.plugins.estimate.EstimateFieldFactory;
import qiwi.jira.plugins.greenhopper.RankIndexServiceFactory;
import qiwi.jira.plugins.greenhopper.RankServiceFactory;
import qiwi.jira.specific.ProjectName;

import java.util.List;

import static qiwi.jira.specific.IssueFieldName.ESTIMATED_DATE;
import static qiwi.jira.specific.IssueFieldName.RANK;

@Component
class PlanningService {

	@Autowired
	private RankIndexServiceFactory rankIndexServiceFactory;
	@Autowired
	private RankServiceFactory rankServiceFactory;
	@Autowired
	private RankCustomFieldService rankCustomFieldService;
	@Autowired
	private CustomFieldManager customFieldManager;
	@Autowired
	private RankDao rankDao;
	@Autowired
	private ProjectManager projectManager;
	@Autowired
	private EstimateFieldFactory estimateFieldFactory;
	@Autowired
	private IssueManager issueManager;

	public RankIndexService createRankIndexService() {
		return rankIndexServiceFactory.createRankIndexService(
			new RankDaoWrapper(rankDao)
		);
	}

	public RankService createRankService(RankIndexService rankIndexService) {
		return rankServiceFactory.createRankService(
			rankIndexService,
			new RankCustomFieldServiceWrapper(rankCustomFieldService)
		);
	}

	public CustomField createCustomField(List<PlanningIssueInfo> issuesInfo) {
		return estimateFieldFactory.createCustomField(
			new PlanningCustomFieldType(issuesInfo),
			ESTIMATED_DATE.value()
		);
	}

	public CustomField getRankFieldObject() {
		return customFieldManager.getCustomFieldObjectByName(RANK.value());
	}

	public CustomField getEstimatedFieldObject() {
		return customFieldManager.getCustomFieldObjectByName(ESTIMATED_DATE.value());
	}

	public Project getSystemAnalyzeProject() {
		return projectManager.getProjectObjByKey(ProjectName.SYSTEMS_ANALYSIS.value());
	}

	public Issue getIssueObject(long id) {
		return issueManager.getIssueObject(id);
	}
}