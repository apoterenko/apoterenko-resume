package qiwi.jira.plugins.estimate;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.ModifiedValue;
import com.atlassian.jira.issue.MutableIssue;
import com.atlassian.jira.issue.context.IssueContext;
import com.atlassian.jira.issue.context.JiraContextNode;
import com.atlassian.jira.issue.customfields.CustomFieldSearcher;
import com.atlassian.jira.issue.customfields.CustomFieldType;
import com.atlassian.jira.issue.customfields.OperationContext;
import com.atlassian.jira.issue.customfields.impl.FieldValidationException;
import com.atlassian.jira.issue.customfields.option.Options;
import com.atlassian.jira.issue.customfields.view.CustomFieldParams;
import com.atlassian.jira.issue.fields.CustomField;
import com.atlassian.jira.issue.fields.config.FieldConfig;
import com.atlassian.jira.issue.fields.config.FieldConfigScheme;
import com.atlassian.jira.issue.fields.layout.field.FieldLayoutItem;
import com.atlassian.jira.issue.fields.screen.FieldScreenRenderLayoutItem;
import com.atlassian.jira.issue.fields.util.MessagedResult;
import com.atlassian.jira.issue.search.ClauseNames;
import com.atlassian.jira.issue.search.LuceneFieldSorter;
import com.atlassian.jira.issue.search.SearchContext;
import com.atlassian.jira.issue.search.SearchHandler;
import com.atlassian.jira.issue.util.IssueChangeHolder;
import com.atlassian.jira.project.Project;
import com.atlassian.jira.util.ErrorCollection;
import com.atlassian.jira.util.I18nHelper;
import com.atlassian.jira.web.bean.BulkEditBean;
import org.apache.lucene.search.SortComparatorSource;
import org.ofbiz.core.entity.GenericValue;
import webwork.action.Action;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class EstimateCustomField implements CustomField {

	private final CustomField customField;
	private final CustomFieldType customFieldType;

	public EstimateCustomField(CustomField customField, CustomFieldType customFieldType) {
		this.customField = customField;
		this.customFieldType = customFieldType;
	}

	@Override
	public boolean isInScope(Project paramProject, List<String> paramList) {
		return customField.isInScope(paramProject, paramList);
	}

	@Override
	public boolean isInScope(GenericValue paramGenericValue, List<String> paramList) {
		return customField.isInScope(paramGenericValue, paramList);
	}

	@Override
	public boolean isInScope(SearchContext paramSearchContext) {
		return customField.isInScope(paramSearchContext);
	}

	@Override
	public boolean isInScope(User paramUser, SearchContext paramSearchContext) {
		return customField.isInScope(paramUser, paramSearchContext);
	}

	@Override
	public GenericValue getGenericValue() {
		return customField.getGenericValue();
	}

	@Override
	public int compare(Issue paramIssue1, Issue paramIssue2) throws IllegalArgumentException {
		return customField.compare(paramIssue1, paramIssue2);
	}

	@Override
	public CustomFieldParams getCustomFieldValues(Map paramMap) {
		return customField.getCustomFieldValues(paramMap);
	}

	@Override
	public Object getValue(Issue paramIssue) {
		return customField.getValue(paramIssue);
	}

	@Override
	public Set<Long> remove() {
		return customField.remove();
	}

	@Override
	public Options getOptions(String paramString, JiraContextNode paramJiraContextNode) {
		return customField.getOptions(paramString, paramJiraContextNode);
	}

	@Override
	public void setName(String paramString) {
		customField.setName(paramString);
	}

	@Override
	public String getDescription() {
		return customField.getDescription();
	}

	@Override
	public void setDescription(String paramString) {
		customField.setDescription(paramString);
	}

	@Override
	public CustomFieldSearcher getCustomFieldSearcher() {
		return customField.getCustomFieldSearcher();
	}

	@Override
	public void setCustomFieldSearcher(CustomFieldSearcher paramCustomFieldSearcher) {
		customField.setCustomFieldSearcher(paramCustomFieldSearcher);
	}

	@Override
	public void store() {
		customField.store();
	}

	@Override
	public boolean isEditable() {
		return customField.isEditable();
	}

	@Override
	public Long getIdAsLong() {
		return customField.getIdAsLong();
	}

	@Override
	public List<FieldConfigScheme> getConfigurationSchemes() {
		return customField.getConfigurationSchemes();
	}

	@Override
	public Options getOptions(String paramString, FieldConfig paramFieldConfig, JiraContextNode paramJiraContextNode) {
		return customField.getOptions(paramString, paramFieldConfig, paramJiraContextNode);
	}

	@Override
	public FieldConfig getRelevantConfig(Issue paramIssue) {
		return customField.getRelevantConfig(paramIssue);
	}

	@Override
	public void validateFromActionParams(Map paramMap, ErrorCollection paramErrorCollection, FieldConfig paramFieldConfig) {
		customField.validateFromActionParams(paramMap, paramErrorCollection, paramFieldConfig);
	}

	@Override
	public List<GenericValue> getAssociatedProjectCategories() {
		return customField.getAssociatedProjectCategories();
	}

	@Override
	public List<GenericValue> getAssociatedProjects() {
		return customField.getAssociatedProjects();
	}

	@Override
	public List<GenericValue> getAssociatedIssueTypes() {
		return customField.getAssociatedIssueTypes();
	}

	@Override
	public boolean isGlobal() {
		return customField.isGlobal();
	}

	@Override
	public boolean isAllProjects() {
		return customField.isAllProjects();
	}

	@Override
	public boolean isAllIssueTypes() {
		return customField.isAllIssueTypes();
	}

	@Override
	public boolean isEnabled() {
		return customField.isEnabled();
	}

	@Override
	public CustomFieldType getCustomFieldType() {
		return this.customFieldType;
	}

	@Override
	public FieldConfig getRelevantConfig(IssueContext paramIssueContext) {
		return customField.getRelevantConfig(paramIssueContext);
	}

	@Override
	public FieldConfig getReleventConfig(SearchContext paramSearchContext) {
		return customField.getReleventConfig(paramSearchContext);
	}

	@Override
	public ClauseNames getClauseNames() {
		return customField.getClauseNames();
	}

	@Override
	public String getColumnHeadingKey() {
		return customField.getColumnHeadingKey();
	}

	@Override
	public String getColumnCssClass() {
		return customField.getColumnCssClass();
	}

	@Override
	public String getDefaultSortOrder() {
		return customField.getDefaultSortOrder();
	}

	@Override
	public SortComparatorSource getSortComparatorSource() {
		return customField.getSortComparatorSource();
	}

	@Override
	public LuceneFieldSorter getSorter() {
		return customField.getSorter();
	}

	@Override
	public String getColumnViewHtml(FieldLayoutItem paramFieldLayoutItem, Map paramMap, Issue paramIssue) {
		return customField.getColumnViewHtml(paramFieldLayoutItem, paramMap, paramIssue);
	}

	@Override
	public String getHiddenFieldId() {
		return customField.getHiddenFieldId();
	}

	@Override
	public String prettyPrintChangeHistory(String paramString) {
		return customField.prettyPrintChangeHistory(paramString);
	}

	@Override
	public String prettyPrintChangeHistory(String paramString, I18nHelper paramI18nHelper) {
		return customField.prettyPrintChangeHistory(paramString, paramI18nHelper);
	}

	@Override
	public String getId() {
		return customField.getId();
	}

	@Override
	public String getNameKey() {
		return customField.getNameKey();
	}

	@Override
	public String getName() {
		return customField.getName();
	}

	@Override
	public int compareTo(Object o) {
		return customField.compareTo(o);
	}

	@Override
	public List getConfigurationItemTypes() {
		return customField.getConfigurationItemTypes();
	}

	@Override
	public String getCreateHtml(FieldLayoutItem paramFieldLayoutItem, OperationContext paramOperationContext, Action paramAction, Issue paramIssue) {
		return customField.getCreateHtml(paramFieldLayoutItem, paramOperationContext, paramAction, paramIssue);
	}

	@Override
	public String getCreateHtml(FieldLayoutItem paramFieldLayoutItem, OperationContext paramOperationContext, Action paramAction, Issue paramIssue, Map paramMap) {
		return customField.getCreateHtml(paramFieldLayoutItem, paramOperationContext, paramAction, paramIssue, paramMap);
	}

	@Override
	public String getEditHtml(FieldLayoutItem paramFieldLayoutItem, OperationContext paramOperationContext, Action paramAction, Issue paramIssue) {
		return customField.getEditHtml(paramFieldLayoutItem, paramOperationContext, paramAction, paramIssue);
	}

	@Override
	public String getEditHtml(FieldLayoutItem paramFieldLayoutItem, OperationContext paramOperationContext, Action paramAction, Issue paramIssue, Map paramMap) {
		return customField.getEditHtml(paramFieldLayoutItem, paramOperationContext, paramAction, paramIssue, paramMap);
	}

	@Override
	public String getBulkEditHtml(OperationContext paramOperationContext, Action paramAction, BulkEditBean paramBulkEditBean, Map paramMap) {
		return customField.getBulkEditHtml(paramOperationContext, paramAction, paramBulkEditBean, paramMap);
	}

	@Override
	public String getViewHtml(FieldLayoutItem paramFieldLayoutItem, Action paramAction, Issue paramIssue) {
		return customField.getViewHtml(paramFieldLayoutItem, paramAction, paramIssue);
	}

	@Override
	public String getViewHtml(FieldLayoutItem paramFieldLayoutItem, Action paramAction, Issue paramIssue, Map paramMap) {
		return customField.getViewHtml(paramFieldLayoutItem, paramAction, paramIssue, paramMap);
	}

	@Override
	public String getViewHtml(FieldLayoutItem paramFieldLayoutItem, Action paramAction, Issue paramIssue, Object paramObject, Map paramMap) {
		return customField.getViewHtml(paramFieldLayoutItem, paramAction, paramIssue, paramObject, paramMap);
	}

	@Override
	public boolean isShown(Issue paramIssue) {
		return customField.isShown(paramIssue);
	}

	@Override
	public void populateDefaults(Map paramMap, Issue paramIssue) {
		customField.populateDefaults(paramMap, paramIssue);
	}

	@Override
	public void populateFromParams(Map paramMap1, Map paramMap2) {
		customField.populateFromParams(paramMap1, paramMap2);
	}

	@Override
	public void populateFromIssue(Map paramMap, Issue paramIssue) {
		customField.populateFromIssue(paramMap, paramIssue);
	}

	@Override
	public void validateParams(OperationContext paramOperationContext, ErrorCollection paramErrorCollection, I18nHelper paramI18nHelper, Issue paramIssue, FieldScreenRenderLayoutItem paramFieldScreenRenderLayoutItem) {
		customField.validateParams(paramOperationContext, paramErrorCollection, paramI18nHelper, paramIssue, paramFieldScreenRenderLayoutItem);
	}

	@Override
	public Object getDefaultValue(Issue paramIssue) {
		return customField.getDefaultValue(paramIssue);
	}

	@Override
	public void createValue(Issue paramIssue, Object paramObject) {
		customField.createValue(paramIssue, paramObject);
	}

	@Override
	public void updateValue(FieldLayoutItem paramFieldLayoutItem, Issue paramIssue, ModifiedValue paramModifiedValue, IssueChangeHolder paramIssueChangeHolder) {
		customField.updateValue(paramFieldLayoutItem, paramIssue, paramModifiedValue, paramIssueChangeHolder);
	}

	@Override
	public void updateIssue(FieldLayoutItem paramFieldLayoutItem, MutableIssue paramMutableIssue, Map paramMap) {
		customField.updateIssue(paramFieldLayoutItem, paramMutableIssue, paramMap);
	}

	@Override
	public void removeValueFromIssueObject(MutableIssue paramMutableIssue) {
		customField.removeValueFromIssueObject(paramMutableIssue);
	}

	@Override
	public boolean canRemoveValueFromIssueObject(Issue paramIssue) {
		return customField.canRemoveValueFromIssueObject(paramIssue);
	}

	@Override
	public MessagedResult needsMove(Collection paramCollection, Issue paramIssue, FieldLayoutItem paramFieldLayoutItem) {
		return customField.needsMove(paramCollection, paramIssue, paramFieldLayoutItem);
	}

	@Override
	public void populateForMove(Map paramMap, Issue paramIssue1, Issue paramIssue2) {
		customField.populateForMove(paramMap, paramIssue1, paramIssue2);
	}

	@Override
	public boolean hasValue(Issue paramIssue) {
		return customField.hasValue(paramIssue);
	}

	@Override
	public String availableForBulkEdit(BulkEditBean paramBulkEditBean) {
		return customField.availableForBulkEdit(paramBulkEditBean);
	}

	@Override
	public Object getValueFromParams(Map paramMap) throws FieldValidationException {
		return customField.getValueFromParams(paramMap);
	}

	@Override
	public void populateParamsFromString(Map paramMap, String paramString, Issue paramIssue) throws FieldValidationException {
		customField.populateParamsFromString(paramMap, paramString, paramIssue);
	}

	@Override
	public SearchHandler createAssociatedSearchHandler() {
		return customField.createAssociatedSearchHandler();
	}

	@Override
	public String getValueFromIssue(Issue paramIssue) {
		return customField.getValueFromIssue(paramIssue);
	}

	@Override
	public boolean isRenderable() {
		return customField.isRenderable();
	}
}