package qiwi.jira.plugins.estimate;

import com.atlassian.jira.issue.customfields.CustomFieldType;
import com.atlassian.jira.issue.fields.CustomField;

public interface EstimateFieldFactory {

	CustomField createCustomField(CustomFieldType customFieldType, String persistentFieldName);
}
