/**
 * @class Workflow.view.form.EdiTable
 */
Ext.define('Workflow.view.form.EdiTable', {
	extend: 'Workflow.view.form.Table',

	requires: [
		'Workflow.view.form.Table',
		'Ext.grid.plugin.CellEditing'
	],

	plugins: ['cellediting']
});