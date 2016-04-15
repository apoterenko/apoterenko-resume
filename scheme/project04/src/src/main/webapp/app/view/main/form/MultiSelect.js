/**
 * @class Workflow.view.form.MultiSelect
 */
Ext.define('Workflow.view.form.MultiSelect', {
	extend: 'Ext.form.field.ComboBox',

	requires: [
		'Workflow.data.TableStore',
		'Workflow.data.StoreFactory',
		'Workflow.plugin.MultiField',
		'Workflow.view.form.WElement',
		'Ext.util.MixedCollection',
		'Ext.form.field.ComboBox',
		'Ext.XTemplate'
	],

	mixins: [
		'Workflow.view.form.WElement'
	],

	plugins: ['multi.field'],

	minChars: 1,

	queryCaching: false,

	listConfig: {
		loadingText: 'Пожалуйста подождите..'
	},

	/**
	 * @inheritdoc
	 */
	initComponent: function () {
		var SF = Workflow.data.StoreFactory,
			me = this,
			storeConfig,
			fData = this.wfElement.getFormatData(true),
			fDescriptionData = this.wfElement.getFormatData(true, true),
			fields = fData.fields;

		fields = fields.concat(fDescriptionData.fields);
		goog.array.removeDuplicates(fields);

		storeConfig = {
			store: 'Workflow.data.TableStore',
			fields: fields,
			wfElement: this.wfElement,
			sbcConfig: this.sbcConfig
		};

		this.uniDataTable = WF.UDT.create();
		this.buffereData = Ext.create('Ext.util.MixedCollection');

		if (SH.DNN(fData.template)) {
			this.tplTemplate = Ext.create('Ext.XTemplate', fData.template);
		}

		if (SH.DNN(fDescriptionData.template)) {
			this.tplDescriptionTemplate = Ext.create('Ext.XTemplate',
				'<tpl for="."><div class="sencha-multi-description">',
				fDescriptionData.template,
				'</div></tpl>',
				{
					strict: true
				}
			);
		}

		this.tpl = Ext.create('Ext.XTemplate',
			'<tpl for=".">',
			'<div class="',
			Ext.baseCSSPrefix, 'boundlist-item">',
			fData.template, '{[this.getDescription(values)]}',
			'</div>',
			'</tpl>',
			{
				getDescription: function (values) {
					if (SH.DNN(me.tplDescriptionTemplate)) {
						try {
							return me.tplDescriptionTemplate.apply(values);
						} catch (ignored) {
						}
					}
					return '';
				}
			}
		);

		this.store = SF.makeInstance(storeConfig);
		this.extraStore = SF.makeInstance(storeConfig);

		this.extraStore.on('load', this.onSuccessLoadExtraStore, this);

		this.callParent(arguments);

		this.on({
			scope: this,
			select: this.onMultiSelect,
			multifieldbeforeclose: this.onMultiFieldBeforeClose
		});
	},

	/**
	 * @protected
	 */
	onFocus: function () {
		if (this.wfElement.isSuggestOnFocusGained()) {
			delete this.lastQuery;
			this.doRawQuery();
		}
	},

	/**
	 * @private
	 */
	onMultiSelect: function (o, records) {
		this.store.removeAll();

		this.setLoading(true);

		this.extraStore.load({
			params: WF.QB.buildCompleteObjectQuery({
				wfElement: this.wfElement,
				last: records[0].data
			})
		});
	},

	/**
	 * @private
	 */
	onSuccessLoadExtraStore: function (store) {
		this.setLoading(false);

		var outerData = [];
		store.each(function (record) {
			outerData.push(record.data);
		});
		store.removeAll();

		this.doLoadData(outerData);
	},

	/**
	 * @public
	 */
	doLoadData: function (outerData) {
		this.fireEvent('multifieldclear', this);

		SH.AFE(outerData, function (v) {
			this.buffereData.add(this.buffereData.getCount(), v);
			this.fireEvent('multifieldselect', this, this.tplTemplate.apply(v));
		}, this);

		WF.EXR.executeOnChangeScript(this.wfElement, {
			sbcConfig: this.sbcConfig,
			clientData: this.getFullData()
		});
	},

	/**
	 * @private
	 */
	onMultiFieldBeforeClose: function (o, index, linked, isClearAll) {
		if (isClearAll) {
			this.buffereData.removeAll();
			return true;
		}

		if (linked) {
			this.buffereData.removeRange(index, this.buffereData.getCount());
		} else {
			this.buffereData.removeAt(index);
		}
		return true;
	},

	/**
	 * @protected
	 */
	getParams: function (query) {
		return WF.QB.buildCompleteListQuery({
			query: query,
			last: this.buffereData.last(),
			wfElement: this.wfElement
		});
	},

	/**
	 * @public
	 */
	setHasEditor: function (flag) {
		this.fireEvent('multifieldeditor', this, flag);
	},

	/**
	 * public
	 */
	getFullData: function () {
		var values = {};

		this.uniDataTable.__clearAll();

		this.buffereData.each(function (data) {
			this.uniDataTable.addRow(data);
		}, this);

		values[this.getName()] = this.uniDataTable;
		return values;
	},

	/**
	 * @public
	 */
	applyValue: function (values) {
		SH.MX(values, this.getFullData());
	}
});