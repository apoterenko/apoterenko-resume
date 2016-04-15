/**
 * @class qiwi.plugin.BoundListDynamicSize
 * @singleton
 *
 * Плагин позволяет динамически подстраивать ширину списка от содержимого
 *
 * Пример работы:
 *
 * {
 *     xtype: 'boundlist',
 *     plugins: ['qiwi.bound.list.dynamic.size'],
 *
 *     boundListDynamicSizeConfig: {
 *          maxHeight: ...,
 *          maxWidth: ...,
 *
 *          // itemHeight: ...
 *     }
 * }
 */
Ext.define('qiwi.plugin.BoundListDynamicSize', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.bound.list.dynamic.size',

	/**
	 * @public
	 */
	init: function (boundlist) {
		var cfg = boundlist.boundListDynamicSizeConfig;
		if (!Ext.isDefined(cfg)) {
			return;
		}

		boundlist.addCls('qiwi-bound-list-dynamic-size');
		boundlist.on('refresh', this.onRefresh, boundlist, {
			textMetrics: Ext.create('Ext.util.TextMetrics', Ext.getBody())
		});

		/**
		 * Мы сами управляем размерами view, поэтому нам нужно только позиционирование
		 */
		cfg.field.alignPicker = cfg.field.doAlign;

		/**
		 * Дополнительный функционал, который практически нужен всегда
		 */
		boundlist.deferEmptyText = false;
		boundlist.emptyText = Ext.String.format('<div class="empty-text">{0}</div>', i18n('emptyData'));
	},

	/**
	 * @private
	 */
	onRefresh: function (o, args) {
		var max = 0,
			itemHeight = 20,
			scrollWidth = 20,
			borderHeight = 2,
			factor = 1.05,
			tm = args.textMetrics,
			all = this.all,
			cfg = this.boundListDynamicSizeConfig,
			focusEl = cfg.field.getFocusEl(),
			fieldWidth = focusEl.getWidth();

		itemHeight = cfg.itemHeight || itemHeight;
		factor = cfg.factor || factor;

		if (!all.getCount()) {
			this.setSize(fieldWidth, itemHeight + borderHeight);
			return;
		}

		all.each(function (el) {
			max = Math.max(max, tm.getWidth(el.dom.innerHTML) * factor);
		});

		var actualHeight = itemHeight * all.getCount() + borderHeight;

		this.setSize(
			Math.max(Math.min(max, cfg.maxWidth), fieldWidth) + (actualHeight > cfg.maxHeight ? scrollWidth : 0),
			Math.min(cfg.maxHeight, actualHeight)
		);
	}
});