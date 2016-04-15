/**
 * @class Workflow.data.MenuTreeStore
 */
Ext.define('Workflow.data.MenuTreeStore', {
	extend: 'Ext.data.TreeStore',

	requires: [
		'Workflow.model.MenuTreeModel',
		'Workflow.data.MenuTreeReader',
		'Workflow.data.JsonRpcProxy',
		'Ext.util.Sorter',
		'Ext.data.TreeStore'
	],

	model: 'Workflow.model.MenuTreeModel',

	/**
	 * @public
	 */
	constructor: function (config) {
		config = config || {};
		config.proxy = Ext.create('Workflow.data.JsonRpcProxy', {
			api: {
				read: WF.JRA.GET_MENU
			},

			reader: Ext.create('Workflow.data.MenuTreeReader')
		});

		this.callParent(arguments);

		this.sorters.add(new Ext.util.Sorter({
			property: 'sort',
			direction: 'ASC'
		}));
	}
});