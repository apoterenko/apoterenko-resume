/**
 * @class Workflow.view.form.Identificator
 */
Ext.define('Workflow.view.form.Identificator', {
	extend: 'Ext.form.field.Hidden',

	requires: [
		'Workflow.view.form.WElement',
		'Ext.form.field.Hidden'
	],

	mixins: [
		'Workflow.view.form.WElement'
	],

	/**
	 * @public
	 */
	setEditable: function () {
		this.callParent(arguments);
		Workflow.view.form.WElement.prototype.setEditable.apply(this, arguments);
	},

	/**
	 * @public
	 */
	getData: function () {
		return Workflow.view.form.WElement.prototype.getData.apply(this, arguments);
	}
});