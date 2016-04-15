/**
 * "Provide" section
 */
goog.provide('Workflow.jxon.reader.Element');
goog.provide('WF.JRE');

/**
 * "Require" section
 */
goog.require("goog.debug");
goog.require('Workflow.jxon.reader.Base');

/**
 * Element preparer implementation
 *
 * @constructor
 */
WF.JRE = Workflow.jxon.reader.Element = function (element, form) {
	WF.JRE.superClass_.constructor.apply(this, arguments);
	this.form = form;
};

goog.inherits(WF.JRE, WF.JRBE);

goog.mixin(WF.JRE.prototype, {

	/**
	 * A reference to the Sandbox logger
	 *
	 * @private {goog.debug.Logger}
	 * @const
	 */
	logger_: goog.debug.Logger.getLogger("Workflow.jxon.reader.Element"),

	/**
	 * @private
	 */
	objectProperties: {
		columns: {
			root: 'column',
			stringProperties: 'width,description,name,format,type',
			numericProperties: 'defvisible',
			numericAttributes: 'order'
		}
	},

	/**
	 * @private
	 */
	stringProperties: 'name,type,description,fontstyle,align,hideborder,verify_re,verify_error,format,desc_format,haseditor,linked,suggestonfocusgained,onchange',

	/**
	 * @private
	 */
	numericProperties: 'isreadonly',

	/**
	 * @private
	 */
	numericAttributes: 'id',

	/**
	 * @private
	 */
	callbacksList: 'onchange,onload',

	/**
	 * @public
	 */
	getForm: function () {
		return this.form;
	},

	/**
	 * @public
	 */
	getAlign: function () {
		return this.align;
	},

	/**
	 * @public
	 */
	getFontStyle: function () {
		return this.fontstyle;
	},

	/**
	 * @public
	 */
	isReadOnly: function () {
		return !!this.isreadonly;
	},

	/**
	 * @public
	 */
	hasEditor: function () {
		return SH.TRUE(this.haseditor);
	},

	/**
	 * @public
	 */
	isLinked: function () {
		return SH.TRUE(this.linked);
	},

	/**
	 * @public
	 */
	isSuggestOnFocusGained: function () {
		return SH.TRUE(this.suggestonfocusgained);
	},

	/**
	 * @public
	 */
	getFormatData: function (useValues, returnDescription) {
		var fields = [],
			displayFields = [],
			args = [],
			template,
			format = returnDescription === true ? this.desc_format : this.getFormat(),
			newFormat,
			i = 1;

		if (SH.DNN(format)) {
			args.push(
				newFormat = format.replace(/(\$\{.+?\})/g, function (entity) {
					var field = /\$\{(.+?)\}/.exec(entity)[1];
					fields.push(field);
					displayFields.push(
						(useValues ? ['{[values[\"', field, '\"]]}'] : ['{', field, '}'])
							.join(''));
					return i++ + '$';
				})
			);

			fields.push('_id');

			try {
				template = WF.PF.sprintf.apply(WF.PF, args.concat(displayFields));
			} catch (e) {
				this.logger_.severe("Error in the element getFormatData: " + e.message +
					", format: " + format + ", new format: " + newFormat, e);
			}
		}

		return {
			fields: fields,
			template: template
		}
	}
});