/**
 * @class Workflow.view.form.FileAttachments
 */
Ext.define('Workflow.view.form.FileAttachments', {
	extend: 'Ext.panel.Panel',

	requires: [
		'Workflow.plugin.ElementResize',
		'Ext.layout.container.HBox',
		'Ext.form.field.Field',
		'Ext.button.Button',
		'Ext.panel.Panel'
	],

	plugins: ['element.resize'],

	mixins: [
		'Ext.form.field.Field'
	],

	height: 160,

	layout: 'fit',

	cls: 'sencha-wf-file',

	/**
	 * @public
	 */
	elementResizeConfig: {
		preventYResize: true
	},

	/**
	 * @inheritdoc
	 */
	initComponent: function () {
		this.tbar = Ext.create('Ext.toolbar.Toolbar', {
			items: [
				{xtype: 'button', text: 'прикрепить файлы'},
				{xtype: 'button', text: 'скачать'},
				{xtype: 'button', text: 'удалить'}
			]
		});

		this.callParent(arguments);

		this.add({
			cls: 'sencha-wf-file-item',
			width: 100
		});
	}
});