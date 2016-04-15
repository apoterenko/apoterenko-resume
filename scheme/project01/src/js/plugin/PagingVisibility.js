/**
 * @class qiwi.plugin.PagingVisibility
 * @singleton
 *
 * Плагин позволяет управлять видимостью компонентов тулбара в зависимости от количества страниц. Основная задача –
 * скрывать элементы пэйджинга, если количество страниц равно 1
 *
 * Пример работы:
 *
 * {
 *     xtype: 'pagingtoolbar',
 *     plugins: ['qiwi.paging.visibility'],
 *     store: ...
 * }
 */
Ext.define('qiwi.plugin.PagingVisibility', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.paging.visibility',

	/**
	 * @public
	 */
	init: function (toolbar) {
		if (!Ext.isDefined(toolbar.store)) {
			return;
		}

		this.initVisibilityFlag(toolbar);

		toolbar.height = toolbar.height || QW.TOOLBAR_HEIGHT;

		toolbar.store.on('load', this.doProcess, toolbar);
		toolbar.on('render', this.doProcess, toolbar);

		var store = toolbar.store,
			proxy = store.getProxy(),
			scope = {toolbar: toolbar, scope: this};

		if (proxy && Ext.isFunction(proxy.resetBuffer)) {
			/* Поддержка BufferedPolling */
			proxy.resetBuffer = Ext.Function.createSequence(proxy.resetBuffer, this.onReset, scope);
		} else {
			store.on('beforeload', this.onReset, scope);
		}
	},

	/**
	 * @private
	 */
	onReset: function () {
		this.scope.doProcess.call(this.toolbar, -1);
	},

	/**
	 * @private
	 */
	initVisibilityFlag: function (toolbar) {
		/* k = 1 <=> TB.separator*/
		var items = toolbar.items,
			k = 1,
			i = items.indexOf(toolbar.down('#first')),
			j = items.indexOf(toolbar.down('#last')) + k;


		for (; i <= j; i++) {
			toolbar.items.getAt(i).__forceChangeVisibility = true;
		}
	},

	/**
	 * @private
	 */
	doProcess: function (totalCount) {
		var s = this.store;
		if (!s) {
			return;
		}

		totalCount = totalCount === -1 ? totalCount : s.getTotalCount();

		var pageSize = s.pageSize,
			visible = Ext.isDefined(totalCount) && totalCount > pageSize;

		this.items.each(function (item) {
			if (item.__forceChangeVisibility === true) {
				if (visible) {
					item.show();
				} else {
					item.hide();
				}
			}
		}, this);
	}
});