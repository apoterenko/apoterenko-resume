package qiwi.jira.plugins.pipeline;

import qiwi.jira.plugins.job.pipeline.PipelineEntity;

class PipelineEntityValueProcessor implements PipelineEntityProcessor {

	@Override
	public PipelineEntity process(PipelineEntity entity, Object newValue) {
		final Double newDoubleValue = toDouble(newValue);
		if (newDoubleValue == null) {
			return entity;
		}
		return entity.setValue(newDoubleValue);
	}

	private Double toDouble(Object value) {
		if (value == null) {
			return null;
		}
		try {
			return Double.parseDouble(extractValue(value));
		} catch (Exception e) {
			return null;
		}
	}

	private String extractValue(Object value) {
		if (value == null) {
			return null;
		}
		return ((String[]) value)[0];
	}
}
