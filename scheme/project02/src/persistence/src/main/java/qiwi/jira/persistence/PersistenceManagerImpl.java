package qiwi.jira.persistence;

import com.opensymphony.module.propertyset.PropertySet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service("qiwi-persistence-manager")
public class PersistenceManagerImpl implements PersistenceManager {

	private final PropertySetFactory propertySetFactory;

	@Autowired
	public PersistenceManagerImpl(PropertySetFactory propertySetFactory) {
		this.propertySetFactory = propertySetFactory;
	}

	@Override
	public <T extends PersistentEntity> void save(EntityTransformator<T> entityTransformator, T entity) {
		final Map<String, Object> persistEntity = toPersistentEntity(entity.getClass(), entity.getId());
		entityTransformator.toPropertySet(getInstance(persistEntity), entity);
	}

	@Override
	public <T extends PersistentEntity> T load(EntityTransformator<T> entityTransformator, Class<T> entityClass, long id) {
		final Map<String, Object> persistEntity = toPersistentEntity(entityClass, id);
		final PropertySet propertySet = getInstance(persistEntity);
		return isEmpty(propertySet) ? null : entityTransformator.fromPropertySet(propertySet);
	}

	private boolean isEmpty(PropertySet propertySet) {
		return propertySet.getKeys().isEmpty();
	}

	private PropertySet getInstance(Map<String, Object> persistentEntity) {
		return propertySetFactory.getInstance(persistentEntity);
	}

	private <T extends PersistentEntity> Map<String, Object> toPersistentEntity(Class<T> entityClass, long id) {
		final Map<String, Object> persistEntity = new HashMap<String, Object>();
		persistEntity.put("delegator.name", "default");
		persistEntity.put("entityName", entityClass.getSimpleName());
		persistEntity.put("entityId", id);
		return persistEntity;
	}
}
