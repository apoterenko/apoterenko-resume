package qiwi.jira.persistence;

import com.opensymphony.module.propertyset.PropertySet;
import com.opensymphony.module.propertyset.PropertySetManager;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service("qiwi-property-set-factory")
public class PropertySetFactoryImpl implements PropertySetFactory {

	private static final String PROPERTY_SET_NAME = "ofbiz";

	@Override
	public PropertySet getInstance(Map args) {
		return PropertySetManager.getInstance(PROPERTY_SET_NAME, args);
	}
}