package qiwi.jira.plugins.planning;

import com.atlassian.jira.issue.search.SearchException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import qiwi.jira.security.PermissionManager;

public class PlanningAction extends BasicPlanningAction {
	private static final long serialVersionUID = -3428696672716555697L;

	private static final transient Logger log = LoggerFactory.getLogger(PlanningAction.class);

	private static final String SESSION_INFO = "sessionInfo";
	private static final String DETAILING_ATTR = "detailingAttr";

	private final PlanningProcessor planningProcessor;
	private final PlanningExtProcessor planningExtProcessor;
	private final PlanningSupport planningSupport;
	private final PlanningSessionInfoFactory planningSessionInfoFactory;

	@Autowired
	public PlanningAction(
		PermissionManager permissionManager,
		PlanningProcessor planningProcessor,
		PlanningExtProcessor planningExtProcessor,
		PlanningSupport planningSupport,
		PlanningSessionInfoFactory planningSessionInfoFactory
	) {
		super(permissionManager);
		this.planningProcessor = planningProcessor;
		this.planningExtProcessor = planningExtProcessor;
		this.planningSupport = planningSupport;
		this.planningSessionInfoFactory = planningSessionInfoFactory;
	}

	public String doDefault() throws Exception {
		if (!isActionAccessible()) {
			return getAuthUri();
		}
		try {
			processRankChange();
			initRequestAttributes();
		} catch (ClassCastException e) {
			return getAuthUri();
		} catch (Exception e) {
			log.error("PlanningAction exception", e);
		}
		return super.doDefault();
	}

	public String doManagementMode() {
		if (!isActionAccessible()) {
			return getAuthUri();
		}
		final Long mode = toLong(request.getParameter("mode"));
		if (mode == null) {
			throw new IllegalArgumentException("Mode is undefined...");
		}
		switch (mode.intValue()) {
			case 0:
				session.removeAttribute(DETAILING_ATTR);
				break;
			case 1:
				session.setAttribute(DETAILING_ATTR, true);
				break;
		}
		initRequestAttributes();
		return INPUT;
	}

	public String doReload() {
		try {
			reload();
			initRequestAttributes();
		} catch (ClassCastException e) {
			return getAuthUri();
		} catch (Exception e) {
			log.error("PlanningAction exception", e);
		}
		return INPUT;
	}

	private void processRankChange() throws Exception {
		final Long current = toLong(request.getParameter("current"));
		final Long target = toLong(request.getParameter("target"));
		final PlanningPriorityDirection direction = toPriorityDirection(request.getParameter("direction"));
		if (direction == null) {
			reload();
			return;
		}
		final PlanningSessionInfo planningSessionInfo = getSessionInfo();
		planningSessionInfo.setIssueEstimatedDates(
			planningProcessor.changeIssueRank(
				new PlanningRequest(
					current,
					target,
					direction,
					planningSessionInfo.getRankService(),
					planningSessionInfo.getRankIndexService()
				),
				planningSessionInfo.getIssuesInfo()
			)
		);
	}

	private void initRequestAttributes() {
		if (isDetailingMode()) {
			final PlanningSessionInfo planningSessionInfo = getSessionInfo();
			planningExtProcessor.applyExtraValues(
				planningSessionInfo.getRankIndexService(),
				planningSessionInfo.getIssuesInfo(),
				planningSessionInfo.getIssueEstimatedDates()
			);
			request.setAttribute(
				DETAILING_ATTR,
				new DetailingEntity(
					planningSupport.toActualProjectProgressParameters()
				)
			);
		}
		request.setAttribute(SESSION_INFO, getSessionInfo());
	}

	private boolean isDetailingMode() {
		return session.getAttribute(DETAILING_ATTR) != null;
	}

	private PlanningPriorityDirection toPriorityDirection(String direction) {
		return direction == null ? null : PlanningPriorityDirection.valueOf(direction.toUpperCase());
	}

	private PlanningSessionInfo getSessionInfo() {
		return getSessionAttribute(SESSION_INFO);
	}

	private void reload() throws SearchException {
		session.removeAttribute(DETAILING_ATTR);
		session.setAttribute(SESSION_INFO, planningSessionInfoFactory.createPlanningSessionInfo());
	}
}