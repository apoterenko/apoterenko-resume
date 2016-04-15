/**
 * @class Workflow.data.TreeReader
 */
Ext.define('Workflow.data.TreeReader', {
	extend: 'Workflow.data.TableReader',

	requires: [
		'Workflow.data.TableReader'
	],

	/**
	 * @public
	 */
	constructor: function (config) {
		this.callParent([config]);
	},

	/**
	 * @protected
	 */
	readRows: function (data, readOptions) {
		var rows = this.callParent(arguments),
			result = {
				children: rows,
				expanded: true
			};

		this.processRows(rows);
		return result;
	},

	/**
	 * @private
	 */
	processRows: function (rows) {
		if (!goog.isDefAndNotNull(rows)) {
			return;
		}

		goog.array.forEach(rows, function (row) {
			if (goog.isDefAndNotNull(row._countChildren)) {
				var count = goog.string.parseInt(row._countChildren);

				if (goog.math.isFiniteNumber(count) && count === 0) {
					row.children = [];
					row.leaf = true;
				}
			} else {
				row.leaf = true;
				row.children = [];
			}
			this.processRows(row.children);
		}, this);
	}
});