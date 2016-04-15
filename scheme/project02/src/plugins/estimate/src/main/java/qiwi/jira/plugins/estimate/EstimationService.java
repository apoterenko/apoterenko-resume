package qiwi.jira.plugins.estimate;

import com.atlassian.greenhopper.service.rank.RankIndexService;
import com.atlassian.jira.issue.fields.CustomField;

import java.util.Date;
import java.util.Map;

public interface EstimationService {

	void estimate(RankIndexService rankIndexService, CustomField estimatedDateField) throws EstimationException;

	void estimate(RankIndexService rankIndexService, CustomField estimatedField, Map<String, Date> issueEstimatedDates) throws EstimationException;
}