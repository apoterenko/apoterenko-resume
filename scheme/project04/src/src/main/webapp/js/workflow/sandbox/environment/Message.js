/**
 * "Provide" section
 */
goog.provide("Workflow.sandbox.Message");
goog.provide("Packages.ru.esoft.fatclient.tools.Messages");

/**
 * "Require" section
 */
goog.require("Workflow.ShortHand");

/**
 * UniData implementation
 *
 * @constructor
 */
Workflow.sandbox.Message = function (config) {
	this.sbcConfig = config.sbcConfig;
};

SH.MX(Workflow.sandbox.Message.prototype, {

	/**
	 * @public
	 */
	showConfirmDialog: function () {
		console.log('TODO: showConfirmDialog');
	},

	/**
	 * @public
	 */
	showMessage: function (message, title) {
		this.sbcConfig
			.getInitMessageProxy()
			.alert(title, message);
	}
});