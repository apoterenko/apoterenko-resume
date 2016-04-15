/**
 * "Provide" section
 */
goog.provide("Workflow.sandbox.UniData");
goog.provide("WF.UD");

/**
 * "Require" section
 */
goog.require("Workflow.sandbox.UniDataFields");
goog.require("Workflow.sandbox.UniClientData");

/**
 * UniData implementation
 *
 * @constructor
 */
WF.UD = Workflow.sandbox.UniData = function (inData) {
	this.uniDataFields = new Workflow.sandbox.UniDataFields(inData);
	this.clientData = new Workflow.sandbox.UniClientData();
};

WF.UD.UD_NONE = 0;
WF.UD.UD_WITH_FORM_ERRORS = 2;   // С ошибками формы
WF.UD.UD_WITH_CLIENT_DATA = 4;   // С данными о клиенте
WF.UD.UD_WITH_OUT_INSTANCE = 8;  // без процессных данных
WF.UD.UD_WITH_OUT_INSTANCE = 16; // без атрибутов полей

/**
 * @public
 */
WF.UD.create = function (inData) {
	return new WF.UD(inData);
};

goog.mixin(WF.UD.prototype, {

	/**
	 * @public
	 */
	getFieldAsTable: function () {
		return this.uniDataFields.getFieldAsTable.apply(this.uniDataFields, arguments);
	},

	/**
	 * @public
	 */
	setField: function () {
		this.uniDataFields.setField.apply(this.uniDataFields, arguments);
		return this;
	},

	/**
	 * @public
	 */
	getField: function () {
		return this.uniDataFields.getField.apply(this.uniDataFields, arguments);
	},

	/**
	 * @public
	 */
	hasField: function () {
		return this.uniDataFields.hasField.apply(this.uniDataFields, arguments);
	},

	/**
	 * @public
	 */
	getAllFields: function () {
		return this.uniDataFields.getAllFields();
	},

	/**
	 * @public
	 */
	getFieldAsLong: function () {
		return this.uniDataFields.getFieldAsLong.apply(this.uniDataFields, arguments);
	},

	/**
	 * @public
	 */
	getFieldAsString: function () {
		return this.uniDataFields.getFieldAsString.apply(this.uniDataFields, arguments);
	},

	/**
	 * @public
	 */
	getFieldAsBoolean: function () {
		return this.uniDataFields.getFieldAsBoolean.apply(this.uniDataFields, arguments);
	},

	/**
	 * @public
	 */
	add: function (uniData, mode) {
		if (goog.isDefAndNotNull(uniData.clientData)) {
			this.clientData.__merge(uniData.clientData);
		}
		if (goog.isDefAndNotNull(uniData.uniDataFields)) {
			this.uniDataFields.__merge(uniData.uniDataFields);
		}
	},

	/**
	 * @public
	 */
	replace: function (from) {
		this.uniDataFields.__merge.apply(this.uniDataFields, arguments);
	},

	/**
	 * @public
	 */
	__mergeData: function (from) {
		this.uniDataFields.__mergeData.apply(this.uniDataFields, arguments);
	},

	/**
	 * @public
	 */
	translateField: function () {
		return this.uniDataFields.translateField.apply(this.uniDataFields, arguments);
	}
});