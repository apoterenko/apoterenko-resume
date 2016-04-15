/**
 * @class qiwi.plugin.ViewKeyNavigator
 * @singleton
 *
 * Плагин, который является дополнением к плагину qiwi.plugin.QuickSearch. Позволяет дополнять поведение с
 * использованием клавиш вверх/вниз.
 *
 * Example: {
 *     xtype: 'field',
 *     plugins: ['qiwi.view.key.navigator'],
 *
 *     getView: function() {
 *         return "instance of <view>"
 *     }
 * }
 */
Ext.define('qiwi.plugin.ViewKeyNavigator', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.view.key.navigator',

	/**
	 * @public
	 */
	init: function (field) {
		field.on({
			scope: this,
			upkey: this.onUpKey,
			downkey: this.onDownKey,
			afterrender: this.onAfterRender
		});
	},

	/**
	 * Здесь, мы уже точно знаем, что основной плагин закончил свою инициализацию, поэтому дальнейшее изменение
	 * поведения делаем в этой секции
	 *
	 * @private
	 */
	onAfterRender: function (field) {
		this.getView(field).on('beforehide', this.onBeforeHide, this, {field: field});
		this.rebindSearchEvent(field);
	},

	/**
	 * @private
	 */
	onUpKey: function (field) {
		if (!this.canHighlight(field)) {
			return;
		}

		if (this.getHighlightedItem(field)) {
			var prevIndex = this.getHighlightedItemPosition(field) - 1;

			if (prevIndex >= 0) {
				this.highlightItem(field, prevIndex);
			} else {
				this.getView(field).clearHighlight();
			}
		}
	},

	/**
	 * @private
	 */
	onDownKey: function (field) {
		if (!this.canHighlight(field)) {
			return;
		}

		if (this.getHighlightedItem(field)) {
			var nextIndex = this.getHighlightedItemPosition(field) + 1;

			if (this.getStore(field).getCount() > nextIndex) {
				this.highlightItem(field, nextIndex);
			}
		} else {
			this.highlightItem(field, 0);
		}
	},

	/**
	 * @private
	 */
	onSearch: function (field) {
		var me = this.me,
			listener = this.listener,
			view = me.getView(field);

		if (!me.hasHighlight(field)) {
			listener.fn.apply(listener.scope, arguments);
		} else {
			view.getSelectionModel().select(me.getRecordOfHighlightedItem(field));
		}
	},

	/**
	 * @private
	 */
	onBeforeHide: function (o, args) {
		var field = args.field,
			store = this.getStore(field),
			view = this.getView(field);

		store.getCount() && this.scrollChildIntoView(view, 0);
		view.clearHighlight();
	},

	/**
	 * @private
	 */
	getRecordOfHighlightedItem: function (field) {
		return this.getView(field).getRecord(this.getHighlightedItem(field));
	},

	/**
	 * @private
	 */
	getHighlightedItem: function (field) {
		return this.getView(field).highlightedItem;
	},

	/**
	 * @private
	 */
	getHighlightedItemPosition: function (field) {
		return this.getStore(field).indexOf(this.getRecordOfHighlightedItem(field));
	},

	/**
	 * @private
	 */
	getStore: function (field) {
		return this.getView(field).getStore();
	},

	/**
	 * @private
	 */
	getView: function (field) {
		return field.getView();
	},

	/**
	 * @private
	 */
	hasHighlight: function (field) {
		return Ext.isDefined(this.getHighlightedItem(field));
	},

	/**
	 * @private
	 */
	canHighlight: function (field) {
		var store = this.getStore(field);
		return !store.isLoading() && store.getCount() && !this.getView(field).isHidden();
	},

	/**
	 * @private
	 */
	highlightItem: function (field, position) {
		var view = this.getView(field);

		view.highlightItem(view.getNode(position));
		this.scrollChildIntoView(view, position);
	},

	/**
	 * @private
	 */
	scrollChildIntoView: function (view, position) {
		var item = view.all.item(position);
		if (item) {
			view.getTargetEl().scrollChildIntoView(item.dom, false);
		}
	},

	/**
	 * Если уже есть обработчик на событии search, то мы должны его переопределить. Нам не нужно выполнять поиск по
	 * enter в определенных случаях, поэтому мы должны найти этот обработчик-функцию и делегировать ее вызов
	 * специальному врапперу.
	 *
	 * @private
	 */
	findSearchListener: function (searchEvent) {
		var _listener;
		Ext.each(searchEvent.listeners, function (listener) {
			if (listener.ev.name === 'search') {
				_listener = listener;
				return false;
			}
		});
		return _listener;
	},

	/**
	 * @private
	 */
	rebindSearchEvent: function (field) {
		var listener,
			searchEvent = field.events['search'];

		if (!searchEvent) {
			/* Плагин qiwi.plugin.SearchField не используется */
			return;
		}

		listener = this.findSearchListener(searchEvent);
		if (!Ext.isDefined(listener)) {
			return;
		}

		field.un('search', listener.fn, listener.scope);
		field.on('search', this.onSearch, {listener: listener, me: this});
	}
});