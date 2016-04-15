package qiwi.jira.specific;

import com.atlassian.jira.project.Project;
import com.atlassian.jira.project.ProjectManager;
import com.google.common.base.Function;
import com.google.common.base.Predicates;
import com.google.common.collect.Collections2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Collections;

@Component
public class DevelopmentProjectIds {

	public final Collection<Long> INSTANCE;

	@Autowired
	public DevelopmentProjectIds(final ProjectManager projectManager) {
		INSTANCE = Collections.unmodifiableCollection(
			Collections2.filter(
				Collections2.transform(
					DevelopmentProjectKey.DEVELOPMENT_PROJECT_KEYS,
					new Function<String, Long>() {

						@Override
						public Long apply(String from) {
							final Project project = projectManager.getProjectObjByKey(from);
							return project != null ? project.getId() : null;
						}
					}
				),
				Predicates.notNull()
			)
		);
	}
}