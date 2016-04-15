/**
 * "Provide" section
 */
goog.provide('Workflow.query.QueryBuilder');
goog.provide('WF.QB');

/**
 * "Require" section
 */
goog.require("Workflow.ShortHand");
goog.require("Workflow.sandbox.UniDataTable");

/**
 * RequestBuilder implementation
 */
WF.QB = {

	/**
	 * @public
	 */
	buildCompleteListQuery: function (config) {
		var wfElement = config.wfElement,
			query = config.query,
			last = config.last,
			name = wfElement.getName(),
			table = [],
			params = {};

		if (SH.DNN(last)) {
			table = WF.UDT.create();
			table.addRow(last);
		}

		params.id = wfElement.getId();
		params[name + '__cursor'] = 0;
		params[name + '__filter'] = query;
		params['method()'] = 'getAutoCompleteList';
		params[name] = table;
		return params;
	},

	/**
	 * @public
	 */
	buildCompleteObjectQuery: function (config) {
		var wfElement = config.wfElement,
			last = config.last,
			params = {};

		if (SH.DNN(last)) {
			SH.MX(params, last);
		}

		params.id = wfElement.getId();
		params['method()'] = 'expandAutoCompleteObject';
		return params;
	}
};