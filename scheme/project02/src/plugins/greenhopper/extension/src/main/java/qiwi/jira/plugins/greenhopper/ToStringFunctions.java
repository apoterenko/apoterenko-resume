package qiwi.jira.plugins.greenhopper;

import com.atlassian.greenhopper.model.validation.ErrorCollection;
import com.atlassian.greenhopper.model.validation.ErrorCollection.ErrorItem;
import com.atlassian.greenhopper.service.rank.RankChange;
import com.atlassian.jira.issue.Issue;
import com.google.common.base.Function;

public class ToStringFunctions {

	public static final Function<Issue, String> ISSUE
			= new Function<Issue, String>() {
				@Override
				public String apply(Issue issue) {
					return issue.getKey();
				}
			};

	public static final Function<RankChange, RankChangeStr> RANK_CHANGE_STR
			= new Function<RankChange, RankChangeStr>() {
				@Override
				public RankChangeStr apply(RankChange rankChange) {
					return new RankChangeStr(rankChange);
				}
			};

	public static final Function<ErrorItem, ErrorItemStr> ERROR_ITEM_STR
			= new Function<ErrorCollection.ErrorItem, ErrorItemStr>() {
				@Override
				public ErrorItemStr apply(ErrorItem errorItem) {
					return new ErrorItemStr(errorItem);
				}
			};
}
