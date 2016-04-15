/**
 * "Provide" section
 */
goog.provide("Workflow.sandbox.UniClientData");

/**
 * UniData implementation
 *
 * @constructor
 */
Workflow.sandbox.UniClientData = function (inData) {
	this.inData = inData || {};
};

Workflow.sandbox.UniClientData.prototype = {

	/**
	 * @public
	 */
	__merge: function (uniClientData) {
		goog.mixin(this.inData, uniClientData.inData);
	}
};