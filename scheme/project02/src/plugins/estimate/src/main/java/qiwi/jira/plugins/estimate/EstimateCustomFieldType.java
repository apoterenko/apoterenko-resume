package qiwi.jira.plugins.estimate;

import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.IssueManager;
import com.atlassian.jira.issue.customfields.CustomFieldType;
import com.atlassian.jira.issue.customfields.impl.FieldValidationException;
import com.atlassian.jira.issue.customfields.view.CustomFieldParams;
import com.atlassian.jira.issue.fields.CustomField;
import com.atlassian.jira.issue.fields.config.FieldConfig;
import com.atlassian.jira.issue.fields.layout.field.FieldLayoutItem;
import com.atlassian.jira.issue.index.indexers.FieldIndexer;
import com.atlassian.jira.issue.util.DefaultIssueChangeHolder;
import com.atlassian.jira.plugin.customfield.CustomFieldTypeModuleDescriptor;
import com.atlassian.jira.util.ErrorCollection;
import com.atlassian.jira.web.bean.BulkEditBean;
import com.googlecode.jsu.util.WorkflowUtils;

import java.util.List;
import java.util.Map;
import java.util.Set;

public class EstimateCustomFieldType implements CustomFieldType {

	private final CustomFieldType customFieldType;
	private final IssueManager issueManager;

	public EstimateCustomFieldType(CustomFieldType customFieldType, IssueManager issueManager) {
		this.customFieldType = customFieldType;
		this.issueManager = issueManager;
	}

	@Override
	public void init(CustomFieldTypeModuleDescriptor paramCustomFieldTypeModuleDescriptor) {
		customFieldType.init(paramCustomFieldTypeModuleDescriptor);
	}

	@Override
	public String getKey() {
		return customFieldType.getKey();
	}

	@Override
	public String getName() {
		return customFieldType.getName();
	}

	@Override
	public String getDescription() {
		return customFieldType.getDescription();
	}

	@Override
	public CustomFieldTypeModuleDescriptor getDescriptor() {
		return customFieldType.getDescriptor();
	}

	@Override
	public String getStringFromSingularObject(Object paramObject) {
		return customFieldType.getStringFromSingularObject(paramObject);
	}

	@Override
	public Object getSingularObjectFromString(String paramString) throws FieldValidationException {
		return customFieldType.getSingularObjectFromString(paramString);
	}

	@Override
	public Set<Long> remove(CustomField paramCustomField) {
		return customFieldType.remove(paramCustomField);
	}

	@Override
	public void validateFromParams(CustomFieldParams paramCustomFieldParams, ErrorCollection paramErrorCollection, FieldConfig paramFieldConfig) {
		customFieldType.validateFromParams(paramCustomFieldParams, paramErrorCollection, paramFieldConfig);
	}

	@Override
	public void createValue(CustomField paramCustomField, Issue paramIssue, Object paramObject) {
		customFieldType.createValue(paramCustomField, paramIssue, paramObject);
	}

	@Override
	public void updateValue(CustomField paramCustomField, Issue paramIssue, Object paramObject) {
		if (paramObject == null) {
			WorkflowUtils.setFieldValue(
				issueManager.getIssueObject(paramIssue.getId()),
				paramCustomField.getId(),
				null,
				new DefaultIssueChangeHolder()
			);
		} else {
			customFieldType.updateValue(paramCustomField, paramIssue, paramObject);
		}
	}

	@Override
	public Object getValueFromCustomFieldParams(CustomFieldParams paramCustomFieldParams) throws FieldValidationException {
		return customFieldType.getValueFromCustomFieldParams(paramCustomFieldParams);
	}

	@Override
	public Object getStringValueFromCustomFieldParams(CustomFieldParams paramCustomFieldParams) {
		return customFieldType.getStringValueFromCustomFieldParams(paramCustomFieldParams);
	}

	@Override
	public Object getValueFromIssue(CustomField paramCustomField, Issue paramIssue) {
		return customFieldType.getValueFromIssue(paramCustomField, paramIssue);
	}

	@Override
	public Object getDefaultValue(FieldConfig paramFieldConfig) {
		return customFieldType.getDefaultValue(paramFieldConfig);
	}

	@Override
	public void setDefaultValue(FieldConfig paramFieldConfig, Object paramObject) {
		customFieldType.setDefaultValue(paramFieldConfig, paramObject);
	}

	@Override
	public String getChangelogValue(CustomField paramCustomField, Object paramObject) {
		return customFieldType.getChangelogValue(paramCustomField, paramObject);
	}

	@Override
	public String getChangelogString(CustomField paramCustomField, Object paramObject) {
		return customFieldType.getChangelogString(paramCustomField, paramObject);
	}

	@Override
	public Map<String, Object> getVelocityParameters(Issue paramIssue, CustomField paramCustomField, FieldLayoutItem paramFieldLayoutItem) {
		return customFieldType.getVelocityParameters(paramIssue, paramCustomField, paramFieldLayoutItem);
	}

	@Override
	public List getConfigurationItemTypes() {
		return customFieldType.getConfigurationItemTypes();
	}

	@Override
	public List<FieldIndexer> getRelatedIndexers(CustomField paramCustomField) {
		return customFieldType.getRelatedIndexers(paramCustomField);
	}

	@Override
	public boolean isRenderable() {
		return customFieldType.isRenderable();
	}

	@Override
	public boolean valuesEqual(Object paramObject1, Object paramObject2) {
		return customFieldType.valuesEqual(paramObject1, paramObject2);
	}

	@Override
	public String availableForBulkEdit(BulkEditBean paramBulkEditBean) {
		return customFieldType.availableForBulkEdit(paramBulkEditBean);
	}
}
