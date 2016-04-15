/**
 * @class qiwi.plugin.AutoPageSize
 * @singleton
 *
 * Автоматический расчет числа страниц при пагинации
 *
 * Пример работы:
 *
 * {
 *     xtype: ...,
 *
 *     view: {
 *         store: ...
 *     },
 *
 *     autoPageSizeConfig: {
 *          itemHeight: ...,
 *          reload: ...,            // Если выставлено в true – мы перегружаем store
 *          onlyChangePageSize: ... // Если true – то единственное предназначение плагина – корректировать pageSize
 *     },
 *
 *     plugins: ['qiwi.auto.page.size'],
 *     ...
 * }
 */

Ext.define('qiwi.plugin.AutoPageSize', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.auto.page.size',

	/**
	 * @public
	 */
	init: function (target) {
		var store,
			proxy,
			view = target.view,
			config = target.autoPageSizeConfig;

		if (!Ext.isDefined(view)) {
			return;
		}

		view.__autoPageSizeConfig = Ext.apply({target: target}, config);
		view.addEvents('changepagesize');

		target.on('render', function () {
			view.on('resize', this.onViewResize, this);
		}, this);

		store = view.store;
		proxy = store.getProxy();

		if (store &&
			proxy &&
			Ext.isFunction(proxy.afterRequest) &&
			(!Ext.isDefined(config) || !Ext.isDefined(config.itemHeight))) {
			/**
			 * Нам необходимо предварительно вызвать refresh для страницы сразу после загрузки данных, чтобы динамически
			 * вычислить размер строки при втором вызове на resize событии сразу же после загрузки. Либо мы вызываем
			 * doRefresh предварительно (поэтому здесь добавлен сиквенс), либо сразу задаем itemHeight такой, какой
			 * нужно – но нам неудобно всегда и везде так делать, поэтому приходится вызывать doRefresh перед киданием
			 * событий resize от view, когда первый элемент уже отрендерен и мы можем взять его высоту
			 */
			proxy.afterRequest = Ext.Function.createSequence(proxy.afterRequest, function () {
				this.doRefresh.call(view);
			}, this);
		}
	},

	/**
	 * @public
	 */
	onViewResize: function (view, forceAll) {
		view.store && this.doRefresh.call(view, forceAll);
	},

	/**
	 * @public
	 */
	doRefresh: function (forceAll) {
		if (this.store.pageSize === QW.INFINITY_PAGE_SIZE) {

			proxy = this.store.getProxy();
			if (Ext.isFunction(proxy.isLoaded) && proxy.isLoaded()) {
				/**
				 * Перегружаем store, только если он имеет буферизированный прокси, данные загружены и мы сами
				 * инициировали resize (вручную)
				 */
				forceAll === true && this.store.load();
			}
			return;
		}

		var ps,
			first,
			proxy,
			store = this.store,
			height = this.getHeight(),
			cfg = this.__autoPageSizeConfig,
			autoCorrectionPageSize = cfg.autoCorrectionPageSize,
			oldPageSize = store.pageSize,
			itemHeight = cfg.itemHeight,
			defaultItemHeight = 10;

		if (!this.__rowHeight && !Ext.isDefined(itemHeight)) {
			first = this.all.first();
			if (first) {
				this.__rowHeight = first.getHeight();
			}
		}

		ps = Math.max(1, Math.floor(height / (this.__rowHeight || itemHeight || defaultItemHeight)));

		if (ps !== oldPageSize || forceAll === true) {
			/**
			 * Если во view помимо записей есть еще заголовки и т.п., то мы должны корректировать количество строк на странице
			 */
			store.pageSize = Ext.isFunction(autoCorrectionPageSize) ? autoCorrectionPageSize.call(this, ps) : ps;

			if (cfg.onlyChangePageSize !== true) {
				if (cfg.reload === true) {
					/**
					 * Если, например, используется ридер qiwi.data.reader.PaginationJson, то мы должны перегружать сырые
					 * данные из источника порциями, поэтому нам каждый раз нужно явно инициировать загрузку данных
					 */
					proxy = store.getProxy();

					if (!Ext.isFunction(proxy.isLoaded) || proxy.isLoaded()) {

						/**
						 * В данном случае необходимо, чтобы плагин qiwi.plugin.PagesMonitor отработал раньше, чем
						 * произойдет вызов load у Store – то есть заблаговременно вычислил currentPage и сохранил значение
						 * в Store, т.к. на вход в функцию load идет хеш {limit: …, start: …}, который в  свою очередь
						 * инициализирует Operation, которым в свою очередь манипулирует Proxy для передачи в ридер
						 * пагинации значений limit и start.
						 */
						store.fireEvent('beforeload');

						/**
						 * Операция load в данном случае может вызвать запрос к серверу. Но в данном случае, мы наверняка
						 * используем буферизированный прокси, поэтому для него первый вызов load() должен быть инициирован
						 * пользователем, поэтому вызываем здесь load() только в случае, если данные уже подгрузились
						 * (isLoaded() === true) и первый вызов не приведет к запросу на сервер
						 */
						store.load();
					}
				} else {
					/**
					 * Поддержка работы плагинов
					 */
					store.fireEvent('beforeload');
					store.fireEvent('load');

					/**
					 * Заставляем View обновиться без перезагрузки данных. Перезагрузка данных приводит к очищению всех
					 * фильтров, но нас такое поведение не устраивает – мы хотим учитывать количество элементов на страницы,
					 * даже если применен локальный фильтр или сортировка
					 */
					this.refresh();
				}
			}

			this.fireEvent('changepagesize', this, ps);
		}
	}
});