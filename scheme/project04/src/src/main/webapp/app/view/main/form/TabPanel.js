/**
 * @class Workflow.view.form.TabPanel
 */
Ext.define('Workflow.view.form.TabPanel', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.workflow.tab.panel',

	requires: [
		'Workflow.view.form.Branch',
		'Ext.tab.Panel'
	],

	mixins: [
		'Workflow.view.form.Branch'
	],

	/**
	 * @public
	 */
	appendBranch: function (sbcConfig) {
		this.setActiveItem(
			sbcConfig
				.initRoot(this)
				.initClientForm(this.add(this.getBranch(sbcConfig)))
		);
	}
});