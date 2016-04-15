/**
 * "Provide" section
 */
goog.provide('Workflow.jxon.Tree');
goog.provide('WF.JXT');

/**
 * "Require" section
 */
goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.xml');

/**
 * JXON implementation
 * @constructor
 * @param xml
 */
WF.JXT = Workflow.jxon.Tree = function (xml) {
	goog.isString(xml) && (xml = goog.dom.xml.loadXml(xml));

	this.__all = arguments[2] || {};
	this.__idKeyName = arguments[1] || 'id';

	goog.isFunction(xml.hasChildNodes) && xml.hasChildNodes() && this.initValue(xml);
	goog.isFunction(xml.hasAttributes) && xml.hasAttributes() && this.initAttributes(xml);
};

WF.JXT.prototype = {

	/**
	 * @private Init key value
	 */
	initValue: function (root) {
		this.__value = goog.dom.getRawTextContent(root);

		goog.array.forEach(goog.dom.getChildren(root), function (n) {
			var p,
				c = new WF.JXT(n, this.__idKeyName, this.__all);

			c.__parent = this;

			if (this.hasOwnProperty(p = this.getName(n.nodeName))) {
				if (!goog.isArray(this[p])) {
					this[p] = [this[p]];
				}
				this[p].push(c);
			} else {
				this[p] = c;
			}
		}, this);
	},

	/**
	 * @private Init attributes
	 */
	initAttributes: function (xml) {
		this.__keyAttributes = {};

		goog.array.forEach(xml.attributes, function (attr) {
			var v,
				name = this.getName(attr.name);

			this.__keyAttributes[name] = v = this.getValue(attr.value);
			name === this.__idKeyName && (this.__all[v] = this);
		}, this);
	},

	/**
	 * @private Get value
	 */
	getValue: function (value) {
		return value || null;
	},

	/**
	 * @private Get value
	 */
	getName: function (name) {
		return name.toLowerCase().replace(/\./g, '');
	},

	/**
	 * @public Get element by id
	 */
	getElementById: function (id) {
		return this.__all['' + id];
	}
};