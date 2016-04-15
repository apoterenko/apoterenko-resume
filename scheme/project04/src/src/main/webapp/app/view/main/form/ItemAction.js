/**
 * @class Workflow.view.form.ItemAction
 */
Ext.define('Workflow.view.form.ItemAction', {
	extend: 'Ext.menu.Item',

	requires: [
		'Workflow.view.form.WAction',
		'Ext.menu.Item'
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