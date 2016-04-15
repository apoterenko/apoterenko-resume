/**
 * @class Workflow.view.menu.MenuTree
 */
Ext.define('Workflow.view.menu.MenuTree', {
	extend: 'Ext.container.Container',
	alias: 'widget.workflow.menu.tree',

	requires: [
		'Workflow.data.MenuTreeStore',
		'Ext.tree.Panel',
		'Ext.container.Container'
	],

	layout: 'fit',

	/**
	 * @inheritdoc
	 */
	initComponent: function () {
		this.items = Ext.create('Ext.tree.Panel', {
			itemId: 'menutree',

			autoScroll: true,
			rootVisible: false,

			store: Ext.create('Workflow.data.MenuTreeStore', {
				storeId: 'menuTreeStore'
			})
		});

		this.callParent(arguments);
	}
});