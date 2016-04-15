/**
 * @class qiwi.plugin.EmptyStore
 * @singleton
 *
 * Плагин для отображения всплывающего сообщение при условии, что загружаемый источник данных после загрузки не содержит данных
 *
 * Example: {
 *     xtype: 'combo',
 *     plugins: ['emptystore'],
 *     emptyStoreConfig: {
 *         // Ext.tip.ToolTip config
 *     }
 * }
 */

Ext.define('qiwi.plugin.EmptyStore', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.emptystore',

	init: function (field) {
		field.emptyStoreTip = this.createTip(field);
		field.store.on('load', this.onLoadStore, this, {field: field});
	},

	onLoadStore: function (e, a, b, options, p) {
		var field = p.field,
			esc = field.emptyStoreConfig;
		if (field.store.getCount()) {
			field.emptyStoreTip.disable();
			return;
		}

		field.collapse();
		this.showTip(field, field.getEl(), (esc && esc.emptyMessage) || i18n('emptyData'));
	},

	createTip: function (field) {
		return Ext.create('Ext.tip.ToolTip',
			Ext.apply({
				renderTo: Ext.getBody(),
				anchor: 'left',
				disabled: true,
				closable: true,
				autoHide: false,
				minWidth: 150,
				maxWidth: 300,
				maxHeight: 80,
				title: i18n('titleMsg')
			}, field.emptyStoreConfig || {})
		);
	},

	showTip: function (field, target, message) {
		field.emptyStoreTip.setTarget(target);
		field.emptyStoreTip.update(message);
		field.emptyStoreTip.enable();
		field.emptyStoreTip.show();
	}
});