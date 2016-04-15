package qiwi.jira.plugins.estimate;

import com.atlassian.jira.issue.CustomFieldManager;
import com.atlassian.jira.issue.customfields.CustomFieldType;
import com.atlassian.jira.issue.fields.CustomField;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("qiwi-estimate-field-factory")
public class EstimateFieldFactoryImpl implements EstimateFieldFactory {

	private final CustomFieldManager customFieldManager;

	@Autowired
	public EstimateFieldFactoryImpl(CustomFieldManager customFieldManager) {
		this.customFieldManager = customFieldManager;
	}

	@Override
	public CustomField createCustomField(CustomFieldType customFieldType, String persistentFieldName) {
		return new EstimateCustomField(
			customFieldManager.getCustomFieldObjectByName(persistentFieldName),
			customFieldType
		);
	}
}