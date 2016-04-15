/**
 * "Provide" section
 */
goog.provide("Workflow.ShortHand");
goog.provide("SH");

/**
 * "Require" section
 */
goog.require("goog.object");
goog.require("goog.array");

goog.mixin(Workflow.ShortHand = SH, {

	/**
	 * @public
	 */
	DNN: goog.isDefAndNotNull,

	/**
	 * @public
	 */
	DEF: goog.isDef,

	/**
	 * @public
	 */
	NDEF: function () {
		return !SH.DEF.apply(window, arguments);
	},

	/**
	 * @public
	 */
	NDNN: function () {
		return !SH.DNN.apply(window, arguments);
	},

	/**
	 * @public
	 */
	PATH: function (o, path) {
		if (SH.NDNN(o)) {
			return o;
		}

		SH.AFE(path.split('.'), function (p) {
			SH.DNN(o) && (o = o[p]);
		});
		return o;
	},

	/**
	 * @public
	 */
	TRUE: function (v) {
		return goog.isString(v) ? v === 'true' : !!v;
	},

	/**
	 * @public
	 */
	FALSE: function (v) {
		return goog.isString(v) ? v === 'false' : !v;
	},

	/**
	 * @public
	 */
	MX: function (t, s, attr) {
		if (SH.DNN(attr)) {
			if (goog.isString(attr)) {
				attr = attr.split(',');
			}

			SH.AFE(attr, function (a) {
				t[a] = s[a];
			});
		} else {
			goog.mixin(t, s);
		}
	},

	/**
	 * @public
	 */
	OFE: goog.object.forEach,

	/**
	 * @public
	 */
	OF: goog.object.filter,

	/**
	 * @public
	 */
	AFE: goog.array.forEach,

	/**
	 * @public
	 */
	AM: goog.array.map,

	/**
	 * @public
	 */
	FN: goog.isFunction,

	/**
	 * @public
	 */
	OB: goog.isObject,

	/**
	 * @public
	 */
	AR: goog.isArray,

	/**
	 * @public
	 */
	NB: goog.isNumber,

	/**
	 * @public
	 */
	GOV: goog.object.getValues,

	/**
	 * @public
	 */
	GAK: goog.object.getAnyKey,

	/**
	 * @public
	 */
	GAV: goog.object.getAnyValue
});