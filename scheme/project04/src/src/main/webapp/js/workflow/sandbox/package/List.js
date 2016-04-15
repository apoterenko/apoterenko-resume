/**
 * "Provide" section
 */
goog.provide("Workflow.sandbox.List");

/**
 * "Require" section
 */
goog.require("goog.array");

/**
 * List implementation
 *
 * @constructor
 */
Workflow.sandbox.List = function (inData) {
	this.inData = inData || [];
};

goog.mixin(Workflow.sandbox.List.prototype, {

	/**
	 * @public
	 */
	add: function (o) {
		goog.array.insertAt(this.inData, o);
	},

	/**
	 * @public
	 */
	contains: function (o) {
		return goog.array.contains(this.inData, o);
	},

	/**
	 * @public
	 */
	get: function (index) {
		return this.inData[index];
	}
});