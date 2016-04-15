/**
 * @class qiwi.plugin.PagesMonitor
 * @singleton
 *
 * Плагин для автоматического перелистывания страниц при перезагрузке данных
 *
 * Example: {
 *        xtype: 'pagingtoolbar',
 *        plugins: ['qiwi.pages.monitor']
 *    }
 */
Ext.define('qiwi.plugin.PagesMonitor', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.pages.monitor',

	init: function (component) {
		var me = this,
			bindStore = component.bindStore,
			createSequence = this.createSequence;

		if (component.store) {
			component.store.on('beforeload', this.onBeforeLoadStore, component);
			createSequence.call(this, component);
		} else {
			component.bindStore = function (store, initial) {
				bindStore.apply(component, arguments);
				if (store) {
					store.on('beforeload', me.onBeforeLoadStore, component);
					createSequence.call(me, component);
				}
			}
		}
	},

	/**
	 * @private
	 */
	createSequence: function (component) {
		var store = component.store,
			proxy = store.getProxy();

		if (proxy && Ext.isFunction(proxy.resetBuffer)) {
			/* Поддержка BufferedPolling */
			proxy.resetBuffer = Ext.Function.createSequence(proxy.resetBuffer, this.onReset, component);
		}
	},

	/**
	 * @private
	 */
	onReset: function () {
		this.store.currentPage = 1;
	},

	/**
	 * @private
	 */
	onBeforeLoadStore: function () {
		var fn = Ext.isNumber,
			pd = this.getPageData(),
			store = this.store;

		if (fn(pd.pageCount)
			&& fn(pd.currentPage)
			&& fn(store.currentPage)
			&& store.currentPage > pd.pageCount
			&& store.getTotalCount() > 0) {

			store.currentPage = Math.min(pd.currentPage, pd.pageCount);
		}
	}
});