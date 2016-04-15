/**
 * @class Workflow.view.form.Boolean
 */
Ext.define('Workflow.view.form.Boolean', {
	extend: 'Ext.form.field.Checkbox',

	requires: [
		'Workflow.view.form.WElement',
		'Ext.form.field.Checkbox'
	],

	mixins: [
		'Workflow.view.form.WElement'
	],

	/**
	 * @public
	 */
	setEditable: function () {
		Workflow.view.form.WElement.prototype.setEditable.apply(this, arguments);
	}
});