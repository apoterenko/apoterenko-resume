/**
 * @class Workflow.data.TableStore
 */
Ext.define('Workflow.data.TableStore', {
	extend: 'Ext.data.Store',

	requires: [
		'Workflow.data.JsonRpcProxy',
		'Workflow.data.TableReader',
		'Ext.data.Store'
	],

	pageSize: 50,

	/**
	 * @public
	 */
	constructor: function (config) {
		config = config || {};
		config.proxy = Ext.create('Workflow.data.JsonRpcProxy', {
			api: {
				read: WF.JRA.RELOAD_ELEMENT
			},

			reader: Ext.create('Workflow.data.TableReader', config.reader)
		});

		this.callParent([config]);
	}
});