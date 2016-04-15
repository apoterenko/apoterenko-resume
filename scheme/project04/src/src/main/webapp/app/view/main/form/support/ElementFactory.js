/**
 * Workflow.view.form.ElementFactory
 */
Ext.define('Workflow.view.form.ElementFactory', {
	singleton: true,

	requires: [
		'Workflow.view.form.Boolean',
		'Workflow.view.form.DateRange',
		'Workflow.view.form.DateTime',
		'Workflow.view.form.FileAttachments',
		'Workflow.view.form.Label',
		'Workflow.view.form.ListBox',
		'Workflow.view.form.MultiSelect',
		'Workflow.view.form.Table',
		'Workflow.view.form.Text',
		'Workflow.view.form.TreeTable',
		'Workflow.view.form.LineDelimiter',
		'Workflow.view.form.Identificator',
		'Workflow.view.form.EdiTable'
	],

	/**
	 * @public
	 */
	makeComponent: function (wfElement, config) {
		var type = wfElement.type,
			component = Ext.create('Workflow.view.form.' + type, this.makeConfig(wfElement, config)),
			setError = component.setError;

		component.setError = function () {
			setError.apply(this, arguments);
			this.rendered && this.sbcConfig.getRoot().updateLayout();
		};
		return component;
	},

	/**
	 * @private
	 */
	makeConfig: function (wfElement, config) {
		var regExp = wfElement.getVerifyRegExp();

		config = Ext.merge({
			width: '100%',

			name: wfElement.getName(),
			text: wfElement.getDescription(),
			readOnly: wfElement.isReadOnly(),
			wfElement: wfElement,

			enableKeyEvents: true,
			validateOnBlur: false,
			validateOnChange: false,
			msgTarget: 'under',

			listeners: {
				scope: config,
				afterrender: this.onComponentRender,
				keydown: this.onMultiFieldKeyDown
			}
		}, config);

		if (SH.DNN(regExp)) {
			config.__regex = new RegExp(regExp);
			config.__regexText = wfElement.getVerifyError();
			config.validator = this.doValidate;
		}
		return config;
	},

	/**
	 * @private
	 */
	onComponentRender: function (component) {
		this.wfOwner.fireEvent('componentrender', this.wfOwner, component);
	},

	/**
	 * @private
	 */
	onMultiFieldKeyDown: function (component, event) {
		var button = this.sbcConfig.getActiveButton(component.wfElement);

		event.getKey() === event.ENTER && SH.DNN(button) && button.callHandler();
		component.fireEvent('componenteventkey', component, event);
	},

	/**
	 * @private
	 */
	doValidate: function (v) {
		if (this.__regex.test(v)) {
			return true;
		} else {
			return this.__regexText;
		}
	}
});