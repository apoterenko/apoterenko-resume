package qiwi.jira.plugins.planning;

import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.customfields.CustomFieldType;
import com.atlassian.jira.issue.customfields.impl.FieldValidationException;
import com.atlassian.jira.issue.customfields.view.CustomFieldParams;
import com.atlassian.jira.issue.fields.CustomField;
import com.atlassian.jira.issue.fields.config.FieldConfig;
import com.atlassian.jira.issue.fields.layout.field.FieldLayoutItem;
import com.atlassian.jira.issue.index.indexers.FieldIndexer;
import com.atlassian.jira.plugin.customfield.CustomFieldTypeModuleDescriptor;
import com.atlassian.jira.util.ErrorCollection;
import com.atlassian.jira.web.bean.BulkEditBean;
import com.google.common.collect.Maps;

import java.util.List;
import java.util.Map;
import java.util.Set;

class PlanningCustomFieldType implements CustomFieldType {

	private final Map<Long, PlanningIssueInfo> issuesInfo;

	public PlanningCustomFieldType(List<PlanningIssueInfo> issuesInfo) {
		this.issuesInfo = createIssuesInfoMap(issuesInfo);
	}

	private Map<Long, PlanningIssueInfo> createIssuesInfoMap(List<PlanningIssueInfo> issuesInfo) {
		final Map<Long, PlanningIssueInfo> map = Maps.newHashMap();
		for (PlanningIssueInfo planningIssueInfo : issuesInfo) {
			map.put(planningIssueInfo.getIssueId(), planningIssueInfo);
		}
		return map;
	}

	@Override
	public void updateValue(CustomField customField, Issue issue, Object value) {
		final PlanningIssueInfo planningEntity = issuesInfo.get(issue.getId());
		if (planningEntity != null) {
			planningEntity.setVirtualEstimatedDate(value instanceof java.sql.Date ? (java.sql.Date) value : null);
		}
	}

	@Override
	public void init(CustomFieldTypeModuleDescriptor paramCustomFieldTypeModuleDescriptor) {
		throw new UnsupportedOperationException();
	}

	@Override
	public String getKey() {
		throw new UnsupportedOperationException();
	}

	@Override
	public String getName() {
		throw new UnsupportedOperationException();
	}

	@Override
	public String getDescription() {
		throw new UnsupportedOperationException();
	}

	@Override
	public CustomFieldTypeModuleDescriptor getDescriptor() {
		throw new UnsupportedOperationException();
	}

	@Override
	public String getStringFromSingularObject(Object paramObject) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Object getSingularObjectFromString(String paramString) throws FieldValidationException {
		throw new UnsupportedOperationException();
	}

	@Override
	public Set<Long> remove(CustomField paramCustomField) {
		throw new UnsupportedOperationException();
	}

	@Override
	public void validateFromParams(CustomFieldParams paramCustomFieldParams, ErrorCollection paramErrorCollection, FieldConfig paramFieldConfig) {
		throw new UnsupportedOperationException();
	}

	@Override
	public void createValue(CustomField paramCustomField, Issue paramIssue, Object paramObject) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Object getValueFromCustomFieldParams(CustomFieldParams paramCustomFieldParams) throws FieldValidationException {
		throw new UnsupportedOperationException();
	}

	@Override
	public Object getStringValueFromCustomFieldParams(CustomFieldParams paramCustomFieldParams) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Object getValueFromIssue(CustomField paramCustomField, Issue paramIssue) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Object getDefaultValue(FieldConfig paramFieldConfig) {
		throw new UnsupportedOperationException();
	}

	@Override
	public void setDefaultValue(FieldConfig paramFieldConfig, Object paramObject) {
		throw new UnsupportedOperationException();
	}

	@Override
	public String getChangelogValue(CustomField paramCustomField, Object paramObject) {
		throw new UnsupportedOperationException();
	}

	@Override
	public String getChangelogString(CustomField paramCustomField, Object paramObject) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Map<String, Object> getVelocityParameters(Issue paramIssue, CustomField paramCustomField, FieldLayoutItem paramFieldLayoutItem) {
		throw new UnsupportedOperationException();
	}

	@Override
	public List getConfigurationItemTypes() {
		throw new UnsupportedOperationException();
	}

	@Override
	public List<FieldIndexer> getRelatedIndexers(CustomField paramCustomField) {
		throw new UnsupportedOperationException();
	}

	@Override
	public boolean isRenderable() {
		throw new UnsupportedOperationException();
	}

	@Override
	public boolean valuesEqual(Object paramObject1, Object paramObject2) {
		throw new UnsupportedOperationException();
	}

	@Override
	public String availableForBulkEdit(BulkEditBean paramBulkEditBean) {
		throw new UnsupportedOperationException();
	}
}