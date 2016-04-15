/**
 * "Provide" section
 */
goog.provide('Workflow.jxon.reader.Response');
goog.provide('WF.JRR');

/**
 * "Require" section
 */
goog.require('goog.json');
goog.require('goog.string');
goog.require("goog.debug");
goog.require("Workflow.ShortHand");
goog.require('Workflow.jxon.reader.Form');
goog.require('Workflow.jxon.Tree');
goog.require('Workflow.sandbox.Sandbox');
goog.require('Workflow.sandbox.UniDataTable');
goog.require('Workflow.sandbox.StringDateHolder');

/**
 * Response reader implementation
 */
WF.JRR = Workflow.jxon.reader.Response = {

	/**
	 * A reference to the Response logger
	 *
	 * @private {goog.debug.Logger}
	 * @const
	 */
	logger_: goog.debug.Logger.getLogger("Workflow.jxon.reader.Response"),

	/**
	 * @public
	 */
	readFrom: function (response) {
		var result = {},
			state = response.state,
			imports = response.imports,
			session = response.session,
			menu = response.menu,
			form = response.form,
			data = response.data;

		try {
			if (SH.DNN(form)) {
				result.form = new Workflow.jxon.reader.Form(new WF.JXT(form));
			}
			if (SH.DNN(data)) {
				result.fields = this.parseAndExtractFields(data);
			}
			if (SH.DNN(state)) {
				result.state = goog.json.parse(state);
			}
			if (SH.DNN(session)) {
				result.session = response.session;
			}
			if (SH.DNN(menu)) {
				result.menu = new WF.JRM(new WF.JXT(menu)).readRecords();
			}
			if (SH.DNN(imports) && !goog.string.isEmpty(imports)) {
				imports = this.parseAndExtractFields(imports);

				if (SH.DNN(imports) && (imports = this.extractRows(imports))) {
					result.imports = {};

					SH.AFE(imports, function (record) {
						result.imports[record.name] = record.code;
					});
				}
			}
			return result;
		} catch (e) {
			this.logger_.severe("Error in the readFrom: " + e.message, e);
			throw e;
		}
	},

	/**
	 * @public
	 */
	formatFrom: function (v, column) {
		try {
			if (SH.NDNN(column) || SH.NDNN(v)) {
				return v;
			}

			var a,
				rows,
				format = column.getFormat();

			if (SH.DNN(format)) {
				a = /([a-zA-Z]+)=(.+)/.exec(format);

				if (a && a.length > 2) {
					rows = WF.JRR.extractRows(v);
					switch (a[1]) {
						case 'SubTableFormat':
							return rows.length ? rows[0][a[2]] : v;
						case 'ScriptFormat':
							return WF.SBX.execute(a[2], {
								value: WF.UDT.create(rows),
								clientData: rows.length ? rows[0] : undefined
							});
						case 'SubTableListBoxFormat':
							return rows.length ? rows[0]['self'] : v;
					}
				}
			}

			if (WF.SDH.isStringDateHolder(v)) {
				return WF.SDH.toDate(v);
			}
			return v;
		} catch (e) {
			this.logger_.severe("Error in the formatFrom: " + e.message, e);
			throw e;
		}
	},

	/**
	 * @public
	 */
	extractRows: function (value) {
		var fields,
			result = [],
			rows = this.findRows(value);

		try {
			rows && SH.AR(rows) && SH.AFE(rows, function (row) {
				SH.DNN(fields = this.extractFields(row)) && result.push(fields);
			}, this);
			return result;
		} catch (e) {
			this.logger_.severe("Error in the extractRows: " + e.message, e);
			throw e;
		}
	},

	/**
	 * @private
	 */
	findRows: function (value) {
		try {
			if (SH.DNN(value)) {
				if (SH.DNN(value.rows)) {
					return value.rows;
				}

				var v;
				SH.OB(value) && SH.OFE(value, function (o) {
					v = v || this.findRows(o);
				}, this);
				return v;
			}
			return null;
		} catch (e) {
			this.logger_.severe("Error in the findRows: " + e.message, e);
			throw e;
		}
	},

	/**
	 * @private
	 */
	parseAndExtractFields: function (v) {
		try {
			return this.extractFields(goog.json.parse(v).fields);
		} catch (e) {
			this.logger_.severe("Error in the parseAndExtractFields: " + e.message, e);
			throw e;
		}
	},

	/**
	 * @public
	 */
	extractFields: function (value) {
		return SH.PATH(value, 'fields.fields');
	}
};