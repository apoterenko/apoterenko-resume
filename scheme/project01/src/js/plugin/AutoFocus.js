/**
 * @class qiwi.plugin.AutoFocus
 * @alias qiwi.field.auto.focus
 * @singleton
 *
 * Плагин для view, позволяющий при активации view установить фокус на первом элементе ввода
 *
 * Example:
 *    {
 *        xtype: 'panel',
 *        plugins: ['qiwi.field.auto.focus'],
 *        ...
 *        // autoFocusSupportedEvents: [...]
 *    }
 */
Ext.define('qiwi.plugin.AutoFocus', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.field.auto.focus',

	SUPPORTED_EVENTS: ['show', 'activate', 'afterrender'],
	DELAYED_TIME_ON_FOCUS: 100,

	init: function (view) {

		var i,
			e,
			ev = view.events,
			afs = view.autoFocusSupportedEvents,
			se = (afs ? [].concat(afs) : null) || this.SUPPORTED_EVENTS;

		if (ev) {
			for (i = 0; i < se.length; i++) {
				if (ev[e = se[i]]) {
					view.on(e, this.setFocus, this, {view: view});
					/**
					 * Откликаемся только на одно событие из поддерживаемых событий, в порядке убывания приоритета –
					 * чтобы исключить множественный вызов установки фокуса
					 */
					break;
				}
			}
		}
	},

	/**
	 * @private
	 */
	setFocus: function (o, args) {
		var view = args.view || o,
			firstField = this.findField(view);

		if (firstField) {
			Ext.Function.defer(this.deferFocus, view.delayedTimeOnFocus || this.DELAYED_TIME_ON_FOCUS, firstField);
		}
	},

	/**
	 * @private
	 */
	findField: function (view) {
		var t;
		Ext.Array.each(view.query('field'), function (item) {
			if (Ext.isFunction(this.setCaretPosition) && !item.disabled && item.isVisible()) {
				t = item;
				return false;
			}
			return true;
		});
		return t;
	},

	/**
	 * @private
	 */
	deferFocus: function () {
		if (this.isDestroyed) {
			return;
		}

		this.focus();
		this.setCaretPosition(this.getRawValue().length);
	}
});