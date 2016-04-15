/**
 * @class Workflow.view.form.TreeTable
 */
Ext.define('Workflow.view.form.TreeTable', {
	extend: 'Ext.tree.Panel',

	requires: [
		'Workflow.data.TreeStore',
		'Workflow.view.form.Grid',
		'Ext.tree.Panel',
		'Ext.form.field.Field'
	],

	mixins: [
		'Workflow.view.form.Grid',
		'Ext.form.field.Field'
	],

	rootVisible: false,

	firstColumnXType: 'treecolumn',

	/**
	 * @inheritdoc
	 */
	initComponent: function () {
		this.initGridComponent('Workflow.data.TreeStore');

		this.callParent(arguments);
		this.bindDataPreparer();
	}
});