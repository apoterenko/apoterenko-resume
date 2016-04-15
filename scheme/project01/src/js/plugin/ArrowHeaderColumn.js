/**
 * @class qiwi.plugin.ArrowHeaderColumn
 * @singleton
 *
 * Плагин позволяет добавлять в заголовок таблицы кнопку управления
 *
 * Example: {
 *     viewConfig: {
 *             plugins: ['qiwi.arrow.header.column'],
 *
 *             arrowHeaderColumnConfig: {
 *                 1: {
 *                             btnCfg: {...},
 *                             controlledStore: true, // Кнопка будет скрываться или показываться в зависимости от существования данных
 *
 *                             scope: this,
 *                             handler: ...
 *                 }
 *             }
 *     }
 * }
 */
Ext.define('qiwi.plugin.ArrowHeaderColumn', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.arrow.header.column',

	/**
	 * @public
	 */
	init: function (view) {
		if (!Ext.isDefined(view.arrowHeaderColumnConfig)) {
			return;
		}

		view.on('afterrender', this.onAfterRender, view);
	},

	/**
	 * @private
	 */
	onAfterRender: function () {
		var column,
			cfg = this.arrowHeaderColumnConfig,
			item,
			btn,
			store = this.store,
			onLoad = function (s) {
				btn[s.getTotalCount() ? 'show' : 'hide']();
			};

		for (var i in cfg) {
			if (!cfg.hasOwnProperty(i)) {
				continue;
			}

			column = this.getHeaderAtIndex(i);
			item = cfg[i];

			btn = Ext.create('Ext.Button', Ext.merge({
				renderTo: column.getEl().child('.' + Ext.baseCSSPrefix + 'column-header-inner'),

				ui: 'default-toolbar',
				cls: 'qiwi-arrow-header-column',

				iconCls: item.iconCls || 'icon-arrow-down',

				text: Ext.isDefined(item.text) ? item.text : '',

				scope: item.scope || this,
				handler: item.handler
			}, item.btnCfg));

			if (store && item.controlledStore === true) {
				btn.hide();
				store.on({
					scope: btn,
					load: onLoad,
					beforeload: btn.hide
				});
			}
		}
	}
});