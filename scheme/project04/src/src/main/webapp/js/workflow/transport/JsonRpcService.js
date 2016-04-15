/**
 * "Provide" section
 */
goog.provide('Workflow.transport.JsonRpcService');
goog.provide('WF.JRS');

/**
 * "Require" section
 */
goog.require("Workflow.ShortHand");
goog.require('Workflow.transport.JsonRpcApi');

/**
 * JsonRpc 2.0 service implementation
 *
 * @constructor
 */
WF.JRS = Workflow.transport.JsonRpcService = new WF.JRT('api', {
	methods: SH.GOV(WF.JRA)
});