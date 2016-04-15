/**
 * Workflow.data.JsonRpcProxy
 */
Ext.define('Workflow.data.JsonRpcProxy', {
	extend: 'Ext.data.proxy.Server',

	alias: 'proxy.jsonrpc',

	requires: [
		'Ext.data.ResultSet',
		'Ext.direct.Manager'
	],

	/**
	 * @inheritdoc
	 */
	constructor: function () {
		this.callParent(arguments);

		this.previousParameters = {};

		this.makeParamsCallbacks = {
			read: this.makeParamsByReadOperation
		};
	},

	/**
	 * @inheritdoc
	 */
	extractResponseData: function (data) {
		return data;
	},

	/**
	 * @inheritdoc
	 */
	doRequest: function (operation) {
		var method = this.api[operation.action],
			remoteMethod = WF.JRS[method],
			params = this.makeParamsByOperation(operation),
			scope = {
				proxy: this,
				method: method,
				params: params,
				operation: operation
			};

		if (this.rawData) {
			this.successCallback.call(scope, {
				data: this.rawData
			});
		} else {
			remoteMethod({
				params: params,
				scope: scope,
				onSuccess: this.successCallback,
				onException: this.exceptionCallback
			});
		}
	},

	/**
	 * @private
	 */
	makeParamsByOperation: function (operation) {
		var pp,
			sbc = this.sbcConfig,
			action = operation.action,
			callback = this.makeParamsCallbacks[action],
			params = goog.isFunction(callback) ? callback.call(this, operation) : [];

		SH.DEF(params) && (this.previousParameters[action] = params);

		/**
		 * Extra params
		 */
		pp = this.previousParameters[action];

		pp && SH.OFE(pp, function (o, key) {
			if (goog.string.endsWith(key, '__page')) {
				pp[key] = operation.getPage();
			}
		});

		pp && SH.DNN(sbc) && sbc.applySessionKey(pp);

		return this.previousParameters[action];
	},

	/**
	 * @private
	 */
	makeParamsByReadOperation: function (operation) {
		var wfElement = this.wfElement,
			operationConfig = operation.config,
			params = Ext.applyIf(operation.getParams(), {id: operation.config.id}),
			nodeData = SH.PATH(operationConfig, 'node.data');

		if (SH.DNN(wfElement) && SH.DNN(nodeData)) {
			/**
			 * Tree load
			 */
			params = params || {};
			params.id = wfElement.getId();

			params[wfElement.getName() + '_params'] = [
				{
					parentId: operationConfig.node.data._id
				}
			];
		}
		return params;
	},

	/**
	 * @private
	 */
	successCallback: function (response) {
		var resultSet = this.proxy.getReader().read(response);
		this.operation.process(resultSet, this.params, response);
	},

	/**
	 * @private
	 */
	exceptionCallback: function (response) {
		// TODO
	},

	/**
	 * @public
	 */
	loadRawData: function (data) {
		this.rawData = data;
	},

	/**
	 * @public
	 */
	resetRawData: function () {
		delete this.rawData;
	},

	/**
	 * @public
	 */
	setPreviousParameters: function (action, parameters) {
		this.previousParameters[action] = parameters;
	}
});