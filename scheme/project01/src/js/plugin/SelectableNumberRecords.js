/**
 * @class qiwi.plugin.SelectableNumberRecords
 * @singleton
 *
 * Плагин для постраничного тулбара. Позволяет менять количество элементов в странице
 *
 * Example: {
 *        xtype: 'pagingtoolbar',
 *        plugins: ['selectable.number.records']
 *    }
 */
Ext.define('qiwi.plugin.SelectableNumberRecords', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.selectable.number.records',

	/**
	 * @public
	 */
	init: function (component) {
		component.items.add(Ext.create('Ext.toolbar.Fill'));

		component.items.add(
			Ext.create('Ext.form.field.ComboBox', {
				queryMode: 'local',
				displayField: 'title',
				valueField: 'id',
				value: 10,
				width: 60,
				editable: false,

				store: {
					fields: ['id', 'title'],
					data: [
						{id: 10, title: '10'},
						{id: 20, title: '20'},
						{id: 50, title: '50'},
						{id: 100, title: '100'},
						{id: 500, title: '500'},
						{id: 0, title: i18n('all')}
					]
				},

				listeners: {
					scope: component,
					change: this.onSelectPageSize
				}
			})
		);
	},

	/**
	 * @private
	 */
	onSelectPageSize: function (field, value) {
		this.store.pageSize = value === 0 ? this.store.getTotalCount() : value;
		this.store.currentPage = 1;

		this.doRefresh();
	}
});