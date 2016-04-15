/**
 * @class qiwi.plugin.LazyView
 * @singleton
 *
 * Плагин использует механизм ленивого рендеринга компонентов в документ. Плагин реагирует на изменение размера
 * контейнера и вычисляет количество элементов, которые могут теоретически в него поместиться с учетом размера элемента.
 * Размер элемента должен быть фиксированным. По мере растягивания контейнера, плагин добавляет в документ все новые
 * элементы. По мере сжатия контейнера, плагин скрывает уже добавленные в документ элементы. Хранилище Store
 * используется для определения максимального количества элементов, которые могут быть добавлены в контэйнер.
 *
 * Плагин будет работать для компонента, который реализует интерфейс:
 *
 * Component[Ext.form.Panel] = {
 *     ...
 *     getItems: function() {
 *         return "An array of child Components to be added to this container"
 *     },
 *
 *     getStore: function() {
 *         return "Instance of Ext.data.Store"
 *     },
 *
 *     getItemConfig: function() {
 *         return "The config of item"
 *     },
 *
 *     listeners: {
 *         processitem: function(container, item, record) {
 *                ...
 *         },
 *         beforeprocessitems: function(container) {
 *                ...
 *         }
 *     }
 * }
 */
Ext.define('qiwi.plugin.LazyView', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.lazy.view',

	init: function (container) {
		container.__vrTask = new Ext.util.DelayedTask();
		container.addEvents('processitem', 'beforeprocessitems');
		container.on('resize', this.doRun, this, {container: container});
		container.getStore().on('load', this.onLoad, this, {container: container});
	},

	doRun: function (container) {
		if (!container.rendered) {
			return;
		}

		if (Ext.isDefined(container.__firstItem)) {
			container.__vrTask.delay(200, this.run, this, [container]);
		} else {
			this.run(container);
		}
	},

	run: function (container) {
		this.defineBufferedValues(container);

		var store = container.getStore();
		/**
		 * Количество элементов, которые могут поместиться в контейнере
		 */
		store.pageSize = this.getContainerCapacity(container);
		/**
		 * Количество элементов, которые присутствуют в данный момент в документе
		 */
		var numberOfItemsInDocument = container.getItems().getCount();
		/**
		 * Количество элементов, которые есть в хранилище и которые можно отобразить
		 */
		var numberOfItemsForDisplay = this.prepareNumberOfItemsForDisplay(container.getStore());
		/**
		 * Количество элементов, которые присутствуют в данный момент в документе и видны
		 */
		var numberOfVisibleItemsInDocument = this.getVisibleItems(container).getCount();

		if (numberOfItemsForDisplay > numberOfVisibleItemsInDocument) {
			/**
			 * Количество записей, которые нужно отобразить - больше количества элементов, которые отображаются
			 * сейчас в документе
			 */
			if (numberOfItemsForDisplay - numberOfItemsInDocument > 0) {
				/**
				 * Нам нужно добавить необходимое количество элементов для отображения  набора. Причем добавляемые
				 * элементы становятся видимыми
				 */
				this.doAdd(container, numberOfItemsForDisplay - numberOfItemsInDocument);
			}

			if (numberOfItemsInDocument > numberOfVisibleItemsInDocument) {
				/**
				 * Те, что скрыты, вместо добавления новых – мы просто показываем их снова, т.к. их как раз не хватает,
				 * чтобы отобразить полный набор
				 */
				Ext.Array.each(container.getItems().getRange(numberOfVisibleItemsInDocument), this.setVisibleItem);
			}
		}

		if (numberOfItemsForDisplay < container.getItems().getCount()) {
			/**
			 * Скрываем, т.к. количество записей, которые нужно отобразить – меньше количества элементов, которые
			 * добавлены в документ
			 */
			this.doHide(container, numberOfItemsForDisplay);
		}

		this.doProcessItems(container);
		this.restoreFirstHiddenElement(container);
	},

	doProcessItems: function (container) {
		var s = container.getStore();

		/**
		 * Для предотвращения рекурсии – временно отвязываемся, затем снова привязываемся
		 */
		s.un('load', this.onLoad, this);
		s.fireEvent('load', container.getStore());
		s.on('load', this.onLoad, this, {container: container});

		this.processItems(container, this.getVisibleItems(container));
	},

	/**
	 * Нужно добавить часть элементов, так как контейнер может вместить больше
	 */
	doAdd: function (container, count) {
		var i, items = [];
		for (i = 0; i < count; i++) {
			items.push(container.getItemConfig());
		}
		container.add(items);
	},

	/**
	 * Нужно скрыть часть элементов, так как они все не помещаются
	 */
	doHide: function (container, start) {
		var i, item, ci = container.getItems().getRange(start);

		for (i = 0; i < ci.length; i++) {
			item = ci[i];
			this.setVisibleItem(item, false);
		}
	},

	setVisibleItem: function (itm, flag) {
		itm.setVisible(!(flag === false));
	},

	isVisibleItem: function (itm) {
		return itm.isVisible();
	},

	getContainerCapacity: function (c) {
		return Math.max(
			1,
			Math.floor(c.getWidth() / c.__bufferedValues.w) * Math.floor(c.getHeight() / c.__bufferedValues.h)
		);
	},

	getStartPage: function (container) {
		var s = container.getStore();
		return s.pageSize * (s.currentPage - 1);
	},

	prepareNumberOfItemsForDisplay: function (store) {
		var limit = store.pageSize, start = limit * (store.currentPage - 1), count = store.getCount();
		var numberOfItemsForDisplay = start + limit < count ? limit : count - start;

		if (numberOfItemsForDisplay < 0) {
			/**
			 * Если мы находимся на последней странице, и пользователь увеличивает размер контейнера, то может так
			 * случиться, что количество страниц может уменьшиться, поэтому логично перевести на ту страница, которая
			 * будет последней после всех преобразований
			 */
			store.currentPage -= 1;
			return this.prepareNumberOfItemsForDisplay(store);
		}

		return numberOfItemsForDisplay;
	},

	getVisibleItems: function (container) {
		return container.getItems().filterBy(this.isVisibleItem);
	},

	restoreFirstHiddenElement: function (c) {
		if (!c.__stylesApplied) {
			c.__firstItem.getEl().applyStyles({
				'position': 'relative',
				'margin-top': '0px'
			});
		} else {
			c.__stylesApplied = true;
		}
	},

	defineBufferedValues: function (c) {
		if (!c.__firstItem) {
			c.__firstItem = c.add(Ext.apply({style: 'position: absolute; margin-top: -10000px;'}, c.getItemConfig()));
			c.__bufferedValues = {};
		}
		c.__bufferedValues = {
			w: c.__firstItem.getWidth() || c.__bufferedValues.w,
			h: c.__firstItem.getHeight() || c.__bufferedValues.h
		};
	},

	processItems: function (container, items) {
		container.fireEvent('beforeprocessitems', container);

		var start = this.getStartPage(container), r, store = container.getStore();

		items.each(function (item) {
			/**
			 * Предполагается, что на клиентской части не будут применяться фильтры и т.п.
			 */
			r = store.getAt(start++);
			r && container.fireEvent('processitem', container, item, r);
		});
	},

	onLoad: function (a, b, c, arg, options) {
		this.doRun(options.container);
	}
});