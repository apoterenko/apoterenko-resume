/**
 * @class qiwi.plugin.ArrowColumn
 * @singleton
 *
 * Плагин для View позволяет вставить иконку-экшен к колонку в конец
 *
 * Example: {
 *     viewConfig: {
 *             plugins: ['qiwi.arrow.column'],
 *
 *             arrowColumnConfig: {
 *                 targetCls: '...',
 *
 *                 // scope: this,
 *
 *                 handler: function(view, recordIndex) {...}
 *             }
 *     }
 * }
 */
Ext.define('qiwi.plugin.ArrowColumn', {
	extend: 'qiwi.plugin.AbstractColumnSupport',
	alias: 'plugin.qiwi.arrow.column',

	SERVICE_CLS: '__arrow_column_cls',

	/**
	 * @public
	 */
	init: function (view) {
		qiwi.plugin.ArrowColumn.superclass.init.call(this, view, {
			targetCls: view.arrowColumnConfig.targetCls
		});
	},

	/**
	 * @private
	 */
	processElement: function (el, o, index) {
		var view = this,
			cfg = this.arrowColumnConfig;

		el.down('.' + Ext.baseCSSPrefix + 'grid-cell-inner').applyStyles({'float': 'left'});

		var target = Ext.create('Ext.Button', {
			renderTo: el,

			ui: 'default-toolbar',
			cls: 'qiwi-arrow-column ' + (cfg.cls || ''),
			iconCls: cfg.iconCls || 'icon-arrow-down',

			handler: function () {
				cfg.handler.call(cfg.scope || view, view, index, target);
			}
		});
	}
});