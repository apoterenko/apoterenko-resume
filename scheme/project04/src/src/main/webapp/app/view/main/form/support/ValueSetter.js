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
	setValue: function (field, sbcConfig) {
		var formValues = sbcConfig.getFormValues(),
			fn = field.setValue,
			fv;

		if (!SH.FN(fn) || !formValues) {
			return;
		}

		fv = formValues[field.getName()];
		fn.call(field, this.prepareValue(field, fv), formValues);
	},

	/**
	 * @public
	 */
	prepareValue: function (field, value) {
		if (SH.NDNN(value)) {
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
		if (SH.NDEF(v)) {
			return v;
		}

		var result;
		SH.AFE(this.DATE_PATTERNS, function (pattern) {
			SH.DEF && (result = Ext.Date.parse(v, pattern));
		});
		return result;
	}
});