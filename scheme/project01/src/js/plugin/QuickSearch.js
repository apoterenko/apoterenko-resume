/**
 * @class qiwi.plugin.QuickSearch
 * @singleton
 *
 * Плагин быстрого поиска.
 * @cfg {Object} quickSearchConfig
 *  @param {Boolean} returnObject  // на getValue возвращает объект вида {id: 123, name: 'foobar'} вместо строчного id
 *  @param {Boolean} resumeEventsOnSelect  // после выбора из списка предотвращает задержку событий
 *
 * Example: {
 *     xtype: 'textfield',
 *     plugins: ['qiwi.quick.search'],
 *
 *     quickSearchConfig: {
 *         store: ...,
 *         valueTpl: ...,
 *         displayTpl: ...,
 *         deferEventsOnSelect: false
 *         returnObject: false
 *     }
 * }
 */
Ext.define('qiwi.plugin.QuickSearch', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.quick.search',

	/**
	 * @public
	 */
	init: function (field) {

		var tpl,
			cfg = field.quickSearchConfig,
			qs = qiwi.plugin.QuickSearchConfigFactory;

		if (!Ext.isDefined(cfg)) {
			return;
		}

		if (cfg.returnObject) {
			field.getValue = this.getValue;
			field.validator = this.validator;
		}

		if (cfg.name) {
			cfg = field.quickSearchConfig = Ext.apply(
				qs[cfg.name](cfg.arguments),
				field.quickSearchConfig
			);
		}

		if (cfg.displayTpl) {
			tpl = cfg.displayTpl = new Ext.XTemplate(cfg.displayTpl);
		}

		if (cfg.valueTpl) {
			cfg.valueTpl = new Ext.XTemplate(cfg.valueTpl);
		}

		/**
		 * Поддержка qiwi.plugin.ViewKeyNavigator
		 */
		field.getView = function () {
			return field.__qsPicker;
		};

		/**
		 * Поддержка qiwi.plugin.DisplayValue (нужен искомому для отображения значений)
		 */
		field.displayValueConfig = {

			/**
			 * @protected
			 */
			getValue: function (field) {
				return tpl && field.__qsRecord
					? tpl.apply(field.__qsRecord.data)
					: null;
			}
		};

		field.__qsPicker = this.createPicker.call(this, field);

		field.on({
			scope: this,
			search: this.onSearch,
			cancel: this.onCancel
		});
		field.on({
			scope: field,
			change: this.destroySelectedRecord,
			destroy: this.onDestroy
		});

		cfg.store.on({
			scope: field,
			load: this.onLoad,
			beforeload: this.onBeforeLoad
		});
	},

	/**
	 * @private
	 */
	onDestroy: function () {
		this.__qsPicker.destroy();
	},

	/**
	 * @private
	 */
	destroySelectedRecord: function () {
		delete this.__qsRecord;
	},

	/**
	 * @private
	 */
	onSearch: function (field, query) {
		this.destroySelectedRecord();

		if (!Ext.isDefined(query) || query === null || query === '') {
			this.hidePicker.call(field);
			return;
		}

		var store = field.quickSearchConfig.store;

		store.removeAll();
		store.getProxy().baseParams.query = query;
		store.load();
	},

	/**
	 * @private
	 */
	onCancel: function (field) {
		this.hidePicker.call(field);

		var store = field.quickSearchConfig.store,
			proxy = store.getProxy();

		if (Ext.isFunction(proxy.abort)) {
			proxy.abort();
		}
	},

	/**
	 * @private
	 */
	onBeforeLoad: function () {
		this.addCls('qiwi-quick-search-progress');
		this.__qsPicker.hide();
	},

	/**
	 * @private
	 */
	onLoad: function () {
		this.removeCls('qiwi-quick-search-progress');
		/**
		 * Верхний бордер не должен накладываться на поле ввода, поэтому смещение в -1
		 */
		this.__qsPicker.show().alignTo(this.getFocusEl(), 'tl-bl?', [0, -1]);
	},

	/**
	 * @private
	 */
	onItemClick: function (o, record) {
		this.fireEvent('blselect', this, record);

		this.__qsRecord = record;
		this.__qsPicker.hide();

		!this.hasFocus && this.focus();

		/**
		 * На поле ввода повешено много обработчиков. Подавляем выброс событий, пока мы вручную изменяем содержимое
		 */
		this.suspendEvents();

		this.setRawValue(this.quickSearchConfig.valueTpl.apply(record.data));

		this.quickSearchConfig.resumeEventsOnSelect
			? this.resumeEvents()
			: this.resumeEvents.defer(200, this);

		this.fireEvent('afterblselect', this, record);
	},

	/**
	 * @private
	 */
	hidePicker: function () {
		this.__qsPicker.hide();
	},

	/**
	 * @private
	 */
	createPicker: function (field) {
		var picker,
			cfg = field.quickSearchConfig;

		picker = Ext.create('Ext.view.BoundList', Ext.merge({

			cls: 'qiwi-view-quick-search',
			store: cfg.store,

			floating: true,
			loadMask: false,
			focusOnToFront: false,

			boundListDynamicSizeConfig: {
				maxHeight: 200,
				maxWidth: 700,
				field: field
			},

			excludeDownwardCls: [
				Ext.baseCSSPrefix + 'boundlist',
				Ext.baseCSSPrefix + 'menu'
			],

			plugins: [
				'qiwi.mouse.downward',
				'qiwi.bound.list.dynamic.size'
			]
		}, cfg.listTpl));

		picker.on(
			{
				scope: field,
				mousedownward: this.hidePicker,
				itemclick: this.onItemClick,
				select: this.onItemClick
			}
		);
		picker.relayEvents(field, ['itemclick']);

		return picker;
	},

	/**
	 * @override
	 */
	getValue: function () {
		var value = this.self.prototype.getValue.apply(this, arguments),
			record = this.__qsRecord;

		return (record && record.getId() == value)
			? record.data
			: value === this.emptyPlaceHolder ? '' : value;
	},

	/**
	 * @override
	 */
	validator: function () {
		var isValid = Ext.isDefined(this.__qsRecord) || this.getRawValue() === this.emptyPlaceHolder;

		return isValid ? true : i18n('invalidValue');
	}

});