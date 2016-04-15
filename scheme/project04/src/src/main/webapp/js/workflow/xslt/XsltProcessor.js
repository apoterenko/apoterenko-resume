/**
 * "Provide" section
 */
goog.provide('Workflow.xslt.XsltProcessor');
goog.provide('WF.XP');

/**
 * "Require" section
 */
goog.require('goog.dom.xml');
goog.require('goog.json');
goog.require("goog.debug");

/**
 * XSLT implementation
 * @constructor
 * @param xml
 */
WF.XP = Workflow.xslt.XsltProcessor = function (xml) {
	this.xml = goog.isString(xml) ? goog.dom.xml.loadXml(xml) : xml;
	this.processor = this.makeProcessor();
};

WF.XP.prototype = {

	/**
	 * A reference to the XSLT logger
	 *
	 * @private {goog.debug.Logger}
	 * @const
	 */
	logger_: goog.debug.Logger.getLogger("Workflow.xslt.XsltProcessor"),

	/**
	 * @private
	 */
	styleSheet: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
		"<xsl:stylesheet version=\"2.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\">" +
			"<xsl:output method=\"xml\" indent=\"yes\"/>" +
			"<xsl:template name=\"workflow\" match=\"/\"><xsl:apply-templates/></xsl:template>" +
			"<xsl:template match=\"table\">" +
				"{\"layout\": {\"type\": \"<xsl:value-of select=\"@layout\"/>\", \"align\": \"stretch\"}, \"items\": [" +
					"<xsl:for-each select=\"tr\">" +
						"{\"layout\": {\"type\": \"hbox\", \"align\": \"stretch\"}, \"items\": [" +
							"<xsl:for-each select=\"td\">" +
								"{" +
									"\"style\": \"<xsl:value-of select=\"@style\"/>\"," +
									"\"flex\": 1," +
									"\"layout\": \"fit\"," +
									"\"items\": {" +
										"<xsl:if test=\"div/@wf-element-id\">\"wfElementId\": <xsl:value-of select=\"div/@wf-element-id\"/>,</xsl:if>" +
										"<xsl:if test=\"div/@wf-action-id\">\"wfActionId\": <xsl:value-of select=\"div/@wf-action-id\"/>,</xsl:if>" +
										"<xsl:if test=\"div/@wf-panel-id\">\"wfPanelId\": <xsl:value-of select=\"div/@wf-panel-id\"/>,</xsl:if>" +
										"\"layout\": \"fit\"," +
										"\"style\": \"<xsl:value-of select=\"div/@style\"/>\"," +
										"\"wfClass\": \"<xsl:value-of select=\"div/@class\"/>\"" +
										"<xsl:if test=\"table\">, \"items\": <xsl:call-template name=\"workflow\"/></xsl:if>" +
									"}" +
								"}" +
								"<xsl:if test=\"position()!=last()\">,</xsl:if>" +
							"</xsl:for-each>" +
						"]}" +
						"<xsl:if test=\"position()!=last()\">,</xsl:if>" +
					"</xsl:for-each>" +
				"]}" +
			"</xsl:template>" +
		"</xsl:stylesheet>",

	/**
	 * @private
	 */
	makeProcessor: function () {
		var xslt,
			processor;

		if (this.isIE()) {
			try {
				xslt = new ActiveXObject("Msxml2.XSLTemplate");
				xslt.stylesheet = this.loadStyleSheetXml();
				processor = xslt.createProcessor();
			} catch (e) {
				this.logger_.severe("Error creating xslt processor: " + e.message, e);
			}
		} else {
			try {
				processor = new XSLTProcessor();
			} catch (e) {
				this.logger_.severe("Error creating xslt processor: " + e.message, e);
			}

			if (goog.isDefAndNotNull(processor)) {
				var sh = this.loadStyleSheetXml();

				if (goog.isDefAndNotNull(sh)) {
					try {
						processor.importStylesheet(sh);
					} catch (e) {
						this.logger_.severe("Error importing style sheet: " + e.message, e);
					}
				}
			}
		}
		return processor;
	},

	/**
	 * @private
	 */
	isIE: function () {
		return goog.isDef(window.ActiveXObject);
	},

	/**
	 * @private
	 */
	loadStyleSheetXml: function () {
		try {
			if (this.isIE()) {
				var xsl = new ActiveXObject("Msxml2.FreeThreadedDOMDocument");
				xsl.loadXML(this.styleSheet);
				return xsl;
			} else {
				return goog.dom.xml.loadXml(this.styleSheet);
			}
		} catch (e) {
			this.logger_.severe("Error loading styleSheet: " + e.message, e);
		}
	},

	/**
	 * @private
	 */
	transform: function () {
		if (this.isIE()) {
			try {
				this.processor.input = this.xml;
				this.processor.transform();
				return this.processor.output.replace(/<?.+?>/, '');
			} catch (e) {
				this.logger_.severe("Error converting document: " + e.message, e);
			}
		} else {
			try {
				var doc = this.processor.transformToFragment(this.xml, document);
				if (goog.isDefAndNotNull(doc)) {
					return goog.dom.xml.serialize(doc);
				} else {
					this.logger_.warning("Converted document is empty...");
					return null;
				}
			} catch (e) {
				this.logger_.severe("Error converting document: " + e.message, e);
			}
		}
	},

	/**
	 * @public
	 */
	toJSON: function () {
		var transformedDocument = this.transform();
		if (goog.isDefAndNotNull(transformedDocument)) {
			try {
				return goog.json.parse(transformedDocument);
			} catch (e) {
				this.logger_.severe("Error parsing json: " + e.message, e);
			}
		}
		return null;
	}
};