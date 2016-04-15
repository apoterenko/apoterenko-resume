/**
 * "Provide" section
 */
goog.provide("Workflow.sandbox.Importer");

/**
 * UniData implementation
 *
 * @constructor
 */
Workflow.sandbox.Importer = function (config) {
	this.config = config;
};

goog.mixin(Workflow.sandbox.Importer.prototype, {

	/**
	 * @public
	 */
	get: function (name) {
		var code = this.config.sbcConfig.getFormImportsByName(name);
		if (goog.isDefAndNotNull(code)) {
			return new WF.SBX(this.config)
				/* Нам не нужно выполнять код формы при импорте */
				.resetFunctionsCode()
				.execute(code + '\n' + name);
		}
		throw Error('Unknown function by name ' + name);
	}
});