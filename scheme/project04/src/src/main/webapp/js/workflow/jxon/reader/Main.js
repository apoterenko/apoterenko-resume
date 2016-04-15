/**
 * "Provide" section
 */
goog.provide('Workflow.jxon.reader.Main');
goog.provide('WF.JRMN');

/**
 * "Require" section
 */
goog.require('goog.array');
goog.require('Workflow.jxon.reader.Page');

/**
 * Main preparer implementation
 *
 * @constructor
 */
WF.JRMN = Workflow.jxon.reader.Main = function (main, panels) {
	this.pages = [];

	if (goog.isDef(main.page)) {
		this.pages = goog.array.map(this.pages.concat(main.page), function (page) {
			return new WF.JRPG(page, panels);
		});
	}
};

WF.JRMN.prototype = {

	/**
	 * @public
	 */
	getPages: function () {
		return this.pages;
	},

	/**
	 * @public
	 */
	isEmpty: function () {
		return !this.pages.length;
	}
};