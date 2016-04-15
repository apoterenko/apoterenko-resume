/**
 * @class Workflow.view.main.Main
 */
Ext.define('Workflow.view.main.Main', {
	extend: 'Ext.container.Container',

	requires: [
		'Workflow.view.form.TabPanel',
		'Workflow.view.menu.MenuTree',
		'Workflow.view.main.MainController',
		'Workflow.view.main.MainModel'
	],

	xtype: 'app-main',

	controller: 'main',

	viewModel: {
		type: 'main'
	},

	layout: 'border',

	cls: 'workflow',

	items: [
		{
			xtype: 'panel',
			bind: {
				title: 'СЭД'
			},
			region: 'west',
			width: 300,
			split: true,
			layout: 'fit',

			items: {
				xtype: 'workflow.menu.tree'
			}
		},
		{
			region: 'center',
			xtype: 'workflow.tab.panel',
			reference: 'maintabpanel'
		}
	]
});