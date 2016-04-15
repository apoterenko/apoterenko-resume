/**
 * "Provide" section
 */
goog.provide("Workflow.sandbox.StringDateHolder");
goog.provide("WF.SDH");

/**
 * StringDateHolder implementation
 *
 * @constructor
 */
WF.SDH = Workflow.sandbox.StringDateHolder = function (holder, value) {
	this.dateHolder = holder;
	this.dateValue = value;
};

goog.mixin(WF.SDH.prototype, {

	/**
	 * @public
	 */
	getDateHolder: function () {
		return this.dateHolder;
	},

	/**
	 * @public
	 */
	getDateValue: function () {
		return this.dateValue;
	}
});

/**
 * @public
 */
WF.SDH.DATE_PATTERN = 'd.m.Y H:i:s,000';

/**
 * @public
 */
WF.SDH.SHORT_DATE_PATTERN = 'd.m.Y';

/**
 * @public
 */
WF.SDH.FIRST_KEY = '__first';

/**
 * @public
 */
WF.SDH.SECOND_KEY = '__second';

/**
 * @public
 */
WF.SDH.isStringDateHolder = function (v) {
	return goog.isDef(v.dateHolder) || goog.isDef(v.dateValue)
};

/**
 * @public
 */
WF.SDH.parseDate = function (v) {
	// TODO Ext
	return goog.isDefAndNotNull(v.dateValue) && Ext.Date.parse(v.dateValue, WF.SDH.DATE_PATTERN);
};

/**
 * @public
 */
WF.SDH.formatDate = function (v, pattern) {
	// TODO Ext
	return Ext.Date.format(v, pattern);
};

/**
 * @public
 */
WF.SDH.toDate = function (v) {
	return WF.SDH.truncateDate(WF.SDH.parseDate(v));
};

/**
 * @public
 */
WF.SDH.truncateDate = function (date) {
	if (date instanceof Date) {
		return WF.SDH.formatDate(date, WF.SDH.SHORT_DATE_PATTERN);
	}
	return date;
};