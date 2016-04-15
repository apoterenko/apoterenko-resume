/**
 * @class qiwi.plugin.DisplayValue
 * @singleton
 *
 * Плагин позволяет изменять отображаемое значение при потере фокуса в зависимости от значения поля
 *
 * Example: {
 *        xtype: 'field',
 *        plugins: ['qiwi.display.value'],
 *
 *        displayValueConfig: {
 *
 *           getValue: function (field, value) { return ... }
 *        }
 *    }
 */
Ext.define('qiwi.plugin.DisplayValue', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.display.value',

	/**
	 * @public
	 */
	init: function (field) {
		var args = {field: field};

		field.on('focus', this.onFieldFocus, this, args);
		field.on('blur', this.onFieldBlur, this, args);
		field.on('render', this.onFieldRender, this, args);
		field.on('resize', this.onFieldResize, field);
	},

	/**
	 * @private
	 */
	onFieldResize: function () {
		var el = Ext.fly(this.__dvMsgDom),
			ml = parseInt(el.getStyle('margin-left'));

		el.applyStyles({width: (this.getFocusEl().getWidth() - (Ext.isNumber(ml) ? ml : 0) * 2) + 'px'});
	},

	/**
	 * @private
	 */
	onFieldFocus: function (field) {
		this.setState(field, true, true);
	},

	/**
	 * @private
	 */
	onFieldBlur: function (field) {
		this.setState(field, false, true);
	},

	/**
	 * @private
	 */
	onFieldRender: function (field, args) {
		this.makeMsgDom.call(field);

		var msgEl = this.getMsgEl.call(field);
		msgEl.unselectable();
		msgEl.on('click', this.onMsgClick, this, args);

		this.setState(field, false, false);
	},

	/**
	 * @private
	 */
	onMsgClick: function (e, o, args) {
		args.field.focus();
	},

	/**
	 * @private
	 */
	setState: function (field, onFocusEvent, onEvent) {
		if (!field.rendered) {
			return;
		}

		var inputEl = field.getFocusEl(),
			msgEl = this.getMsgEl.call(field);

		if (!onEvent && inputEl.hasCls(Ext.baseCSSPrefix + 'form-focus')) {
			/**
			 * Сюда перешли, если процедура setState вызывается НЕ по событиям focus и blur поля ввода, тогда если
			 * поле УЖЕ имеет фокус ввода, то ничего не делаем (например, в случае вызова setValue, происходит
			 * установка действительного значения, но так как фокус ввода был, то мы ничего далее не делаем)
			 */
			return;
		}

		if (onFocusEvent) {
			/**
			 * Сюда перешли, если поле ввода получило фокус, то всегда отображаем действительное значение поля
			 */
			msgEl.applyStyles({display: 'none'});
			inputEl.applyStyles({color: ''});
		} else {
			/**
			 * Если поле НЕ имеет фокус ввода, то отображаем в зависимости от того, содержит ли поле “представление”
			 */
			var displayValue = this.extractDisplay(field);

			if (this.isValidDisplayValue(displayValue)) {
				msgEl.update(displayValue);
				msgEl.applyStyles({display: 'block'});

				/* Действительное значение скрываем */
				inputEl.applyStyles({color: 'transparent'});
			} else {
				msgEl.update('');
				msgEl.applyStyles({display: 'none'});
			}
		}
	},

	/**
	 * @private
	 */
	isValidDisplayValue: function (displayValue) {
		return Ext.isDefined(displayValue) && displayValue !== null && displayValue !== '';
	},

	/**
	 * @private
	 */
	extractDisplay: function (field) {
		var cfg = field.displayValueConfig;
		return cfg.getValue.call(cfg, field, field.getValue());
	},

	/**
	 * @private
	 */
	makeMsgDom: function () {
		return this.__dvMsgDom = Ext.DomHelper.append(
			this.getFocusEl().parent(),
			{
				tag: 'div',
				cls: 'qiwi-display-value ' + this.fieldCls
			}
		);
	},

	/**
	 * @private
	 */
	getMsgEl: function () {
		return Ext.fly(this.__dvMsgDom);
	}
});