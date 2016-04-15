/**
 * @class qiwi.field.QuickSearch
 * @singleton
 * Виджет поискового поля с возможностью добавления дополнительных кнопок (триггеров) а так же вьюхи с метками
 * !Внимание! полю обязательно необходимо указывать конфигуацию поисковой сущности quickSearchConfig
 *
 * @cfg {Array} fieldTriggerConfig - дополнительные триггеры для поля
 * @cfg {Boolean} useSearchTrigger - добавляет поисковый триггер
 * @cfg {quickSearchConfig} quickSearchConfig
 *
 * example: {
 * 		xtype: 'qiwi.quick.search',
 * 		...
 * 		fieldTriggerConfig: [ ... ]
 * 		useSearchTrigger: true,
 * 	    useHintView: false,
 * 		quickSearchConfig: qiwi.plugin.QuickSearchConfigFactory
 * }
 */

Ext.define('qiwi.field.QuickSearch', {
	extend: 'Ext.form.field.Text',
	alias: 'widget.qiwi.quick.search',

	/**
	 * @cfg {Boolean} добавляет стандартную кнупку "поиск"
	 */
	useSearchTrigger: false,

	/**
	 * @cfg {Boolean} добавляет плагин отображения меток
	 */
	useHintView: false,

	/**
	 * @cfg {String} css класс поискового триггера
	 */
	searchIconCls: Ext.baseCSSPrefix + 'form-search-trigger',

	/**
	 * @cfg {String} css класс триггера отмены
	 */
	cancelIconCls: Ext.baseCSSPrefix + 'form-clear-trigger',

	/**
	 * @inheritDoc
	 */
	emptyPlaceHolder: '*',

	/**
	 * @public
	 */
	initComponent: function() {

		this.plugins = (this.plugins || []).concat([
			'qiwi.display.value',
			'qiwi.quick.search',
			'qiwi.field.search',
			'qiwi.view.key.navigator'
		]);
		this.fieldTriggerConfig = this.fieldTriggerConfig || [];

		if (this.useSearchTrigger || this.fieldTriggerConfig.length) {
			this.plugins.push('qiwi.field.trigger');

			// предотвращаем поиск по таймауту
			this.delayTimeout = 0;

			// стандартный конфиг триггера
			if (this.useSearchTrigger) {
				this.fieldTriggerConfig.unshift({
					iconCls: this.searchIconCls,
					fn: this.onSearchTriggerClick,
					name: 'searchTrigger'
				});
			}
		}

		if (this.useHintView) {
			this.plugins.push('qiwi.field.hint');
			this.fieldTriggerConfig.push({
				iconCls: 'icon-add-trigger',
				fn: this.onAddHintTriggerClick
			});
			// для корректного поведения поля отключаем defer на suspendEvent
			this.quickSearchConfig.resumeEventsOnSelect = true;
		}

		this.emptyText = this.emptyText || this.emptyPlaceHolder;

		this.callParent(arguments);

		if (this.useSearchTrigger) {
			this.on('afterrender', this.addTriggerListeners, this);
		}
	},

	/**
	 * @private
	 */
	addTriggerListeners: function() {

		this.on({
			blselect: this.onFieldSearch,
			search: this.onFieldSearch,
			cancel: this.onFieldCancel,
			change: this.onFieldChange,
			rendertrigger: this.onSearchTriggerRender,
			scope: this
		});

		if (this.useHintView) {
			this.un('blselect', this.onFieldSearch, this);
			this.on('afterblselect', this.onAfterBlSelect, this);
		}

		this.quickSearchConfig.store.on({
			datachanged: this.onDataChanged,
			load: this.onFieldCancel,
			add: this.onFieldSearch,
			scope: this
		});

		// позволяет использовать '*' в качестве первого поискового запроса
		this.lastValue = this.emptyPlaceHolder;
	},

	/**
	 * @override
	 */
	setValue: function(value) {
		if (!value) {
			return;
		}

		this.callParent(arguments);
		// так как в value может прийти объект, переписываем originalValue
		this.originalValue = value;

		var record = value instanceof Ext.data.Record
			? value
			: new this.quickSearchConfig.store.model(value);

		this.fireEvent('itemclick', this, record);
		!record.getId() && this.onFieldCancel();
	},

	/**
	 * @private
	 */
	onSearchTriggerRender: function () {
		this.value && this.value !== this.emptyPlaceHolder && this.onFieldSearch();
	},

	/**
	 * @private
	 */
	onSearchTriggerClick: function() {
		var event = 'search';

		if (this.__isSearching) {
			var proxy = this.quickSearchConfig.store.getProxy();

			Ext.isFunction(proxy.abort)
				? proxy.abort()
				: Ext.Ajax.abort(proxy.currentRequest);

			event = 'cancel';

			// очищаем поле, если есть запись
			if (this.value) {
				this.reset();
			}
		}

		this.fireEvent(event, this, this.getRawValue() || this.emptyPlaceHolder);
	},

	/**
	 * @private
	 */
	onAddHintTriggerClick: function (field, trigger) {
		var record,
			value = this.getRawValue().trim();

		if (!value || value === this.emptyPlaceHolder) {
			return;
		}
		record = new this.hintStore.model();
		record.set('name', value);

		this.hintStore.add(record);
		this.setRawValue();
	},

	/**
	 * @private
	 */
	onFieldChange: function(field, newValue, oldValue) {
		if (!this.isEqual(newValue, oldValue) && (!newValue || newValue === this.emptyPlaceHolder)) {
			this.onFieldCancel();
			this.reset();
		}
	},

	/**
	 * @private
	 */
	onFieldSearch: function() {
		this.searchHandler('cancel', 'search');
		this.onDataChanged();
	},

	/**
	 * @private
	 */
	onFieldCancel: function() {
		this.searchHandler('search', 'cancel');
	},

	/**
	 * @private
	 */
	onAfterBlSelect: function(field, record) {
		this.setValue(record);
		this.reset();
	},

	/**
	 * @private
	 */
	searchHandler: function(addCls, removeCls) {
		if (!this.triggerEl) {
			return;
		}

		this.searchTrigger = this.searchTrigger || this.triggerEl.select('searchTrigger').first();

		this.__isSearching = addCls === 'cancel';

		this.searchTrigger.removeCls(this[removeCls + 'IconCls']);
		this.searchTrigger.addCls(this[addCls + 'IconCls']);
	},

	onDataChanged: function() {
		this.fireEvent('dirtychange', this);
	},

	/**
	 * @private
	 */
	reset: function() {
		this.fireEvent('change', this);
		this.focus();
		this.setRawValue();
		this.onFieldCancel();
		/* Движок справочников требует принудительного оповещения о изменении в поле*/
		this.fireEvent('dirtychange');
	},

	/**
	 * @override
	 */
	getRawValue: function() {
		var value = this.callParent(arguments);

		return value || this.emptyPlaceHolder;
	},

	/**
	 * @override
	 */
	isEqual: function (a, b) {
		if (Ext.isObject(a) && Ext.isObject(b)) {
			return Ext.Object.equals(a, b);
		} else {
			return this.callParent(arguments);
		}
	}

});