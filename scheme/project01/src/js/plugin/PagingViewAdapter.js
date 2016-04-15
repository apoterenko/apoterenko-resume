/**
 * @class qiwi.plugin.PagingViewAdapter
 * @singleton
 *
 * Плагин позволяет отображать View определенный диапазон записей из Store, используя соответствующие public-переменные Store.
 *
 * Пример работы:
 *
 * viewConfig: {
 *     plugins: ['qiwi.paging.view.adapter'],
 *     ...
 * }
 */

Ext.define('qiwi.plugin.PagingViewAdapter', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.paging.view.adapter',

	/**
	 * @public
	 */
	init: function (view) {

		var store,
			currentPage,
			pageSize,
			start,
			fn = view.collectData;

		if (Ext.isFunction(fn)) {
			view.collectData = function (records) {

				/* Защита от ребайндинга – получаем постоянно из scope */
				store = view.store;

				currentPage = store.currentPage;
				pageSize = store.pageSize;
				start = pageSize * (currentPage - 1);

				return fn.call(
					view,
					records.length <= pageSize
						? records
						: records.slice(start, start + pageSize),
					0
				);
			};
		}
	}
});