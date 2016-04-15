/**
 * @class qiwi.plugin.MouseDownward
 * @singleton
 *
 * Плагин позволяет реагировать на нажатие в любой области документа, исключая нужные для конкретной части области
 * (меню, выпадающие списки и т.п.)
 *
 * Example: {
 *     xtype: 'component',
 *     plugins: ['qiwi.mouse.downward'],
 *
 *     excludeDownwardCls: ['cls-1', 'cls-2']
 *
 *     or
 *
 *     excludeDownwardCls: 'cls-1'
 * }
 */
Ext.define('qiwi.plugin.MouseDownward', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.mouse.downward',

	/**
	 * @public
	 */
	init: function (component) {
		component.addEvents('mousedownward');

		var excludeDownwardCls = [].concat(
			Ext.isDefined(component.excludeDownwardCls)
				? component.excludeDownwardCls
				: []
		);

		if (component.cls) {
			excludeDownwardCls = excludeDownwardCls.concat(
				component.cls.replace(/  /g, ' ').trim().split(' ')
			);
		}

		var collection = Ext.create('Ext.util.MixedCollection');
		collection.addAll(excludeDownwardCls);

		var scope = {
			component: component,
			excludeDownwardCls: collection
		};

		Ext.getDoc().on('mousedown', this.onMouseDown, scope);
		component.on('destroy', this.onDestroy, this, scope);
	},

	/**
	 * @private
	 */
	onDestroy: function (o, scope) {
		Ext.getDoc().un('mousedown', this.onMouseDown, scope);
	},

	/**
	 * @private
	 */
	onMouseDown: function (e) {
		var parent,
			me = this.component;

		this.excludeDownwardCls.each(function (o) {
			parent = parent || Ext.fly(e.getTarget()).findParent('.' + o);
		});
		if (parent) {
			return;
		}

		me.fireEvent('mousedownward', me);
	}
});