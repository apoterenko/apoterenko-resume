/**
 * @class Workflow.Application
 */
Ext.define('Workflow.Application', {
	extend: 'Ext.app.Application',

	requires: [
		'Ext.app.Application'
	],

	name: 'Workflow',

	/**
	 * @public
	 */
	launch: function () {
		Ext.data.StoreManager.lookup('menuTreeStore').load();
	}
});