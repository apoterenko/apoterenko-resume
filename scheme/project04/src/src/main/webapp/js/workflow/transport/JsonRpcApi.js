/**
 * "Provide" section
 */
goog.provide('Workflow.transport.JsonRpcApi');
goog.provide('WF.JRA');

WF.JRA = Workflow.transport.JsonRpcApi;
/**
 *
 * API's methods
 */
WF.JRA.GET_MENU = 'getMenu';
WF.JRA.DO_MENU_ACTION = 'doMenuAction';
WF.JRA.RELOAD_ELEMENT = 'reloadElement';
WF.JRA.DO_ACTION = 'doAction';
WF.JRA.DESTROY_SESSION = 'doDestroySession';