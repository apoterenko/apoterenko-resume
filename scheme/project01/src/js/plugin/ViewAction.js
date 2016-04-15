/**
 * @class qiwi.plugin.ViewAction
 * @singleton
 *
 * Плагин позволяет оживлять компоненты в элементах View, реагирующие на действия пользователя
 *
 * Example: {
 *        xtype: 'dataview'
 *        rowEvents: 'edit, clear',
 *        plugins: ['qiwi.view.action'],
 *        listeners: {
 *            viewaction: function(o, args) {
 *                args = {event: eventName, record: record, eventObject: eventObject}
 *            }
 *        }
 *    }
 */
Ext.define('qiwi.plugin.ViewAction', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.view.action',

	init: function (view) {
		if (!Ext.isString(view.rowEvents)) {
			return;
		}

		view.rowEventsTpl = view.rowEventsTpl || 'icon-{0}';
		view.rowEvents = view.rowEvents.replace(/\ /g, '').split(',');

		view.addEvents('viewaction');
		view.on('render', this.addListenersOnViewElement, view);
	},

	addListenersOnViewElement: function () {
		var me = this,
			each = function (el, fn) {
				Ext.Array.each(me.rowEvents, function (event) {
					el.hasCls(String.format(me.rowEventsTpl, event)) && fn.apply(el, arguments);
				});
			},
			preventSelection = {};

		me.on('beforeselect', function () {
			var value = preventSelection.prevent === true;
			delete preventSelection.prevent;
			return !value;
		});

		this.on('itemmousedown', function (o, record, item, index, e) {
			each(Ext.fly(e.getTarget()), function (event) {
				if (me.fireEvent('viewaction', me, {event: event, record: record, eventObject: e}) === false) {
					preventSelection.prevent = true;
				}
			});
		}, this);

		this.getEl().on({
			scope: this,
			mouseover: function (o, e) {
				each(Ext.fly(e), function () {
					this.addCls('over');
				});
			},
			mouseout: function (o, e) {
				each(Ext.fly(e), function () {
					this.removeCls('over');
				});
			}
		});
	}
});