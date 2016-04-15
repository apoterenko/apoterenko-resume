/**
 * @class Workflow.view.form.Grid
 */
Ext.define('Workflow.view.form.Grid', {
	mixinId: 'grid',

	requires: [
		'Workflow.plugin.ElementResize',
		'Workflow.data.StoreFactory'
	],

	plugins: ['element.resize'],

	/**
	 * @private
	 */
	initGridComponent: function (store) {
		this.serviceNameFields = [];
		this.columns = this.makeColumnsAndFields();

		this.store = Workflow.data.StoreFactory.makeInstance({
			store: store,
			fields: this.fields,
			wfElement: this.wfElement,
			sbcConfig: this.sbcConfig
		});

		this.store.on('load', this.onGridStoreLoad, this);

		this.buildServiceNameField('__page');

		this.on({
			scope: this,
			itemdblclick: this.onDocumentSelect
		});
	},


	/**
	 * @public
	 */
	setValue: function (v, values) {
		this.store.getProxy().loadRawData(values);
		this.store.load();
		this.store.getProxy().resetRawData();
		this.store.getProxy().setPreviousParameters('read', this.buildParameters());
	},

	/**
	 * @private
	 */
	makeColumnsAndFields: function () {
		var firstColumn,
			cm = this.wfElement.column;
		this.fields = [];

		cm = cm ?
			goog.array.map(cm, function (column) {
				var name = column.name,
					width = column.width,
					type = column.type,
					config = {
						dataIndex: name,
						text: column.description || name,
						hidden: column.isHidden(),
						order: column.order,
						scope: column
					};

				if (width) {
					if (goog.string.endsWith(width, 'px')) {
						config.width = width;
					} else {
						config.flex = goog.string.parseInt(width);
					}
				} else {
					config.flex = 1;
				}

				this.fields.push(name);

				switch (type) {
					case 'Checkbox':
						config.editor = {
							xtype: 'checkbox'
						};
						config.xtype = 'checkcolumn';
						break;
					case 'DateTime':
						config.editor = {
							xtype: 'datefield'
						};
						config.xtype = 'datecolumn';
						break;
				}
				return config;
			}, this) :
			[];

		goog.array.sort(cm, function (a, b) {
			return a.order > b.order ? 1 : a.order < b.order ? -1 : 0;
		});

		if (cm.length) {
			firstColumn = cm[0];

			if (SH.DEF(firstColumn) && SH.DEF(this.firstColumnXType)) {
				firstColumn.xtype = this.firstColumnXType;
			}
		}
		return cm;
	},

	/**
	 * @private
	 */
	bindDataPreparer: function () {
		var columnName,
			me = this,
			view = me.view,
			cdFn = view.collectData;

		view.collectData = function (records) {
			SH.AFE(records, function (record) {
				SH.AFE(me.wfElement.column, function (cm) {
					columnName = cm.getName();
					record.data[columnName] = WF.JRR.formatFrom(record.data[columnName], cm);
				}, me);
			});
			return cdFn.apply(view, arguments);
		};
	},

	/**
	 * @private
	 */
	buildServiceNameField: function (name) {
		return this[name + 'Name'] = this.name + name;
	},

	/**
	 * @private
	 */
	buildServiceField: function (name, type, config) {
		var serviceItem = Ext.create(type, Ext.merge({
			name: this.buildServiceNameField(name)
		}, config));
		this.serviceNameFields.push(serviceItem);
		return serviceItem;
	},

	/**
	 * @private
	 */
	onGridStoreLoad: function () {
		var reader = this.store.getProxy().getReader();

		Ext.each(this.serviceNameFields, function (serviceField) {
			serviceField.setValue(
				reader[serviceField.getName()]
			);
		});
	},

	/**
	 * @private
	 */
	buildParameters: function () {
		var args = {
			id: this.wfElement.getId()
		};

		SH.MX(args, this.outerParams);

		args[this.__pageName] = 1;
		SH.DNN(this.maxOnPageValue) && (args[this.__maxOnPageName] = this.maxOnPageValue);

		return args;
	},

	/**
	 * @private
	 */
	doLoad: function () {
		var parameters;

		this.store.currentPage = 1;
		parameters = {params: this.buildParameters()};

		this.store.load(parameters);
	},

	/**
	 * @public
	 */
	reloadElement: function (outerParams) {
		SH.DEF(outerParams) && (this.outerParams = outerParams);
		this.doLoad();
	},

	/**
	 * @private
	 */
	onDocumentSelect: function (o, record) {
		var me = this,
			callbacks,
			sbcConfig = me.sbcConfig,
			action = me.wfElement
				.getForm()
				.getActionsByLayoutId(me.wfElement.getId());

		if (SH.NDNN(action)) {
			return;
		}

		SH.AFE(action, function (action) {
			callbacks = action.callbacks;

			SH.DNN(callbacks) && SH.OFE(callbacks, function (callback, callbackName) {
				me.fireEvent('actiondocument', action, {
					callback: callbackName,
					sbcConfig: sbcConfig,
					clientData: record.data
				});
			});
		});
	},

	/**
	 * public
	 */
	getFullData: function () {
		// TODO
		console.log('TODO grid getFullData');
		return WF.UDT.create();
	}
});