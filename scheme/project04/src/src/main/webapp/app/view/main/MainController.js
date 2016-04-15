/**
 * @class Workflow.view.main.MainController
 */
Ext.define('Workflow.view.main.MainController', {
	extend: 'Ext.app.ViewController',

	requires: [
		'Workflow.view.form.Dialog',
		'Ext.app.ViewController'
	],

	alias: 'controller.main',

	listen: {
		component: {
			'#menutree': {
				itemclick: 'onMenuItemClick'
			},
			'*': {
				actiondocument: 'onActionDocument',
				destroysession: 'onDestroySession',
				loadelement: 'onLoadElement'
			}
		}
	},

	/**
	 * @public
	 */
	onMenuItemClick: function (o, record) {
		this.viewLoading(true);

		WF.JRS.doMenuAction({
			params: {
				branchId: record.getId()
			},
			scope: {
				me: this
			},
			onSuccess: this.onMenuConfigLoad
		});
	},

	/**
	 * @private
	 */
	onActionDocument: function (action, config) {
		var sbcConfig = config.sbcConfig,
			result = WF.EXR.executeOnAction(action, config);

		if (result === false) {
			return;
		}

		this.viewLoading.call(sbcConfig.getRoot(), true);

		WF.JRS.doAction({
			params: result,
			scope: {
				me: this,
				action: action,
				sbcConfig: config.sbcConfig,
				actionParameters: result
			},
			onSuccess: this.onActionDocumentLoad
		});
	},

	/**
	 * @private
	 */
	onMenuConfigLoad: function (response) {
		var me = this.me;
		this.response = response;

		me.viewLoading(false);
		me.doAppendBranch.call(this);
	},

	/**
	 * @private
	 */
	onActionDocumentLoad: function (response) {
		var me = this.me;
		this.response = response;

		me.viewLoading.call(this.sbcConfig.getRoot(), false);
		if (WF.EXR.executeOnLoadAction(this)) {
			me.doAppendBranch.call(this);
		} else {
			this.sbcConfig.getForm().close();
		}
	},

	/**
	 * @private
	 */
	doAppendBranch: function () {
		var viewTypeConfig = WF.EXR.toViewTypeConfig(this);

		switch (viewTypeConfig.type) {
			case 'main':
				this.me.view.lookupReference('maintabpanel').appendBranch(viewTypeConfig.sbcConfig);
				break;
			case 'window':
				Ext.create('Workflow.view.form.Dialog', {sbcConfig: viewTypeConfig.sbcConfig}).show();
				break;
		}
	},

	/**
	 * @private
	 */
	onDestroySession: function (o, sbcConfig) {
		WF.EXR.destroySession(sbcConfig.getFormSession());
	},

	/**
	 * @private
	 */
	onLoadElement: function () {
		WF.EXR.executeOnLoadScript.apply(WF.EXR, arguments);
	},

	/**
	 * @private
	 */
	viewLoading: function (flag) {
		(this.view || this).setLoading(flag === false ? flag : {msg: 'Пожалуйста подождите...'});
	}
});