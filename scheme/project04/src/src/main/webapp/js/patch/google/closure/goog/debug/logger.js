/**
 * Logs a message at the Logger.Level.SEVERE level.
 * If the logger is currently enabled for the given message level then the
 * given message is forwarded to all the registered output Handler objects.
 * @param {string} msg The string message.
 * @param {Error=} opt_exception An exception associated with the message.
 */
goog.debug.Logger.prototype.severe = function (msg, opt_exception) {
	if (goog.debug.LOGGING_ENABLED) {
		this.log(goog.debug.Logger.Level.SEVERE, msg
			/* START PATCH */ + (opt_exception ? ', stack: ' + opt_exception.stack : '') /* END PATCH */
			, opt_exception);
	}
};