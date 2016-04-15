/**
 * "Provide" section
 */
goog.provide("Workflow.sandbox.Sandbox");
goog.provide("WF.SBX");

/**
 * "Require" section
 */
goog.require("goog.debug");
goog.require("Workflow.ShortHand");
goog.require("Workflow.sandbox.Environment");

/**
 * Extends base prototypes
 */
String.prototype.equals = goog.isFunction(String.prototype.equals) ?
	String.prototype.equals :
	function (s) {
		var b = true;
		SH.AFE(this, function (a, index) {
			b = b && a === s[index];
		});
		return b && s.length === this.length;
	};

String.prototype.isEmpty = goog.isFunction(String.prototype.isEmpty) ?
	String.prototype.isEmpty :
	function () {
		return this.equals('');
	};

/**
 * Sandbox implementation
 *
 * @constructor
 */
WF.SBX = Workflow.sandbox.Sandbox = function (config) {
	this.definedFunctionsCode = this.getDefinedFunctionsCode();
	this.environment = new Workflow.sandbox.Environment(config);
	this.applyFunctionsCode(config);
};

/**
 * @public
 */
WF.SBX.execute = function (script, config) {
	return new WF.SBX(config).execute(script);
};

goog.mixin(Workflow.sandbox.Sandbox.prototype, {

	/**
	 * A reference to the Sandbox logger
	 *
	 * @private {goog.debug.Logger}
	 * @const
	 */
	logger_: goog.debug.Logger.getLogger("Workflow.sandbox.Sandbox"),

	/**
	 * @private
	 * @const
	 */
	localFnTpl: "var {$name} = this.{$name};\n",

	/**
	 * Local sandbox's functions
	 *
	 * @private
	 * @const
	 */
	localFns: "importClass,importer,convert,Messages,$",

	/**
	 * Execute sandbox's code
	 *
	 * @public
	 */
	execute: function (code) {
		if (!code || !goog.isString(code) || !code.trim()) {
			this.logger_.warning("Incoming stream of code is not a string or is empty...");
			return;
		}

		var rc,
			rs,
			a = [],
			out = [];

		a.push(this.definedFunctionsCode);
		SH.DNN(this.functionsCode) && a.push(this.functionsCode);

		code && a.push(code);

		this.getDefinedClassesCode(Workflow.sandbox, out);
		a = out.concat(a);

		rc = "\nvar en = this,\n value = this.getValue(),\ndata = this.getData(); \nwith (this) {\n" + a.join(";") + "\n}";

		this.logger_.info(rc);

		try {
			rs = (function (code) {
				return eval(code);
			}).call(this.environment, rc);
		} catch (e) {
			this.logger_.severe("Error in the sandbox: " + e.message, e);
		}
		return rs;
	},

	/**
	 * @public
	 */
	getEnvironment: function () {
		return this.environment;
	},

	/**
	 * @public
	 */
	applyFunctionsCode: function (config) {
		this.functionsCode = config.sbcConfig && config.sbcConfig.getFunctionsCode();
		return this;
	},

	/**
	 * @public
	 */
	resetFunctionsCode: function () {
		this.functionsCode = null;
		return this;
	},

	/**
	 * @private
	 */
	getDefinedClassesCode: function (o, out) {
		SH.OFE(o, function (o, oKey) {
			SH.FN(o) && out.push(['\nvar ', oKey, ' = ', 'Workflow.sandbox', '.', oKey].join(''));
		});
		out.push('\n');
	},

	/**
	 * @private
	 */
	getDefinedFunctionsCode: function () {
		var me = this;

		return SH.AM(
			me.localFns.split(","),
			function (name) {
				return goog.getMsg(me.localFnTpl, {
					name: name.trim(me.localFnTpl)
				});
			}
		).join('');
	}
});