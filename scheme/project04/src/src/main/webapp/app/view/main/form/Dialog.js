/**
 * @class Workflow.view.form.Dialog
 */
Ext.define('Workflow.view.form.Dialog', {
	extend: 'Ext.Window',

	requires: [
		'Workflow.plugin.WindowResizer',
		'Workflow.view.form.Branch',
		'Ext.Window'
	],

	mixins: [
		'Workflow.view.form.Branch'
	],

	plugins: ['window.resize'],

	modal: true,
	constrain: true,
	maximizable: true,

	minHeight: 100,
	minWidth: 100,

	/**
	 * @inheritdoc
	 */
	initComponent: function () {
		this.sbcConfig
			.initRoot(this)
			.initClientForm(this);

		SH.MX(this, this.getBranch(this.sbcConfig));
		this.callParent(arguments);
	}
});