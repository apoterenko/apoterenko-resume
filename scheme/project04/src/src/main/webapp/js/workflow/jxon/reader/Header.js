/**
 * "Provide" section
 */
goog.provide('Workflow.jxon.reader.Header');
goog.provide('WF.JRH');

/**
 * "Require" section
 */
goog.require('goog.array');
goog.require('Workflow.jxon.reader.Page');

/**
 * Header preparer implementation
 *
 * @constructor
 */
WF.JRH = Workflow.jxon.reader.Header = function (header, panels) {
	this.pages = [];

	if (goog.isDef(header.page)) {
		this.pages = goog.array.map(this.pages.concat(header.page), function (page) {
			return new WF.JRPG(page, panels);
		});
	}
};

WF.JRH.prototype = {

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