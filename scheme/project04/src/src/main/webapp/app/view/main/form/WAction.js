/**
 * @class Workflow.view.form.WAction
 */
Ext.define('Workflow.view.form.WAction', {
	mixinId: 'waction',

	/**
	 * @public
	 */
	initAction: function () {
		var wfElement = this.wfElement;

		this.tooltip = wfElement.getDescription() || wfElement.getTitle();
		this.name = wfElement.getName();
		this.text = wfElement.getTitle();

		SH.DNN(wfElement.getIcon()) && (this.setIcon(wfElement.getIcon()));

		if (!wfElement.isDropDownMain()) {
			this.scope = this;
			this.setHandler(this.handlerWAction);
		}
	},

	/**
	 * @public
	 */
	getSort: function () {
		return this.wfElement.getSort();
	},

	/**
	 * @public
	 */
	getAction: function () {
		return this;
	},

	/**
	 * @public
	 */
	doAction: function (a, b, c, d) {
		var newWindow,
			debug,
			callback,
			openingType;

		switch (arguments.length) {
			case 2:
				newWindow = a;
				debug = b;
				break;
			case 3:
				newWindow = a;
				debug = b;
				callback = c;
				break;
			case 4:
				openingType = a;
				newWindow = b;
				debug = c;
				callback = d;
				break;
		}

		// TODO
		console.log('TODO doAction', newWindow, debug, callback, openingType);
		this.callHandler();
	},

	/**
	 * @public
	 */
	callHandler: function () {
		SH.FN(this.handler) && this.handler();
	},

	/**
	 * @private
	 */
	handlerWAction: function () {
		var wfElement = this.wfElement,
			callbacks = wfElement.callbacks;

		if (!callbacks || !SH.GAK(callbacks)) {
			this.doWAction();
			return;
		}

		SH.OFE(callbacks, function (callback, callbackName) {
			this.doWAction(callbackName);
		}, this);
	},

	/**
	 * @private
	 */
	doWAction: function (callbackName) {
		var CDC = Workflow.view.form.ClientDataCollector,
			actionOwner = this.actionOwner,
			wfElement = this.wfElement,
			sbcConfig = this.sbcConfig,
			result = CDC.getValues(wfElement, sbcConfig),
			invalidateItems = result.invalidateItems;

		if (invalidateItems.length) {
			return;
		}

		actionOwner.fireEvent('actiondocument', wfElement, {
			callback: callbackName,
			sbcConfig: sbcConfig,
			clientData: result.values
		});
	}
});