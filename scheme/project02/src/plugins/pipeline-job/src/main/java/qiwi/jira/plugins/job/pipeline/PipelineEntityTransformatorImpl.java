package qiwi.jira.plugins.job.pipeline;

import com.opensymphony.module.propertyset.PropertySet;
import org.springframework.stereotype.Service;

@Service("qiwi-pipeline-entity-transformator")
public class PipelineEntityTransformatorImpl implements PipelineEntityTransformator {

	@Override
	public void toPropertySet(PropertySet propertySet, PipelineEntity entity) {
		propertySet.setString("name", entity.getName());
		propertySet.setDouble("value", entity.getValue());
		propertySet.setLong("id", entity.getId());
		propertySet.setBoolean("view", entity.getView());
	}

	@Override
	public PipelineEntity fromPropertySet(PropertySet propertySet) {
		return new PipelineEntity()
			.setId(propertySet.getLong("id"))
			.setName(propertySet.getString("name"))
			.setValue(propertySet.getDouble("value"))
			.setView(propertySet.getBoolean("view"));
	}
}