package qiwi.jira.plugins.pipeline;

import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import qiwi.jira.plugins.job.pipeline.PipelineProcessor;
import qiwi.jira.plugins.job.pipeline.PipelineSpeed;
import qiwi.jira.plugins.job.pipeline.PipelineEntity;

import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import static qiwi.jira.plugins.job.pipeline.PipelineStatConstants.TOTAL_MONTH_COUNT;

@Service("qiwi-pipeline-stat-processor")
public class PipelineStatProcessorImpl implements PipelineStatProcessor {

	private final PipelineSpeed pipelineSpeed;
	private final PipelineProcessor pipelineProcessor;

	@Autowired
	public PipelineStatProcessorImpl(
		@Qualifier("qiwi-pipeline-speed-wrapper") PipelineSpeed pipelineSpeed,
		PipelineProcessor pipelineProcessor
	) {
		this.pipelineSpeed = pipelineSpeed;
		this.pipelineProcessor = pipelineProcessor;
	}

	/**
	 * @return List of PipelineStatEntity
	 * @throws Exception Exception
	 */
	@Override
	public List<PipelineStatEntity> process() throws Exception {
		final List<PipelineStatEntity> result = Lists.newLinkedList();
		for (long projectId : pipelineProcessor.extractIds()) {
			final PipelineEntity entity = pipelineProcessor.load(projectId);
			if (entity == null || !entity.isView()) {
				continue;
			}
			result.add(
				new PipelineStatEntity()
					.setPeriod(TOTAL_MONTH_COUNT)
					.setName(entity.getName())
					.setDate(new Date(System.currentTimeMillis()))
					.setFixedSpeed(pipelineSpeed.fixedSpeed(projectId))
					.setSpeed(pipelineSpeed.calculatedSpeed(projectId))
			);
		}
		Collections.sort(result, CALCULATED_SPEED_COMPARATOR);
		return result;
	}

	private static final Comparator<PipelineStatEntity> CALCULATED_SPEED_COMPARATOR = new Comparator<PipelineStatEntity>() {

		@Override
		public int compare(PipelineStatEntity o1, PipelineStatEntity o2) {
			if (o1 == o2) {
				return 0;
			}
			return o1.getSpeed() == o2.getSpeed() ? 0 : o2.getSpeed() > o1.getSpeed() ? 1 : -1;
		}
	};
}
