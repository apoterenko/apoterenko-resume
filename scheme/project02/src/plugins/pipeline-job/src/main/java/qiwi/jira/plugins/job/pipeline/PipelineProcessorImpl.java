package qiwi.jira.plugins.job.pipeline;

import com.atlassian.jira.project.Project;
import com.atlassian.jira.project.ProjectManager;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import qiwi.jira.persistence.PersistenceManager;
import qiwi.jira.specific.DevelopmentProjectIds;

import java.util.*;

@Service("qiwi-pipeline-processor")
public class PipelineProcessorImpl implements PipelineProcessor {

	private final ProjectManager projectManager;
	private final PersistenceManager persistManager;
	private final DevelopmentProjectIds developmentProjectIds;
	private final PipelineEntityTransformator pipelinePersistProcessor;

	@Autowired
	public PipelineProcessorImpl(
		ProjectManager projectManager,
		PersistenceManager persistManager,
		PipelineEntityTransformator pipelinePersistProcessor,
		DevelopmentProjectIds developmentProjectIds
	) {
		this.projectManager = projectManager;
		this.persistManager = persistManager;
		this.pipelinePersistProcessor = pipelinePersistProcessor;
		this.developmentProjectIds = developmentProjectIds;
	}

	/**
	 * Load entity
	 *
	 * @param id Entity Id
	 * @return PipelineEntity
	 */
	@Override
	public PipelineEntity load(long id) {
		return persistManager.load(
			pipelinePersistProcessor,
			PipelineEntity.class,
			id
		);
	}

	/**
	 * Save entity
	 *
	 * @param entity PipelineEntity
	 * @return PipelineEntity
	 */
	@Override
	public PipelineEntity save(PipelineEntity entity) {
		persistManager.save(pipelinePersistProcessor, entity);
		return entity;
	}

	/**
	 * Create new entity by id
	 *
	 * @param id Entity id
	 * @return PipelineEntity
	 */
	@Override
	public PipelineEntity create(long id) {
		final Project project = projectManager.getProjectObj(id);
		return new PipelineEntity()
			.setId(project.getId())
			.setName(extractProjectName(project));
	}

	/**
	 * @return List of project id
	 */
	@Override
	public Collection<Long> extractIds() {
		return developmentProjectIds.INSTANCE;
	}

	/**
	 * Extract project name
	 *
	 * @param project Project
	 * @return Project
	 */
	private String extractProjectName(Project project) {
		final List<String> projects = new LinkedList<String>();
		if (project.getKey() != null) {
			projects.add(project.getKey());
		}
		if (projects.isEmpty()) {
			projects.add(project.getName());
		}
		if (projects.isEmpty()) {
			projects.add(String.valueOf(project.getId()));
		}
		return StringUtils.join(projects.toArray());
	}
}