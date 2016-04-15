package qiwi.jira.persistence;

public interface PersistenceManager {

	<T extends PersistentEntity> void save(EntityTransformator<T> entityTransformator, T entity);

	<T extends PersistentEntity> T load(EntityTransformator<T> entityTransformator, Class<T> entityClass, long id);
}
