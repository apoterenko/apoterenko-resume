/**
 * @class qiwi.plugin.ChangePriority
 * @singleton
 *
 * Плагин для View, позволяющий рендерить в колонки элементы управления вверх/вниз и пересылать события обработки от
 * этих элементов
 *
 * Example: {
 *     viewConfig: {
 *             forceFit: ...,
 *             emptyText: ...,
 *             plugins: ['qiwi.change.priority'],
 *
 *             changePriorityConfig: {
 *                     targetCls: ['cls1', 'cls2', ...],
 *                     // cls: '...',
 *                     // arrowUpCls: '...',
 *                     // arrowDownCls: '...',
 *                     // hiddenActionStyle: '...',
 *                     // actionWrapStyle: '...',
 *                     // actionStyle: '...'
 *             },
 *
 *             listeners: {
 *                     scope: this,
 *                     changepriority: function(view, currentRecord, up) {...}
 *             }
 *     }
 * }
 */
Ext.define('qiwi.plugin.ChangePriority', {
	extend: 'qiwi.plugin.AbstractColumnSupport',
	alias: 'plugin.qiwi.change.priority',

	ARROW_UP_CLS: 'icon-arrow-up2',

	ARROW_DOWN_CLS: 'icon-arrow-down2',

	ACTION_STYLE: ';width: 16px;' +
		'height: 16px;' +
		'background-repeat: no-repeat;' +
		'display: inline-block;' +
		'cursor: pointer;',

	ACTION_WRAP_STYLE: ';text-align: center;width: 100%;',

	HIDDEN_ACTION_STYLE: ';margin-left: -10000px;',

	SERVICE_CLS: '__change_priority_cls',

	/**
	 * @public
	 */
	init: function (view) {
		var cfg = view.changePriorityConfig || {},
			config = {style: cfg.actionStyle || this.ACTION_STYLE},
			cls = (cfg.cls ? ' ' + cfg.cls : ''),
			arrowUpCls = cfg.arrowUpCls || this.ARROW_UP_CLS,
			arrowDownCls = cfg.arrowDownCls || this.ARROW_DOWN_CLS;

		view.__fullChangePriorityConfig = {
			upConfig: Ext.apply({
				arrowUpCls: arrowUpCls, cls: arrowUpCls + cls, 'data-qtip': cfg.upTip || i18n('up').toString()
			}, config),
			downConfig: Ext.apply({
				arrowDownCls: arrowDownCls, cls: arrowDownCls + cls, 'data-qtip': cfg.downTip || i18n('down').toString()
			}, config),
			wrapConfig: {
				style: cfg.actionWrapStyle || this.ACTION_WRAP_STYLE,
				hiddenStyle: cfg.hiddenActionStyle || this.HIDDEN_ACTION_STYLE
			}
		};

		view.on('itemmousedown', this.onItemMouseDown, view);
		view.addEvents('changepriority');

		qiwi.plugin.ChangePriority.superclass.init.call(this, view, {targetCls: cfg.targetCls});
	},

	/**
	 * @private
	 */
	onItemMouseDown: function (o, record, item, index, e) {
		var hasArrowUpCls,
			fc = this.__fullChangePriorityConfig,
			arrowUpCls = fc.upConfig.arrowUpCls,
			arrowDownCls = fc.downConfig.arrowDownCls,
			el = Ext.fly(e.getTarget());

		if ((hasArrowUpCls = el.hasCls(arrowUpCls)) || el.hasCls(arrowDownCls)) {
			e.stopEvent();

			this.fireEvent('changepriority', this, record, hasArrowUpCls);
		}
	},

	/**
	 * @private
	 */
	processElement: function (el, o, index) {

		var next,
			me = this.__fullChangePriorityConfig,
			cfg = me.wrapConfig,
			isFirst = index === 0,
			isLast = index === o.elements.length - 1;

		if (isFirst || isLast) {
			el.addCls(isFirst ? 'change-priority-first' : 'change-priority-last');
		} else {
			el.addCls('change-priority-middle');
		}

		/**
		 * Мы могли бы вообще не добавлять в DOM первый и последний элемент, но тогда будут проблемы с выравниваем
		 * контента в ячейке (если контент центрирован либо по вертикали, либо по горизонтали), поэтому мы
		 * оставляем на выбор потребителю плагина – он может скрывать эти элементы любыми способами (display,
		 * visibility, infinity margins)
		 */
		(el = el.insertFirst({style: cfg.style + ' ' + (isFirst ? cfg.hiddenStyle : '')}))
			.insertFirst(me.upConfig);

		while (next = el.next()) {
			el = next;
		}

		Ext.DomHelper
			.insertAfter(el, {
				style: cfg.style + ' ' + (isLast ? cfg.hiddenStyle : '')
			}, true)
			.insertFirst(me.downConfig);
	}
});