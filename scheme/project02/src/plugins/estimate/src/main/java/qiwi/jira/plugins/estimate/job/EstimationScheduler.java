package qiwi.jira.plugins.estimate.job;

import java.util.Date;

import com.atlassian.jira.issue.IssueManager;
import com.atlassian.jira.issue.fields.CustomField;
import org.apache.commons.lang.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import qiwi.jira.plugins.estimate.*;
import qiwi.jira.plugins.estimate.EstimateCustomFieldType;
import qiwi.jira.plugins.scheduler.EasyScheduler;

import com.atlassian.greenhopper.service.rank.RankIndexService;
import com.atlassian.jira.issue.CustomFieldManager;

import qiwi.jira.specific.IssueFieldName;

@Component
public class EstimationScheduler {
	private static final transient Logger log = LoggerFactory.getLogger(EstimationScheduler.class);

	private static final long DEFAULT_DELAY = DateUtils.MILLIS_PER_MINUTE;
	private static final long DEFAULT_INTERVAL = DateUtils.MILLIS_PER_MINUTE * 15;

	private final EasyScheduler easyScheduler;

	private final EstimationService estimationService;
	private final RankIndexService rankIndexService;
	private final CustomFieldManager customFieldManager;
	private final EstimationProblemNotifier problemNotifier;
	private final EstimateFieldFactory customFieldFactory;
	private final IssueManager issueManager;

	@Autowired
	public EstimationScheduler(
		IssueManager issueManager,
		EasyScheduler easyScheduler,
		EstimationService estimationService,
		RankIndexService rankIndexService,
		CustomFieldManager customFieldManager,
		EstimationProblemNotifier problemNotifier,
		EstimateFieldFactory customFieldFactory) {
		this.easyScheduler = easyScheduler;
		this.estimationService = estimationService;
		this.rankIndexService = rankIndexService;
		this.customFieldManager = customFieldManager;
		this.problemNotifier = problemNotifier;
		this.customFieldFactory = customFieldFactory;
		this.issueManager = issueManager;
		scheduleJob();
	}

	public void scheduleJob() {
		easyScheduler.scheduleJob(
			new Job(), new Date(System.currentTimeMillis() + DEFAULT_DELAY), DEFAULT_INTERVAL
		);
		log.info("Issue estimation job scheduled every {} ms.", DEFAULT_INTERVAL);
	}

	void handleEstimationException(EstimationException e) {
		final String estimationProblemMessage = EstimationMessageHelper.makeEstimationProblemMessage(e);
		log.warn("Project estimation has the following problems:\n{}", estimationProblemMessage);

		problemNotifier.addEstimationProblemMessage(estimationProblemMessage);
	}

	CustomField getEstimatedDateField() {
		return customFieldManager.getCustomFieldObjectByName(IssueFieldName.ESTIMATED_DATE.value());
	}

	private class Job implements Runnable {

		@Override
		public void run() {
			final CustomField estimatedField = getEstimatedDateField();
			try {
				estimationService.estimate(
					rankIndexService,
					customFieldFactory.createCustomField(
						new EstimateCustomFieldType(estimatedField.getCustomFieldType(), issueManager),
						IssueFieldName.ESTIMATED_DATE.value()
					));
			} catch (EstimationException e) {
				handleEstimationException(e);
			}
		}
	}
}
