package qiwi.jira.plugins.pipeline;

import org.springframework.beans.factory.annotation.Autowired;
import qiwi.jira.plugins.job.pipeline.PipelineEntity;
import qiwi.jira.security.PermissionManager;

import java.util.List;

public class PipelineAttrAction extends PipelineAction {

	private static final long serialVersionUID = 7750765528702985891L;

	private final PipelineAttrProcessor pipelineAttrProcessor;

	@Autowired
	public PipelineAttrAction(
		PermissionManager permissionManager,
		PipelineAttrProcessor pipelineAttrProcessor
	) {
		super(permissionManager);
		this.pipelineAttrProcessor = pipelineAttrProcessor;
	}

	/**
	 * Command "processAttributes"
	 *
	 * @return Forward
	 * @throws Exception Exception
	 */
	public String doProcessAttributes() throws Exception {
		final String redirect = redirect();
		if (redirect != null) {
			return redirect;
		}
		processEntities();
		initRequest();
		return INPUT;
	}

	private void processEntities() throws Exception {
		try {
			pipelineAttrProcessor.processEntities(request.getParameterMap());
		} catch (Exception e) {
			log.error("PipelineAttr action exception on processAttributes", e);
			throw e;
		}
	}

	private List<PipelineEntity> extractEntities() throws Exception {
		try {
			return pipelineAttrProcessor.extractEntities();
		} catch (Exception e) {
			log.error("PipelineAttr action exception on extractEntities", e);
			throw e;
		}
	}

	@Override
	protected void initRequest() throws Exception {
		request.setAttribute("pipelineEntities", extractEntities());
	}
}