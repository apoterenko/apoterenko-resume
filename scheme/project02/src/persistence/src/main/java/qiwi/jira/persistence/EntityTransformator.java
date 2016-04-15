package qiwi.jira.persistence;

import com.opensymphony.module.propertyset.PropertySet;

public interface EntityTransformator<T> {

	void toPropertySet(PropertySet propertySet, T entity);

	T fromPropertySet(PropertySet propertySet);
}
