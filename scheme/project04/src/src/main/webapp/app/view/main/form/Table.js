/**
 * @class Workflow.view.form.Table
 */
Ext.define('Workflow.view.form.Table', {
	extend: 'Ext.grid.Panel',

	requires: [
		'Workflow.view.form.CountPageListBox',
		'Workflow.data.TableStore',
		'Workflow.view.form.Grid',
		'Ext.form.field.Field',
		'Ext.form.field.Display',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Checkbox',
		'Ext.toolbar.Paging',
		'Ext.grid.Panel',
		'Ext.grid.column.Check',
		'Ext.grid.column.Date'
	],

	mixins: [
		'Workflow.view.form.Grid',
		'Ext.form.field.Field'
	],

	cls: 'sencha-wf-table',

	height: 300,

	/**
	 * @inheritdoc
	 */
	initComponent: function () {
		this.initGridComponent('Workflow.data.TableStore');

		this.tbar = this.makeToolbar();
		this.bbar = this.makeToolbar();

		this.callParent(arguments);
		this.bindDataPreparer();
	},

	/**
	 * @private
	 */
	makeToolbar: function () {
		var paging = Ext.create('Ext.toolbar.Paging', {
			beforePageText: '',
			afterPageText: 'из {0}',
			store: this.store,

			items: [
				'->',
				{xtype: 'label', text: 'Всего:'},
				this.buildServiceField('__size', 'Ext.form.field.Display'),
				{xtype: 'label', text: 'Записей на страницу:'},
				this.buildServiceField('__maxOnPage', 'Workflow.view.form.CountPageListBox', {
					width: 60,
					listeners: {
						scope: this,
						select: this.onChangePageCount
					}
				})
			]
		});
		goog.array.forEach(['#first', '#last', '#refresh'], function (a) {
			paging.down(a).setVisible(false);
		});
		paging.getInputItem().setEditable(false);
		return paging;
	},

	/**
	 * @private
	 */
	onChangePageCount: function (o, records) {
		this.store.pageSize = this.maxOnPageValue = records[0].get('value');
		this.reloadElement();
	}
});