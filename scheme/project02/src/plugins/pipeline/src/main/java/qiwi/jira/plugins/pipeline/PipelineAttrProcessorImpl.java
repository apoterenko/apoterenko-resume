package qiwi.jira.plugins.pipeline;

import com.atlassian.jira.project.Project;
import com.atlassian.jira.project.ProjectManager;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import qiwi.jira.plugins.job.pipeline.PipelineProcessor;
import qiwi.jira.plugins.job.pipeline.PipelineEntity;

import java.util.List;
import java.util.Map;

@Service("qiwi-pipeline-attr-processor")
public class PipelineAttrProcessorImpl implements PipelineAttrProcessor {

	private final PipelineProcessor pipelineProcessor;
	private final ProjectManager projectManager;
	private final PipelineFieldAccessor pipelineFieldAccessor;

	@Autowired
	public PipelineAttrProcessorImpl(
		PipelineProcessor pipelineProcessor,
		ProjectManager projectManager,
		PipelineFieldAccessor pipelineFieldAccessor
	) {
		this.pipelineProcessor = pipelineProcessor;
		this.projectManager = projectManager;
		this.pipelineFieldAccessor = pipelineFieldAccessor;
	}

	/**
	 * @param parameters Request parameters
	 * @throws Exception Exception
	 */
	@Override
	public void processEntities(Map parameters) throws Exception {
		processEntityValues(parameters, PipelineFieldAccessorEnum.ID, new PipelineEntityValueProcessor());
		processEntityValues(parameters, PipelineFieldAccessorEnum.VIEW, new PipelineEntityViewProcessor());
	}

	/**
	 * @return Persist entities
	 * @throws Exception Exception
	 */
	@Override
	public List<PipelineEntity> extractEntities() throws Exception {
		final List<PipelineEntity> pipelineEntities = Lists.newLinkedList();
		for (long id : pipelineProcessor.extractIds()) {
			PipelineEntity entity = pipelineProcessor.load(id);
			if (entity == null) {
				entity = pipelineProcessor.save(pipelineProcessor.create(id));
			}
			pipelineEntities.add(entity);
		}
		return pipelineEntities;
	}

	/**
	 * @param parameters			 Parameters
	 * @param pipelineFieldAccessorEnum "Id" field or "View" field
	 * @param valuesProcessor		ValuesProcessor
	 * @throws Exception Exception
	 */
	private void processEntityValues(
		Map parameters,
		PipelineFieldAccessorEnum pipelineFieldAccessorEnum,
		PipelineEntityProcessor valuesProcessor
	) throws Exception {
		for (final Object o : parameters.entrySet()) {
			final Map.Entry entry = (Map.Entry) o;
			final String key = entry.getKey().toString();

			final Long id = pipelineFieldAccessor.getValue(pipelineFieldAccessorEnum, key);
			if (id == null) {
				continue;
			}
			final Project project = projectManager.getProjectObj(id);
			if (project == null) {
				continue;
			}
			final PipelineEntity entity = pipelineProcessor.load(id);
			if (entity == null) {
				continue;
			}

			entity.setView(false);
			pipelineProcessor.save(valuesProcessor.process(entity, entry.getValue()));
		}
	}
}