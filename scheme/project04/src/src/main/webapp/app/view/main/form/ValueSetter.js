/**
 * Workflow.view.form.ValueSetter
 */
Ext.define('Workflow.view.form.ValueSetter', {
	singleton: true,

	/**
	 * @private
	 */
	DATE_PATTERNS: ['d.m.Y H:i:s,000', 'd.m.Y H:i:s', 'd.m.Y'],

	/**
	 * @public
	 */
	setValue: function (field, wfConfig) {
		var formValues = wfConfig.formValues,
			fn = field.setValue,
			fv;

		if (!Ext.isFunction(fn) || !formValues) {
			return;
		}

		fv = formValues[field.getName()];
		fn.call(field, this.prepareValue(field, fv), formValues);
	},

	/**
	 * @public
	 */
	prepareValue: function (field, value) {
		if (!goog.isDefAndNotNull(value)) {
			return value;
		}

		if (field instanceof Ext.form.field.Date) {
			return this.parseDateValue(value.dateValue);
		}
		return value;
	},

	/**
	 * @private
	 */
	parseDateValue: function (v) {
		if (!Ext.isDefined(v)) {
			return v;
		}

		var result;

		Ext.Array.each(this.DATE_PATTERNS, function (pattern) {
			if (!Ext.isDefined(result)) {
				result = Ext.Date.parse(v, pattern);
			}
		});
		return result;
	}
});