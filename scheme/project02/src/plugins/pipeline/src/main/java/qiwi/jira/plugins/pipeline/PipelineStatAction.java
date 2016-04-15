package qiwi.jira.plugins.pipeline;

import org.springframework.beans.factory.annotation.Autowired;
import qiwi.jira.plugins.job.pipeline.PipelineStatConstants;
import qiwi.jira.security.PermissionManager;

import java.util.List;

public class PipelineStatAction extends PipelineAction {

	private static final long serialVersionUID = 8586637222642412859L;

	private final PipelineStatProcessor pipelineStatProcessor;

	@Autowired
	public PipelineStatAction(
		PermissionManager permissionManager,
		PipelineStatProcessor pipelineStatProcessor
	) {
		super(permissionManager);
		this.pipelineStatProcessor = pipelineStatProcessor;
	}

	protected List<PipelineStatEntity> process() throws Exception {
		try {
			return pipelineStatProcessor.process();
		} catch (Exception e) {
			log.error("PipelineStat action exception on loadStatistics", e);
			throw e;
		}
	}

	@Override
	protected void initRequest() throws Exception {
		request.setAttribute("pipelineStatEntities", process());
		request.setAttribute("totalMonthCount", PipelineStatConstants.TOTAL_MONTH_COUNT);
	}
}