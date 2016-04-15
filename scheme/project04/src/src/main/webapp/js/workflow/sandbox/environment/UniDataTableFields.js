/**
 * "Provide" section
 */
goog.provide("Workflow.sandbox.UniDataTableFields");
goog.provide("WF.UDTF");

/**
 * "Require" section
 */
goog.require("Workflow.ShortHand");

/**
 * UniData implementation
 *
 * @constructor
 */
WF.UDTF = Workflow.sandbox.UniDataTableFields = function (inData) {
	this.inData = inData || {};
};

/**
 * @public
 */
WF.UDTF.create = function (inData) {
	return new WF.UDTF(inData);
};

SH.MX(WF.UDTF.prototype, {

	/**
	 * @public
	 */
	getFieldAsTable: function (name) {
		// TODO
		console.warn('TODO: getFieldAsTable', name);
		return WF.UDT.create();
	},

	/**
	 * @public
	 */
	getAllFields: function () {
		return this.inData;
	},

	/**
	 * @public
	 */
	setField: function (name, value) {
		this.inData[name] = value;
		return this;
	},

	/**
	 * @public
	 */
	getField: function (name) {
		return this.inData[name];
	},

	/**
	 * @public
	 */
	getFieldAsLong: function (name, defaultValue) {
		var field = this.getField(name);

		if (SH.DNN(field)) {
			return goog.string.parseInt(field);
		}
		return defaultValue;
	},

	/**
	 * @public
	 */
	getFieldAsString: function (name, defaultValue) {
		var field = this.getField(name);

		if (SH.DNN(field)) {
			return field + '';
		}
		return defaultValue;
	},

	/**
	 * @public
	 */
	getFieldAsBoolean: function (name, defaultValue) {
		var field = this.getField(name);

		if (SH.DNN(field)) {
			return !!field;
		}
		return defaultValue;
	},

	/**
	 * @public
	 */
	translateFields: function (renameFields) {
		for (var i = 0; i < renameFields.length; i += 2) {
			this.translateField(renameFields[i], renameFields[i + 1]);
		}
	},

	/**
	 * @public
	 */
	translateField: function (oldField, newField) {
		if (this.hasField(oldField)) {
			this.setField(newField, this.getField(oldField));
			this.removeField(oldField);
		}
	},

	/**
	 * @public
	 */
	hasField: function (name) {
		return SH.DEF(this.inData[name]);
	},

	/**
	 * @public
	 */
	removeField: function (name) {
		delete this.inData[name];
	}
});