/**
 * @class Workflow.view.form.Action
 */
Ext.define('Workflow.view.form.Action', {
	extend: 'Ext.button.Button',

	requires: [
		'Workflow.view.form.WAction',
		'Ext.button.Button'
	],

	mixins: [
		'Workflow.view.form.WAction'
	],

	/**
	 * @inheritdoc
	 */
	initComponent: function () {
		this.initAction();
		this.callParent(arguments);
	}
});