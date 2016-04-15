/**
 * @class Workflow.data.TableReader
 */
Ext.define('Workflow.data.TableReader', {
	extend: 'Ext.data.reader.Json',

	requires: [
		'Ext.data.reader.Json'
	],

	accessorFieldNames: ['', '__alternatives', '__path'],

	/**
	 * @public
	 */
	constructor: function (config) {
		config = config || {};
		this.wfElement = config.wfElement;

		this.callParent([config]);
	},

	/**
	 * @inheritdoc
	 */
	getResponseData: function (response) {
		if (Ext.isString(response.responseText)) {
			return this.callParent(arguments);
		} else {
			return response;
		}
	},

	/**
	 * @inheritdoc
	 */
	read: function (response, readOptions) {
		response.responseText = response.data;
		delete response.data;

		return this.callParent([response, readOptions]);
	},

	/**
	 * @inheritdoc
	 */
	readRecords: function (data, readOptions) {
		var element = this.wfElement,
			fieldName = element.name,
			resultSet,
			total;

		resultSet = this.callParent([this.readRows(data, readOptions), readOptions]);

		total = this[fieldName + '__size'];
		if (goog.isDefAndNotNull(total)) {
			resultSet.total = total;
		}
		return resultSet;
	},

	/**
	 * @protected
	 */
	readRows: function (data) {
		var element = this.wfElement,
			fieldName = element.name,
			fieldValue = this.findFieldByName(fieldName, data),
			rows = WF.JRR.extractRows(fieldValue);

		this.initServiceFields(fieldName, data);
		return rows;
	},

	/**
	 * @public
	 */
	initServiceFields: function (fieldName, data) {
		this.initServiceField(fieldName + '__size', data);
		this.initServiceField(fieldName + '__action', data);
		this.initServiceField(fieldName + '__maxOnPage', data);
		this.initServiceField(fieldName + '__page', data);
	},

	/**
	 * @private
	 */
	initServiceField: function (fieldName, data) {
		this[fieldName] = this.findFieldByName(fieldName, data);
	},

	/**
	 * @private
	 */
	findFieldByName: function (fieldName, o, name) {
		if (this.checkFieldName(fieldName, name)) {
			return o;
		}

		var value;
		goog.isObject(o) && goog.object.forEach(o, function (o, key) {
			if (!goog.isDef(value)) {
				value = this.findFieldByName(fieldName, o, key);
			}
		}, this);
		return value;
	},

	/**
	 * @private
	 */
	checkFieldName: function (fieldName, name) {
		var b = false;
		goog.array.forEach(this.accessorFieldNames, function (accessorName) {
			b |= name === (fieldName + accessorName);
		}, this);
		return b;
	}
});