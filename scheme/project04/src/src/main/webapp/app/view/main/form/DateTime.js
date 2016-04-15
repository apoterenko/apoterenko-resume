/**
 * @class Workflow.view.form.DateTime
 */
Ext.define('Workflow.view.form.DateTime', {
	extend: 'Ext.form.field.Date',

	requires: [
		'Ext.form.field.Date'
	],

	format: 'd.m.Y',
	emptyText: 'дд.мм.гггг',

	/**
	 * @inheritdoc
	 */
	initComponent: function () {
		this.callParent(arguments);
		this.setWidth(110);
	}
});