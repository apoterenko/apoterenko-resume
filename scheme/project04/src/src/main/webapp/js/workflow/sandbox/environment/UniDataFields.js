/**
 * "Provide" section
 */
goog.provide("Workflow.sandbox.UniDataFields");

/**
 * "Require" section
 */
goog.require("Workflow.sandbox.UniDataTableFields");

/**
 * UniData implementation
 *
 * @constructor
 */
Workflow.sandbox.UniDataFields = function () {
	Workflow.sandbox.UniDataFields.superClass_.constructor.apply(this, arguments);
};

goog.inherits(Workflow.sandbox.UniDataFields, WF.UDTF);

goog.mixin(Workflow.sandbox.UniDataFields.prototype, {

	/**
	 * @public
	 */
	__merge: function (uniDataFields) {
		this.__mergeData(uniDataFields.inData);
	},

	/**
	 * @public
	 */
	__mergeData: function (inData) {
		goog.mixin(this.inData, inData);
	}
});