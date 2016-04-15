package qiwi.jira.plugins.job.pipeline;

import com.google.common.collect.Maps;
import org.apache.commons.lang.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import qiwi.jira.plugins.scheduler.EasyScheduler;
import qiwi.jira.specific.DevelopmentProjectIds;

import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

@Service("qiwi-pipeline-speed-wrapper")
public class PipelineSpeedWrapper implements PipelineSpeed {
	private static final transient Logger log = LoggerFactory.getLogger(PipelineSpeedWrapper.class);

	private static final long DEFAULT_INTERVAL = DateUtils.MILLIS_PER_MINUTE * 15;

	private final PipelineSpeed pipelineSpeed;
	private final EasyScheduler easyScheduler;
	private final DevelopmentProjectIds developmentProjectIds;

	private final AtomicReference<Map<Long, SpeedEntity>> speedCache =
		new AtomicReference<Map<Long, SpeedEntity>>(Maps.<Long, SpeedEntity>newHashMap());

	@Autowired
	public PipelineSpeedWrapper(
		@Qualifier("qiwi-pipeline-speed") PipelineSpeed pipelineSpeed,
		EasyScheduler easyScheduler,
		DevelopmentProjectIds developmentProjectIds
	) {
		this.pipelineSpeed = pipelineSpeed;
		this.easyScheduler = easyScheduler;
		this.developmentProjectIds = developmentProjectIds;
		scheduleJob();
	}

	private void scheduleJob() {
		easyScheduler.scheduleJob(new Job(), DEFAULT_INTERVAL);
		if (log.isInfoEnabled()) {
			log.info("Pipeline speed wrapper job scheduled every {} ms.", DEFAULT_INTERVAL);
		}
	}

	private class Job implements Runnable {

		@Override
		public void run() {
			final Map<Long, SpeedEntity> maps = Maps.newHashMap();
			try {
				for (long projectId : developmentProjectIds.INSTANCE) {
					maps.put(projectId, new SpeedEntity(
						pipelineSpeed.fixedSpeed(projectId),
						pipelineSpeed.calculatedSpeed(projectId)
					));
				}
			} catch (Exception e) {
				log.error("Error handling process speed...", e);
			}
			if (!maps.isEmpty()) {
				speedCache.set(maps);
			} else {
				log.warn("Pipeline speed wrapper has empty map...");
			}

			if (log.isInfoEnabled()) {
				log.info("Pipeline speed wrapper has map with size: " + maps.size());
			}
		}
	}

	@Override
	public double fixedSpeed(long projectId) {
		final SpeedEntity speedEntity = speedCache.get().get(projectId);
		return speedEntity != null ? speedEntity.getFixedSpeed() : pipelineSpeed.fixedSpeed(projectId);
	}

	@Override
	public double calculatedSpeed(long projectId) throws Exception {
		final SpeedEntity speedEntity = speedCache.get().get(projectId);
		return speedEntity != null ? speedEntity.getCalculatedSpeed() : pipelineSpeed.calculatedSpeed(projectId);
	}

	private static class SpeedEntity {

		private final double fixedSpeed;
		private final double calculatedSpeed;

		public SpeedEntity(double fixedSpeed, double calculatedSpeed) {
			this.fixedSpeed = fixedSpeed;
			this.calculatedSpeed = calculatedSpeed;
		}

		public double getFixedSpeed() {
			return fixedSpeed;
		}

		public double getCalculatedSpeed() {
			return calculatedSpeed;
		}
	}
}