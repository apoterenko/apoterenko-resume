/**
 * "Provide" section
 */
goog.provide("Workflow.sandbox.LinkedList");
goog.provide("java.util.LinkedList");

/**
 * "Require" section
 */
goog.require("Workflow.sandbox.List");

/**
 * ArrayList implementation
 *
 * @constructor
 */
java.util.LinkedList = Workflow.sandbox.LinkedList = function () {
	Workflow.sandbox.ArrayList.superClass_.constructor.apply(this, arguments);
};

goog.inherits(Workflow.sandbox.LinkedList, Workflow.sandbox.List);