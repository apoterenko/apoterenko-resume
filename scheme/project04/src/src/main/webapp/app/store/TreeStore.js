/**
 * @class Workflow.data.TreeStore
 */
Ext.define('Workflow.data.TreeStore', {
	extend: 'Ext.data.TreeStore',

	requires: [
		'Workflow.data.JsonRpcProxy',
		'Workflow.data.TreeReader',
		'Ext.data.TreeStore'
	],

	/**
	 * @public
	 */
	constructor: function (config) {
		config = config || {};
		config.root = config.root || {};
		config.root.children = [];
		config.proxy = Ext.create('Workflow.data.JsonRpcProxy', {
			api: {
				read: WF.JRA.RELOAD_ELEMENT
			},

			reader: Ext.create('Workflow.data.TreeReader', config.reader)
		});

		this.callParent([config]);
	}
});