/**
 * Workflow.plugin.MultiField
 */
Ext.define('Workflow.plugin.MultiField', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.multi.field',

	requires: [
		'Ext.dom.Element',
		'Ext.AbstractPlugin',
		'Ext.DomHelper'
	],

	/**
	 * @public
	 */
	init: function (target) {
		target.addCls('sencha-multi-field');

		if (!(SH.DNN(target.wfElement) && target.wfElement.hasEditor())) {
			target.addCls('sencha-multi-no-editor');
		}

		var config = {
			scope: {
				me: this,
				target: target
			},
			multifieldselect: this.onMultiFieldSelect
		};

		if (!target.readOnly) {
			config.componenteventkey = this.onComponentEventKey;
			config.multifieldclear = this.onMultiFieldClear;
			config.multifieldeditor = this.onMultiFieldEditor;
		} else {
			config.render = this.onMultiFieldRender;
		}
		target.on(config);
	},

	/**
	 * @private
	 */
	onMultiFieldRender: function () {
		this.me.setInputVisibility.call(this, false);
	},

	/**
	 * @private
	 */
	onComponentEventKey: function (o, event) {
		var target = this.target,
			images;

		if (!target.getRawValue() && event.getKey() === event.BACKSPACE) {
			images = target.getEl().query('.sencha-multi-field-close', false);
			images.length && this.me.doClose.call({
				multiPartEl: images[images.length - 1].parent('.sencha-multi-part'),
				target: target,
				me: this.me
			});
		}
	},

	/**
	 * @private
	 */
	onMultiFieldEditor: function (scope, flag) {
		this.me.setInputVisibility.call(this, flag);
	},

	/**
	 * @private
	 */
	onMultiFieldClear: function () {
		this.me.doClose.call(this);
	},

	/**
	 * @private
	 */
	onMultiFieldSelect: function (o, content) {
		var me = this.me;
		me.doInsertContent.call(this, content);
		me.updateLayout.call(this);
	},

	/**
	 * @private
	 */
	doInsertContent: function (content) {
		var DH = Ext.DomHelper,
			multiPartEl,
			img,
			target = this.target,
			el = this.me.getInputElement.call(this);

		multiPartEl = DH.insertBefore(el, {
			tag: 'span',
			cls: 'sencha-multi-part',
			html: Ext.String.format(
				'<table cellpadding="0" cellspacing="0"><tr>' +
					'<td><div class="sencha-multi-part-inner">{0}</div></td>' +
					'<td><img class="sencha-multi-field-close" src="resources/img/delete_s.gif"></td>' +
					'</tr></table>',
				content
			)
		}, true);

		img = multiPartEl.query('.sencha-multi-field-close', false);
		if (img && img.length) {
			img[0].on('click', this.me.doClose, {
				multiPartEl: multiPartEl,
				target: target,
				me: this.me
			});
		}
	},

	/**
	 * @private
	 */
	getMultiPartElPosition: function (el, targetEl) {
		var position = -1,
			f = true;

		if (SH.NDNN(targetEl)) {
			return position++;
		}

		SH.AFE(el.query('.sencha-multi-part'), function (a) {
			f && position++;
			targetEl.dom === a && (f = false);
		});
		return position;
	},

	/**
	 * @private
	 */
	updateLayout: function () {
		this.target.sbcConfig.getRoot().updateLayout();
	},

	/**
	 * @private
	 */
	doClose: function () {
		var me = this.me,
			target = this.target,
			wfElement = target.wfElement,
			multiPartEl = this.multiPartEl,
			isClearAll = SH.NDNN(multiPartEl),
			position = me.getMultiPartElPosition(target.getEl(), multiPartEl),
			linked = wfElement.isLinked();

		if (target.fireEvent('multifieldbeforeclose', target, position, linked, isClearAll) === true) {
			SH.AFE(target.getEl().query('.sencha-multi-part', false), function (el, index) {
				if ((linked && (position <= index)) || (!linked && position === index) || isClearAll) {
					el.remove();
				}
			});

			me.setInputVisibility.call(this, true);
			me.getInputElement.call(this).focus();
		}

		me.updateLayout.call(this);
	},

	/**
	 * @private
	 */
	getInputElement: function () {
		var target = this.target,
			cfg = target.multiFieldConfig;

		return target[SH.DNN(cfg) && cfg.elName || 'inputEl'];
	},

	/**
	 * @private
	 */
	setInputVisibility: function (flag) {
		this.target[flag ? 'removeCls' : 'addCls']('sencha-multi-no-editor');
	}
});