/**
 * @class qiwi.plugin.LocalSearch
 * @singleton
 *
 * Плагин локального поиска
 *
 * Пример работы:
 *
 * {
 *     xtype: 'pagingtoolbar',
 *     plugins: ['qiwi.local.search'],
 *
 *     localSearchConfig: {
 *          predicate: function (record) {..}
 *     }
 * }
 */
Ext.define('qiwi.plugin.LocalSearch', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.local.search',

	/**
	 * @public
	 */
	init: function (toolbar) {
		if (!Ext.isDefined(toolbar.localSearchConfig)) {
			return;
		}

		toolbar.__lsItems = this.makeItems(toolbar);
		toolbar.__lsPages = Ext.create('qiwi.plugin.local.search.Collection');
		toolbar.addEvents('activecursor');

		toolbar.store.on({
			scope: toolbar,
			load: this.onLoad,
			beforeload: this.onBeforeLoad
		});

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
		this.toolbar.down('#searchItemId').reset();
		this.scope.setText.call(this.toolbar);
	},

	/**
	 * @private
	 */
	onLoad: function () {
		var visible = this.store.data.getCount() > 0;

		Ext.each(this.__lsItems, function (itm) {
			itm.getEl().applyStyles({visibility: visible ? 'visible' : 'hidden'});
		});
	},

	/**
	 * @private
	 */
	onBeforeLoad: function () {
		Ext.each(this.__lsItems, function (itm) {
			itm.getEl().applyStyles({visibility: 'hidden'});
		});
	},

	/**
	 * @private
	 */
	onSearch: function (field, value) {

		value = value.trim();
		if (!value) {
			return;
		}

		var count,
			me = field.toolbar,
			store = me.store,
			lp = me.__lsPages,
			config = me.localSearchConfig;

		lp.clear();

		store.each(function (r, rowIndex) {
			if (config.predicate.call({value: value, field: field}, r)) {
				lp.add(rowIndex);
			}
		}, me);

		count = lp.getCount();
		if (count > 0) {
			this.loadPage.call(me, 0);
		}

		var previousItemId = me.down('#previousItemId'),
			nextItemId = me.down('#nextItemId');

		if (count === 1 || count === 0) {
			previousItemId.disable();
			nextItemId.disable();
		} else {
			previousItemId.enable();
			nextItemId.enable();
		}

		this.changeState.call(me);
		this.setText.call(me, count);
	},

	/**
	 * @private
	 */
	changeState: function () {
		var previousItemId = this.down('#previousItemId'),
			nextItemId = this.down('#nextItemId'),
			lp = this.__lsPages;

		if (!lp.getCount()) {
			return;
		}

		if (lp.isFirstPosition()) {
			previousItemId.disable();
		} else {
			previousItemId.enable();
		}

		if (lp.isLastPosition()) {
			nextItemId.disable();
		} else {
			nextItemId.enable();
		}
	},

	/**
	 * @private
	 */
	doPreviousPage: function (o) {
		var tb = o.toolbar;

		this.loadPage.call(tb, tb.__lsPages.decrementAndGetCurrentPosition());
		this.changeState.call(tb);
	},

	/**
	 * @private
	 */
	doNextPage: function (o) {
		var tb = o.toolbar;

		this.loadPage.call(tb, tb.__lsPages.incrementAndGetCurrentPosition());
		this.changeState.call(tb);
	},

	/**
	 * @private
	 */
	doSearch: function (o) {
		var field = o.toolbar.down('#searchItemId');
		this.onSearch(field, field.getRawValue());
	},

	/**
	 * @private
	 */
	setText: function (totalCount) {
		this.down('#labelItemId').setText(
			!Ext.isDefined(totalCount) ? '' :
				(totalCount
					? String.format('{0} {1}', i18n('found'), totalCount)
					: i18n('emptyMsg'))
		);

		this.doLayout();
	},

	/**
	 * @private
	 */
	makeItems: function (toolbar) {

		var me = this,
			field,
			items = [],
			config = toolbar.localSearchConfig,

			btnConfig = {
				scope: this,
				toolbar: toolbar,
				ui: 'default-toolbar'
			};

		items.push(Ext.create('Ext.toolbar.Spacer'));

		items.push(field = Ext.create('Ext.form.Text', Ext.apply({
			itemId: 'searchItemId',
			width: 100,
			emptyText: i18n('search'),
			toolbar: toolbar,

			delayTimeout: 0,
			fieldTriggerConfig: [
				{
					iconCls: Ext.baseCSSPrefix + 'form-search-trigger',
					fn: function () {
						me.doSearch(field);
					}
				}
			],

			plugins: [
				'qiwi.field.search',
				'qiwi.field.trigger'
			]
		}, config.fieldConfig)));

		field.on('search', this.onSearch, this);

		items.push(Ext.create('Ext.button.Button', Ext.apply({
			itemId: 'previousItemId',
			iconCls: 'icon-backward',
			disabled: true,
			handler: this.doPreviousPage
		}, btnConfig)));

		items.push(Ext.create('Ext.button.Button', Ext.apply({
			itemId: 'nextItemId',
			iconCls: 'icon-forward',
			disabled: true,
			handler: this.doNextPage
		}, btnConfig)));

		items.push(Ext.create('Ext.toolbar.Spacer'));

		items.push(Ext.create('Ext.form.Label', {
			itemId: 'labelItemId',
			style: 'margin-top: 4px; white-space: nowrap;'
		}));

		/* Display info support */
		var ti = toolbar.items,
			position = ti.getCount(),
			indexOfDisplayItem = ti.indexOf(ti.getByKey('displayItem')),
			diBeforeItem,
			diItem;

		if (indexOfDisplayItem > -1) {
			position = indexOfDisplayItem - 1;
			diBeforeItem = ti.get(position);
			diItem = ti.get(indexOfDisplayItem);
		}

		Ext.each(items, function (o) {
			ti.insert(position++, o);
		});

		if (diBeforeItem && diItem) {
			ti.insert(position++, diBeforeItem);
			ti.insert(position, diItem);
		}
		return items;
	},

	/**
	 * @private
	 */
	loadPage: function (index) {
		var store = this.store,
			rowIndex = this.__lsPages.getAt(index),
			pageSize = store.pageSize,
			modulo = rowIndex % pageSize,
			pageNumber = Math.ceil(rowIndex / pageSize) + (modulo === 0 ? 1 : 0);

		store.loadPage(pageNumber);

		this.fireEvent('activecursor', this, rowIndex, modulo);
	}
});

Ext.define('qiwi.plugin.local.search.Collection', {
	extend: 'Ext.util.MixedCollection',

	/**
	 * @public
	 */
	constructor: function () {
		this.callParent(arguments);

		this.clearCursorValue();
	},

	/**
	 * @public
	 */
	clear: function () {
		this.callParent(arguments);

		this.clearCursorValue();
	},

	/**
	 * @private
	 */
	clearCursorValue: function () {
		this.__cursorValue = 0;
	},

	/**
	 * @public
	 */
	isFirstPosition: function () {
		return this.__cursorValue === 0;
	},

	/**
	 * @public
	 */
	isLastPosition: function () {
		return this.__cursorValue === this.getCount() - 1;
	},

	/**
	 * @public
	 */
	incrementAndGetCurrentPosition: function () {
		return ++this.__cursorValue;
	},

	/**
	 * @public
	 */
	decrementAndGetCurrentPosition: function () {
		return --this.__cursorValue;
	}
});