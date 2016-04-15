/**
 * "Provide" section
 */
goog.provide('Workflow.jxon.reader.Base');
goog.provide('WF.JRBE');

/**
 * "Require" section
 */
goog.require('goog.array');
goog.require('goog.string');
goog.require('goog.object');
goog.require('goog.dom');

/**
 * Base element preparer implementation
 *
 * @constructor
 */
WF.JRBE = Workflow.jxon.reader.Base = function (cmp) {
	this.colSpan = 1;
	this.headColSpan = 1;
	this.headTopActions = this.headBottomActions = '';
	cmp && this.init(cmp);
};

goog.mixin(WF.JRBE.prototype, {

	/**
	 * @private
	 */
	wrapperTpl: '<table cellpadding="0" cellspacing="0" style="width: 100%; height: 100%; {$tableLayout}">{$head}' +
		'{$body}' +
		'</table>',

	/**
	 * @private
	 */
	headTpl: '<thead>' +
		'{$header}' +
		'<tr class="wf-row-cls">' +
		'<td colspan={$headColSpan} class="wf-header-action-cls wf-column-cls">{$headTopActions}</td>' +
		'</tr>' +
		'</thead>' +
		'<tfoot><tr class="wf-row-cls"><td colspan={$headColSpan} class="wf-footer-action-cls wf-column-cls">{$headBottomActions}</td></tr></tfoot>',

	/**
	 * @private
	 */
	headerTpl: '<tr class="wf-header-cls wf-row-cls">' +
		'<td colspan={$headColSpan} class="wf-header-text-cls wf-column-cls"><div style="float: left;">{$description}</div><div style="float: right;">+</div></td>' +
		'</tr>',

	/**
	 * @public
	 */
	init: function (cmp, from) {
		this.initAttributes(cmp, from);
		this.initProperties(cmp, from);
		this.initCallbacks(cmp, from);
	},

	/**
	 * @public
	 */
	getId: function () {
		return this.id;
	},

	/**
	 * @public
	 */
	getName: function () {
		return this.name;
	},

	/**
	 * @public
	 */
	getType: function () {
		return this.type;
	},

	/**
	 * @public
	 */
	isHidden: function () {
		return (this.type && this.type === 'Identificator') || this.defvisible === 0;
	},

	/**
	 * @public
	 */
	getFormat: function () {
		return this.format;
	},

	/**
	 * @public
	 */
	getMarkup: function () {
		if (!this.useWrapperMarkup) {
			return this.markup;
		}

		var params = this.getMarkupParams();
		params.header = this.useHeader() ? goog.getMsg(this.headerTpl, params) : '';
		params.head = goog.getMsg(this.headTpl, params);

		return goog.getMsg(this.wrapperTpl, params);
	},

	/**
	 * @protected
	 */
	getMarkupParams: function () {
		return  {
			body: this.markup,
			headTopActions: this.headTopActions,
			headBottomActions: this.headBottomActions,
			colspan: this.colSpan,
			headColSpan: this.headColSpan,
			description: this.description || '',
			tableLayout: 'table-layout: fixed;'
		};
	},

	/**
	 * @public
	 */
	getDescription: function () {
		return this.description;
	},

	/**
	 * @public
	 */
	getVerifyRegExp: function () {
		return this.verify_re;
	},

	/**
	 * @public
	 */
	getVerifyError: function () {
		return this.verify_error;
	},

	/**
	 * @public
	 */
	getTitle: function () {
		return this.title;
	},

	/**
	 * @public
	 */
	getOnLoad: function () {
		return this.onload;
	},

	/**
	 * @public
	 */
	getOnChange: function () {
		return this.onchange;
	},

	/**
	 * @private
	 */
	initProperties: function (cmp, from) {
		var sc = (from || this),
			sp = sc.stringProperties,
			np = sc.numericProperties,
			op = sc.objectProperties;

		op && goog.object.forEach(op, function (prop, key) {
			var v = cmp[key],
				rv,
				ra;

			if (v) {
				rv = v[prop.root];
				this[prop.root] = ra = [];

				rv && (rv = [].concat(rv)) && goog.array.forEach(rv, function (rValue) {
					var el = new Workflow.jxon.reader.Base(rValue);
					el.init(rValue, prop);
					ra.push(el);
				});
			}
		}, this);

		sp && goog.array.forEach(sp.split(','), function (prop) {
			cmp[prop] && (this[prop] = this.getPropertyValue(cmp, prop));
		}, this);

		np && goog.array.forEach(np.split(','), function (prop) {
			cmp[prop] && (this[prop] = this.getPropertyNumericValue(cmp, prop));
		}, this);
	},

	/**
	 * @public
	 */
	getPropertyValue: function (cmp, property) {
		return cmp[property] && cmp[property].__value;
	},

	/**
	 * @public
	 */
	getPropertyNumericValue: function (cmp, property) {
		return goog.string.parseInt(this.getPropertyValue(cmp, property));
	},

	/**
	 * @public
	 */
	getAttributeValue: function (cmp, property) {
		return cmp.__keyAttributes[property];
	},

	/**
	 * @public
	 */
	getAttributeNumericValue: function (cmp, property) {
		return goog.string.parseInt(this.getAttributeValue(cmp, property));
	},

	/**
	 * @public
	 */
	getAttributePaddingValues: function (cmp) {
		var value,
			values = {};

		goog.array.forEach(
			['paddingbottom', 'paddingleft', 'paddingright', 'paddingtop'],
			function (name) {
				value = this.getAttributeNumericValue(cmp, name);
				if (goog.math.isFiniteNumber(value)) {
					values[name.replace('padding', 'padding-')] = value + 'px';
				}
			}, this);
		return values;
	},

	/**
	 * @public
	 */
	getAttributePaddingValuesAsString: function (cmp) {
		var style = [],
			values = this.getAttributePaddingValues(cmp);

		goog.object.forEach(values, function (v, key) {
			style.push(key + ': ' + v);
		});
		return style.join(';');
	},

	/**
	 * @private
	 */
	initAttributes: function (cmp, from) {
		var sc = (from || this),
			na = sc.numericAttributes,
			sa = sc.stringAttributes,
			ba = sc.booleanAttributes,
			ka = cmp.__keyAttributes;

		sa && goog.array.forEach(sa.split(','), function (prop) {
			ka[prop] && (this[prop] = this.getAttributeValue(cmp, prop));
		}, this);

		na && goog.array.forEach(na.split(','), function (prop) {
			ka[prop] && (this[prop] = this.getAttributeNumericValue(cmp, prop));
		}, this);

		ba && goog.array.forEach(ba.split(','), function (prop) {
			ka[prop] && (this[prop] = (this.getAttributeValue(cmp, prop)) === 'true');
		}, this);
	},

	/**
	 * @private
	 */
	initCallbacks: function (cmp, from) {
		var v,
			sc = (from || this),
			cl = sc.callbacksList;

		this.callbacks = {};

		cl && goog.array.forEach(cl.split(','), function (prop) {
			cmp[prop] && (v = this.getPropertyValue(cmp, prop)) && (this.callbacks[prop] = v);
		}, this);
	},

	/**
	 * @private
	 */
	getPanelsMap: function (dom) {
		return this.getTagsMap(dom, 'panel');
	},

	/**
	 * @private
	 */
	getElementsMap: function (dom) {
		return this.getTagsMap(dom, 'element');
	},

	/**
	 * @public
	 */
	getActionsMap: function (dom) {
		return this.getTagsMap(dom, 'action');
	},

	/**
	 * @public
	 */
	getTagsMap: function (dom, nsp) {
		var doms = {},
			els = goog.dom.getElementsByTagNameAndClass('div', 'wf-' + nsp + '-cls', dom);

		goog.array.forEach(els, function (node) {
			var attributes = node.attributes,
				o;

			goog.isArrayLike(attributes) && (o = goog.array.find(attributes, function (attr) {
				return attr.name === 'wf-' + nsp + '-id'
			}));
			o && (doms[goog.string.parseInt(o.value)] = node);
		});
		return doms;
	},

	/**
	 * @private
	 */
	useHeader: function () {
		return this.style === 'pGroup';
	}
});