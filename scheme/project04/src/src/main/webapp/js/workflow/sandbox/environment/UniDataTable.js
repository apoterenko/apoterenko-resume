/**
 * "Provide" section
 */
goog.provide("Workflow.sandbox.UniDataTable");
goog.provide("WF.UDT");

/**
 * "Require" section
 */
goog.require("Workflow.ShortHand");
goog.require("Workflow.sandbox.UniDataTableFields");

/**
 * UniData implementation
 *
 * @constructor
 */
WF.UDT = Workflow.sandbox.UniDataTable = function (rows) {
	this.rows = [];
	this.columns = [];
	this.attributes = {};

	SH.DNN(rows) && (rows = [].concat(rows)) && SH.AFE(rows, this.addRow, this);
};

/**
 * @public
 */
WF.UDT.create = function (rows) {
	return new WF.UDT(rows);
};

SH.MX(WF.UDT.prototype, {

	/**
	 * @public
	 */
	size: function () {
		return this.rows.length;
	},

	/**
	 * @public
	 */
	getRow: function (index) {
		return this.rows[index];
	},

	/**
	 * @public
	 */
	addRow: function (row) {
		this.rows.push(WF.UDTF.create(row));
	},

	/**
	 * @public
	 */
	newRow: function (index) {
		var row = WF.UDTF.create();
		if (SH.DNN(index)) {
			goog.array.insertAt(this.rows, row, index);
		} else {
			this.rows.push(row);
		}
		return row;
	},

	/**
	 * @public
	 */
	__clearAll: function () {
		this.rows = [];
	}
});