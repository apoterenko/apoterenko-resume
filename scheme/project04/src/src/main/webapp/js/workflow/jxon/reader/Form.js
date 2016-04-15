/**
 * "Provide" section
 */
goog.provide('Workflow.jxon.reader.Form');
goog.provide('WF.JRF');

/**
 * "Require" section
 */
goog.require('goog.object');
goog.require('goog.array');
goog.require('goog.string');
goog.require('Workflow.jxon.reader.Panel');
goog.require('Workflow.jxon.reader.Action');
goog.require('Workflow.jxon.reader.Main');
goog.require('Workflow.jxon.reader.Header');
goog.require('Workflow.jxon.reader.Base');

/**
 * Form preparer implementation
 *
 * @constructor
 */
WF.JRF = Workflow.jxon.reader.Form = function (xml) {
	WF.JRF.superClass_.constructor.call(this, xml.form);

	var me = this,
		form = xml.form,
		panels = {},
		actions = {},
		actionsByElement = {};

	this.actions = actions;
	this.actionsByElement = actionsByElement;

	var ac = form.actions.action,
		pl = form.panels.panel;

	ac && (ac = [].concat(ac)) && goog.array.forEach(ac, function (action) {
		action = new WF.JRAC(action);
		actions[action.getId()] = action;

		var elId = action.getLayout().id,
			actionByElement = actionsByElement[elId];

		if (goog.isDefAndNotNull(actionByElement)) {
			actionsByElement[elId].push(action);
		} else {
			actionsByElement[elId] = [action];
		}
	});

	pl && (pl = [].concat(pl)) && goog.array.forEach(pl, function (panel) {
		panel = new WF.JRP(panel, me);
		panels[panel.getId()] = panel;
	});

	this.header = new WF.JRH(form.header, panels);
	this.main = new WF.JRMN(form.main, panels);
	this.footer = new WF.JRMN(form.footer, panels);
};

goog.inherits(WF.JRF, WF.JRBE);

goog.mixin(WF.JRF.prototype, {

	/**
	 * @private
	 */
	stringProperties: 'tshort,onload,functions',

	/**
	 * @public
	 */
	getActions: function () {
		return this.actions;
	},

	/**
	 * @public
	 */
	getActionsByElement: function () {
		return this.actionsByElement;
	},

	/**
	 * @public
	 */
	getActionsByLayoutId: function (id) {
		return this.actionsByElement[id];
	},

	/**
	 * @public
	 */
	getPanels: function () {
		return this.panels;
	},

	/**
	 * @public
	 */
	getHeader: function () {
		return this.header;
	},

	/**
	 * @public
	 */
	getMain: function () {
		return this.main;
	},

	/**
	 * @public
	 */
	getFooter: function () {
		return this.footer;
	},

	/**
	 * @public
	 */
	getTShort: function () {
		return this.tshort;
	},

	/**
	 * @public
	 */
	getFunctions: function () {
		return this.functions;
	}
});