/**
 * "Provide" section
 */
goog.provide('Workflow.jxon.reader.Page');
goog.provide('WF.JRPG');

/**
 * "Require" section
 */
goog.require('goog.string');
goog.require('goog.array');
goog.require('Workflow.jxon.reader.Base');

/**
 * Page preparer implementation
 *
 * @constructor
 */
WF.JRPG = Workflow.jxon.reader.Page = function (page, panels) {
	WF.JRPG.superClass_.constructor.apply(this, arguments);

	this.panels = {};
	this.initMarkup(page, panels);
};

goog.inherits(WF.JRPG, WF.JRBE);

goog.mixin(WF.JRPG.prototype, {

	/**
	 * @private
	 */
	useWrapperMarkup: true,

	/**
	 * @private
	 */
	stringAttributes: 'description,lazy',

	/**
	 * @private
	 */
	numericAttributes: 'id',

	/**
	 * @private
	 */
	panelTpl: '<tr class="wf-row-cls"><td class="wf-column-cls"><div wf-panel-id="{$id}" class="wf-panel-cls"></div></td></tr>',

	/**
	 * @private
	 */
	initMarkup: function (page, panels) {
		var markup = [],
			tr,
			td;

		page && (tr = page.tr) && tr && (tr = [].concat(tr)) && goog.array.forEach(tr, function (tr) {
			td = tr && tr.td;

			td && (td = [].concat(td)) && goog.array.forEach(td, function (td) {
				var id,
					panel,
					p = td.panel;

				if (p) {
					id = this.getPropertyNumericValue(td, 'panel');
					markup.push(goog.getMsg(this.panelTpl, {id: id}));
					this.panels[id] = panel = panels[id];
					this.initAttributes.call(panel, p);
					goog.mixin(panel, this.getAttributePaddingValues(td));
					panel.wrapBody();
				}
			}, this);
		}, this);

		this.markup = markup.join('');
	},

	/**
	 * @public
	 */
	getPanels: function () {
		return this.panels;
	}
});