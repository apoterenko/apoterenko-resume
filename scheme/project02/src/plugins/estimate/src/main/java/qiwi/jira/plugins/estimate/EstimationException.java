package qiwi.jira.plugins.estimate;

import java.util.Collections;
import java.util.List;

import com.google.common.collect.Lists;

public class EstimationException extends Exception {

	private static final long serialVersionUID = 7985414974432664589L;

	private final List<ProjectEstimationException> causes = Lists.newLinkedList();

	EstimationException() {
	}

	public List<ProjectEstimationException> getCauses() {
		return Collections.unmodifiableList(causes);
	}

	void addCause(ProjectEstimationException cause) {
		causes.add(cause);
	}
}
