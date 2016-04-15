/**
 * "Provide" section
 */
goog.provide('Workflow.dom.DomHelper');
goog.provide('WF.DH');

/**
 * "Require" section
 */
goog.require('goog.dom');
goog.require("goog.debug");

/**
 * Dom helper implementation
 */
WF.DH = {

	DEFAULT_SCROLL_BAR_HEIGHT: 16,

	/**
	 * A reference to the DomHelper
	 *
	 * @private {goog.debug.Logger}
	 * @const
	 */
	logger_: goog.debug.Logger.getLogger("Workflow.dom.DomHelper"),

	/**
	 * @private
	 */
	getScrollBarHeight: function () {
		if (goog.isDefAndNotNull(this.__scrollBarHeight)) {
			return this.__scrollBarHeight;
		}

		var height;
		try {
			height = this.getHeight_();
			if (goog.isNumber(height) && !isNaN(height) && height > 0) {
				return this.__scrollBarHeight = height;
			}
		} catch (e) {
			this.logger_.severe("Error in the getHeight: " + e.message, e);
		}
		return this.DEFAULT_SCROLL_BAR_HEIGHT;
	},

	/**
	 * @private
	 */
	getHeight_: function () {
		var inner,
			outer,
			widthWithScroll,
			widthNoScroll;

		outer = goog.dom.createDom('div', {
			visibility: 'hidden',
			width: '100px',
			msOverflowStyle: 'scrollbar'
		});

		goog.dom.append(document.body, outer);

		widthNoScroll = outer.offsetWidth;
		outer.style.overflow = 'scroll';

		inner = goog.dom.createDom('div', {width: '100%'});
		goog.dom.append(outer, inner);
		widthWithScroll = inner.offsetWidth;

		goog.dom.removeNode(outer);
		return widthNoScroll - widthWithScroll;
	}
};