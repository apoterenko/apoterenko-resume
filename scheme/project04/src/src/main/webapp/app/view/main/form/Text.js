/**
 * @class Workflow.view.form.Text
 */
Ext.define('Workflow.view.form.Text', {
	extend: 'Ext.form.field.Text',

	requires: [
		'Workflow.view.form.WElement',
		'Ext.form.field.Text'
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