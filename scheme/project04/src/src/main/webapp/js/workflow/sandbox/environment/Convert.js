/**
 * "Provide" section
 */
goog.provide("Workflow.sandbox.Convert");

/**
 * "Require" section
 */
goog.require("Workflow.ShortHand");

/**
 * Convert implementation
 */
Workflow.sandbox.Convert = {

	/**
	 * @public
	 */
	toLong: function (name) {
		return goog.string.parseInt(name);
	}
};