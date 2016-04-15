/**
 * @class Workflow.data.MenuTreeReader
 */
Ext.define('Workflow.data.MenuTreeReader', {
	extend: 'Ext.data.reader.Json',

	requires: [
		'Ext.data.reader.Json'
	],

	/**
	 * @inheritdoc
	 */
	readRecords: function (data, readOptions) {
		this.imports = data.imports;
		return this.callParent([WF.JRM.buildMenu(data.menu), readOptions]);
	},

	/**
	 * @inheritdoc
	 */
	read: function (responseText, readOptions) {
		return this.callParent([
			{responseText: responseText},
			readOptions
		]);
	},

	/**
	 * @inheritdoc
	 */
	getResponseData: function (response) {
		return WF.JRR.readFrom(response.responseText);
	}
});