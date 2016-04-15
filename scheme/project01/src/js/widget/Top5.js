/**
 * @class qiwi.field.Top5
 * Widget for associate entities many to one.
 *
 * example: {
 * 		xtype: 'qiwi.field.top5',
 * 		...
 * 		fieldDefaults: {
 * 			quickSearchConfig: qiwi.plugin.QuickSearchConfigFactory.PROVIDER()
 * 		}
 * }
 */

Ext.define('qiwi.field.Top5', {
	extend: 'Ext.form.FieldContainer',
	alias: 'widget.qiwi.field.top5',

	border: 0,

	mixins: {
		field: 'Ext.form.field.Field'
	},

	/**
	 * @default
	 */
	numberOfFields: 5,

	/**
	 * @public
	 */
	initComponent: function () {

		this.callParent(arguments);

		this.store = Ext.create('Ext.data.Store', {
			fields: ['id', 'name'],
			proxy: {
				type: 'memory'
			}
		});

		for (var i = 0; i < this.numberOfFields; i++) {
			this.add(
				Ext.applyIf({
					itemIndex: i,
					itemId: 'item' + i,
					xtype: 'qiwi.quick.search',
					listeners: {
						blselect: this.onFieldDataChange,
						cancel: this.onFieldDataChange,
						change: this.onDataChanged,
						scope: this
					},
					quickSearchConfig: this.fieldDefaults.quickSearchConfig
				}, this.fieldDefaults)
			);
		}

	},

	/**
	 * @private
	 * Backward compatibility between store and current field.__record
	 */
	onFieldDataChange: function (field, newRecord) {
		var record = field.__record;

		record.set(newRecord.data || {id: '', name: ''});
		this.onDataChanged();
	},

	/**
	 * @public
	 */
	setValue: function (values) {
		var id, record, store = this.store;

		if (values) {
			values = [].concat(values);
		}

		this.reset();
		this.originalValue = values || '';
		values && store.add(values);

		this.items.each(function (item, index) {
			record = store.getAt(index) || store.add('')[0];
			item.__record = record;
			item.setValue(record);
			item.originalValue = record.getId();
			// Reference support action
			record.commit();
		}, this);
	},

	/**
	 * @private
	 */
	reset: function() {
		this.store.removeAll(true);
		this.store.removed = [];

		this.items.each(function(item) {
			item.reset();
			delete item.__record;
			delete item.originalValue;
		}, this);
	},

	/**
	 * @public
	 */
	getValue: function () {
		var value = [];

		this.store.each(function (r) {
			r.getId() && value.push(r.data);
		});

		return value.length ? value : '';
	},

	/**
	 * @public
	 */
	onDataChanged: function () {
		this.fireEvent('dirtychange');
	},

	/**
	 * @public
	 */
	isDirty: function () {
		return !(Ext.isEmpty(this.store.getRemovedRecords()) &&
			Ext.isEmpty(this.store.getNewRecords()) &&
			Ext.isEmpty(this.store.getUpdatedRecords()));
	}

});