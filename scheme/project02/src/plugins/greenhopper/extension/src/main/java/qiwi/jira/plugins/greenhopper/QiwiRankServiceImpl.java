package qiwi.jira.plugins.greenhopper;

import static com.google.common.base.Preconditions.checkNotNull;

import java.lang.reflect.Field;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.greenhopper.model.validation.ErrorCollection;
import com.atlassian.greenhopper.service.PermissionService;
import com.atlassian.greenhopper.service.ServiceOutcome;
import com.atlassian.greenhopper.service.rank.RankChange;
import com.atlassian.greenhopper.service.rank.RankServiceImpl;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.util.NotNull;
import com.google.common.collect.Lists;

@Service("qiwi-greenhopper-rank-service")
public class QiwiRankServiceImpl extends RankServiceImpl {
	private static final transient Logger log = LoggerFactory.getLogger(QiwiRankServiceImpl.class);

	@Autowired
	private RankChangeEventDispatcher eventDispatcher;

	private final Field permissionServiceField;

	public QiwiRankServiceImpl() {
		this.permissionServiceField = getPermissionServiceField();
	}

	protected Field getPermissionServiceField() {
		final Field field;
		try {
			field = RankServiceImpl.class.getDeclaredField("permissionService");
			field.setAccessible(true);
			if (!field.getType().isAssignableFrom(PermissionService.class)) {
				throw new IllegalStateException(
						"wrong type of 'permissionService' propery: " + field.getType().getName());
			}
			return field;
		} catch (Exception e) {
			throw new IllegalStateException(e);
		}
	}

	public void setPermissionService(PermissionService permissionService) {
		checkNotNull(permissionService);
		try {
			permissionServiceField.set(this, permissionService);
		} catch (Exception e) {
			throw new IllegalStateException(e);
		}
	}


	private boolean hasErrors(ServiceOutcome<?> result) {
		final ErrorCollection errorCollection = result.getErrors();
		if (errorCollection.hasErrors()) {
			log.warn("rankChange(s) errors: {}", Lists.transform(errorCollection.getErrors(), ToStringFunctions.ERROR_ITEM_STR));
			return true;
		}

		final Object rankChange = result.getValue();
		if (rankChange == null) {
			log.error("rankChange(s) is null!");
			return true;
		}

		return false;
	}

	@NotNull
	public ServiceOutcome<RankChange> rankBefore(User user, long customFieldId, Issue issue, Issue rankBeforeIssue) {
		if (log.isDebugEnabled()) {
			log.debug("rankBefore(user: {}, rankFieldId: {}, issue: {}, target: {})", new Object[] {
					user.getEmailAddress(),
					customFieldId,
					issue.getKey(),
					rankBeforeIssue.getKey()
			});
		}

		final ServiceOutcome<RankChange> result = super.rankBefore(user, customFieldId, issue, rankBeforeIssue);
		if (hasErrors(result)) {
			return result;
		}

		final RankChange rankChange = result.getValue();
		if (log.isDebugEnabled()) {
			log.debug("rankBefore result: {}", new RankChangeStr(rankChange));
		}
		eventDispatcher.fireRankChangeEvent(rankChange, RankChangeDirection.BEFORE, user);
		return result;
	}

	@NotNull
	public ServiceOutcome<List<RankChange>> rankBefore(User user, long customFieldId, List<Issue> issues, Issue rankBeforeIssue) {
		if (log.isDebugEnabled()) {
			log.debug("rankBefore(user: {}, rankFieldId: {}, issues: {}, target: {})", new Object[] {
					user.getEmailAddress(),
					customFieldId,
					Lists.transform(issues, ToStringFunctions.ISSUE),
					rankBeforeIssue.getKey()
			});
		}

		final ServiceOutcome<List<RankChange>> result = super.rankBefore(user, customFieldId, issues, rankBeforeIssue);
		if (hasErrors(result)) {
			return result;
		}

		final List<RankChange> rankChangeList = result.getValue();
		if (log.isDebugEnabled()) {
			log.debug("rankBefore results: {}", Lists.transform(rankChangeList, ToStringFunctions.RANK_CHANGE_STR));
		}
		for (RankChange rankChange : rankChangeList) {
			eventDispatcher.fireRankChangeEvent(rankChange, RankChangeDirection.BEFORE, user);
		}
		return result;
	}

	public ServiceOutcome<RankChange> rankAfter(User user, long customFieldId, Issue issue, Issue rankAfterIssue) {
		if (log.isDebugEnabled()) {
			log.debug("rankAfter(user: {}, rankFieldId: {}, issue: {}, target: {})", new Object[] {
					user.getEmailAddress(),
					customFieldId,
					issue.getKey(),
					rankAfterIssue.getKey()
			});
		}

		final ServiceOutcome<RankChange> result = super.rankAfter(user, customFieldId, issue, rankAfterIssue);
		if (hasErrors(result)) {
			return result;
		}

		final RankChange rankChange = result.getValue();
		if (log.isDebugEnabled()) {
			log.debug("rankAfter result: {}", new RankChangeStr(result.getValue()));
		}
		eventDispatcher.fireRankChangeEvent(rankChange, RankChangeDirection.AFTER, user);
		return result;
	}

	public ServiceOutcome<List<RankChange>> rankAfter(User user, long customFieldId, List<Issue> issues, Issue rankAfterIssue) {
		if (log.isDebugEnabled()) {
			log.debug("rankAfter(user: {}, rankFieldId: {}, issues: {}, target: {})", new Object[] {
					user.getEmailAddress(),
					customFieldId,
					Lists.transform(issues, ToStringFunctions.ISSUE),
					rankAfterIssue.getKey()
			});
		}

		final ServiceOutcome<List<RankChange>> result = super.rankAfter(user, customFieldId, issues, rankAfterIssue);
		if (hasErrors(result)) {
			return result;
		}

		final List<RankChange> rankChangeList = result.getValue();
		if (log.isDebugEnabled()) {
			log.debug("rankAfter results: {}", Lists.transform(rankChangeList, ToStringFunctions.RANK_CHANGE_STR));
		}
		for (RankChange rankChange : rankChangeList) {
			eventDispatcher.fireRankChangeEvent(rankChange, RankChangeDirection.AFTER, user);
		}
		return result;
	}
}
