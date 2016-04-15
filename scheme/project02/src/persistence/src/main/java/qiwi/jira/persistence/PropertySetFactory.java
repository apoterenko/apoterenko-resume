package qiwi.jira.persistence;

import com.opensymphony.module.propertyset.PropertySet;

import java.util.Map;

public interface PropertySetFactory {

	PropertySet getInstance(Map args);
}
