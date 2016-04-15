/**
 * "Provide" section
 */
goog.provide("Workflow.sandbox.ArrayList");
goog.provide("java.util.ArrayList");

/**
 * "Require" section
 */
goog.require("Workflow.sandbox.List");

/**
 * ArrayList implementation
 *
 * @constructor
 */
java.util.ArrayList = Workflow.sandbox.ArrayList = function () {
	Workflow.sandbox.ArrayList.superClass_.constructor.apply(this, arguments);
};

goog.inherits(Workflow.sandbox.ArrayList, Workflow.sandbox.List);