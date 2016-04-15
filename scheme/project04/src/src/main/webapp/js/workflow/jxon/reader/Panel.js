/**
 * "Provide" section
 */
goog.provide('Workflow.jxon.reader.Panel');
goog.provide('WF.JRP');

/**
 * "Require" section
 */
goog.require('goog.object');
goog.require('goog.array');
goog.require('goog.string');
goog.require('Workflow.jxon.reader.Element');
goog.require('Workflow.jxon.reader.Base');

/**
 * Panel preparer implementation
 *
 * @constructor
 */
WF.JRP = Workflow.jxon.reader.Panel = function (panel, form) {
	WF.JRP.superClass_.constructor.apply(this, arguments);

	this.form = form;
	this.elements = {};
	this.hiddenElements = {};
	this.initMarkup(panel);
};

goog.inherits(WF.JRP, WF.JRBE);

goog.mixin(WF.JRP.prototype, {

	/**
	 * @private
	 */
	useWrapperMarkup: true,

	/**
	 * @private
	 */
	stringAttributes: 'description,style',

	/**
	 * @private
	 */
	booleanAttributes: 'expandbydefault',

	/**
	 * @private
	 */
	numericAttributes: 'id,storeclientdata,version,isreadonly',

	/**
	 * @private
	 */
	elementTpl: '<td class="wf-column-cls" colspan="{$colspan}" style="{$tdStyle}">{$body}</td>',

	/**
	 * @private
	 */
	elementBodyTpl: '<div style="{$style}" wf-element-id="{$id}" class="wf-element-cls"></div>',

	/**
	 * @private
	 */
	actionTpl: '<div style="{$style}" wf-action-id="{$id}" class="wf-action-cls"></div>',

	/**
	 * @private
	 */
	tBodyTpl: '<tbody style="{$style}">{$body}</tbody>',

	/**
	 * @private
	 */
	initMarkup: function (panel) {
		var me = this,
			id,
			el,
			style,
			width,
			percentWidth,
			colspan,
			params,
			actions,
			innerMatrix,
			rowMarkup,
			markup = [],
			matrix = [],
			maxColSpan = 0,
			actionsByElement = this.form.getActionsByElement();

		panel && panel.tr && goog.array.forEach([].concat(panel.tr), function (tr, indexY) {
			markup.push('<tr class="wf-row-cls">');
			matrix.push(innerMatrix = []);
			rowMarkup = [];

			tr.td && goog.array.forEach([].concat(tr.td), function (td, indexX) {
				el = td.element;
				innerMatrix.push([
					this.getAttributeNumericValue(td, 'colspan'),
					this.getAttributeValue(td, 'width')
				]);
				colspan = this.buildGoogTpl('colspan', indexY, indexX);

				if (el) {
					id = this.getAttributeNumericValue(el, 'id');
					actions = actionsByElement[id];
					style = this.buildTdStyle(td);

					rowMarkup.push(
						goog.getMsg(this.elementTpl, {
							tdStyle: style,
							body: this.buildTdBody(id, el, actions),
							colspan: colspan
						})
					);
					this.elements[id] = new WF.JRE(el, me.form);
				} else {
					rowMarkup.push(
						goog.getMsg(this.elementTpl, {
							tdStyle: style,
							body: '&nbsp;',
							colspan: colspan
						})
					);
				}
			}, this);

			maxColSpan = Math.max(innerMatrix.length, maxColSpan);
			markup.push(rowMarkup.join(''));
			markup.push('</tr>');
		}, this);

		panel && panel.element && goog.array.forEach([].concat(panel.element), function (element) {
			id = this.getAttributeNumericValue(element, 'id');
			this.hiddenElements[id] = new WF.JRE(element, me.form);
		}, this);

		this.markup = markup.join('');

		var dynamicColSpan,
			dynamicSumColSpan,
			dynamicMaxSumColSpan = 0;

		goog.array.forEach(matrix, function (row, indexY) {
			dynamicSumColSpan = 0;

			goog.array.forEach(row, function (column, indexX) {
				colspan = column[0];
				width = column[1];
				params = {};

				if (goog.isDefAndNotNull(width) && goog.string.endsWith(width, '%')) {
					percentWidth = goog.string.parseInt(width);
					/* Динамическое вычисление colspan (1) */
					colspan = Math.round(maxColSpan * percentWidth * 0.01);
				}

				dynamicColSpan = goog.math.isFiniteNumber(colspan) ? colspan : 1;
				dynamicSumColSpan += dynamicColSpan;

				params[this.buildGoogTpl('colspan', indexY, indexX, true)] = dynamicColSpan;
				this.markup = goog.getMsg(this.markup, params);
			}, this);

			dynamicMaxSumColSpan = Math.max(dynamicMaxSumColSpan, dynamicSumColSpan);
		}, this);

		this.headColSpan = Math.max(dynamicMaxSumColSpan, maxColSpan);

		this.initHeadActions(actionsByElement[this.getId()]);
	},

	/**
	 * @private
	 */
	wrapBody: function () {
		var styles = [],
			paddingTpl = '{$style}: {$value} solid transparent;';

		goog.object.forEach(this, function (v, key) {
			if (goog.string.startsWith(key, 'padding-')) {
				styles.push(
					goog.getMsg(paddingTpl, {
						style: key.replace('padding-', 'border-'),
						value: v
					})
				);
			}
		});

		this.markup = goog.getMsg(this.tBodyTpl, {
			body: this.markup,
			style: styles.join('')
		});
	},

	/**
	 * @private
	 */
	buildGoogTpl: function (name, indexY, indexX, noWrap) {
		var p = [name, '-', indexY, '-', indexX].join('');
		return noWrap === true ? p : ['{$', p, '}'].join('');
	},

	/**
	 * @private
	 */
	buildTdBody: function (id, el, actionsArray) {
		var result = {},
			body = goog.getMsg(this.elementBodyTpl, {id: id, style: this.buildStyle(el)});

		if (!goog.isArray(actionsArray)) {
			return body;
		}
		this.initHeadActions(actionsArray, result);

		return goog.getMsg(this.wrapperTpl, {
			cellpadding: 0,
			cellspacing: 0,
			head: result.headBottomActions || result.headTopActions ?
				goog.getMsg(this.headTpl, {
					header: '',
					headColSpan: 1,
					headBottomActions: result.headBottomActions,
					headTopActions: result.headTopActions
				}) : '',
			tableLayout: '',
			body: ['<tr class="wf-row-cls">'].concat(
				this.buildActionsBody(
					goog.array.filter(actionsArray, WF.JRAC.LEFT_OR_RIGHT_PREDICATE),
					body
				)
			).concat('</tr>').join('')
		});
	},

	/**
	 * @private
	 */
	buildTdStyle: function (td) {
		var style = [];
		style.push(this.getAttributePaddingValuesAsString(td));
		return style.join(';');
	},

	/**
	 * @private
	 */
	buildStyle: function (element) {
		var fontStyle = this.getPropertyValue(element, 'fontstyle'),
			align = this.getPropertyValue(element, 'align'),
			style = [];

		if (align) {
			style.push('text-align: ' + align);
		}
		if (fontStyle) {
			style.push('font-weight: ' + fontStyle);
		}
		return style.join(';');
	},

	/**
	 * @private
	 */
	buildActionsBody: function (actions, body) {
		if (!goog.isDefAndNotNull(actions) || (!actions.length && !body)) {
			return '';
		}

		actions = goog.array.filter(actions, WF.JRAC.NOT_DOWN_ACTION_PREDICATE);

		var out = [
			['<td class="wf-column-cls" style="width: 100%;">' + (body || '') + '</td>']
		];

		goog.array.sort(actions, WF.JRAC.ACTION_COMPARATOR);
		goog.array.forEach(actions, function (action) {
			if (!action.isInlinePosition()) {
				var bd = [
					'<td class="wf-column-cls">',
					goog.getMsg(this.actionTpl, {
						id: action.getId(),
						style: ''
					}),
					'</td>'
				].join('');

				if (action.isRightPosition() || action.isSpecialPosition() || action.isBottomPosition()
					|| (/* Специфичный случай (для таблицы) */ action.isElementLevel() && action.isTopPosition())) {
					out.push(bd);
				} else if (action.isLeftPosition() || action.isTopPosition()) {
					goog.array.insertAt(out, bd, 0);
				}
			}
		}, this);
		return out.join('');
	},

	/**
	 * @private
	 */
	initHeadActions: function (actions, scope) {
		scope = scope || this;

		scope.headTopActions = '';
		scope.headBottomActions = '';

		if (goog.isDefAndNotNull(actions) && (actions = [].concat(actions)) && actions.length) {
			actions = goog.array.filter(actions, WF.JRAC.NOT_FORM_LEVEL_PREDICATE);

			if (actions.length) {
				scope.headTopActions = this.buildActionsWrapper(this.buildActionsBody(
					goog.array.filter(actions, WF.JRAC.TOP_POSITION_PREDICATE)
				));
				scope.headBottomActions = this.buildActionsWrapper(this.buildActionsBody(
					goog.array.filter(actions, WF.JRAC.BOTTOM_POSITION_PREDICATE)
				));
			}
		}
	},

	/**
	 * @private
	 */
	buildActionsWrapper: function (body) {
		return body ?
			goog.getMsg(this.wrapperTpl, {
				tableLayout: '',
				head: '',
				body: ['<tr class="wf-row-cls">', body, '</tr>'].join('')
			}) : '';
	},

	/**
	 * @public
	 */
	getElements: function () {
		return this.elements;
	},

	/**
	 * @public
	 */
	getHiddenElements: function () {
		return this.hiddenElements;
	},

	/**
	 * @public
	 */
	getForm: function () {
		return this.form;
	},

	/**
	 * @public
	 */
	isExpandByDefault: function () {
		return !!this.expandbydefault;
	}
});