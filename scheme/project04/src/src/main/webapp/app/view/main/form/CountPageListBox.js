/**
 * @class Workflow.view.form.CountPageListBox
 */
Ext.define('Workflow.view.form.CountPageListBox', {
	extend: 'Ext.form.field.ComboBox',

	requires: [
		'Ext.form.field.ComboBox',
		'Ext.data.Store'
	],

	editable: false,
	valueField: 'value',
	displayField: 'value',
	queryMode: 'local',

	store: Ext.create('Ext.data.Store', {
		fields: 'value',
		data: [
			{value: 10},
			{value: 20},
			{value: 30},
			{value: 40},
			{value: 50},
			{value: 100},
			{value: 500}
		]
	})
});