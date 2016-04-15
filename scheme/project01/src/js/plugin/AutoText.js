/**
 * @class qiwi.plugin.AutoText
 * @singleton
 *
 * Плагин автотекста.
 *
 * Example: {
 *     xtype: 'textfield',
 *     autoTextTpl: '__.__.____',
 *     maskRe: /^[0-9]+$/,
 *     plugins: ['autotext']
 * }
 */
Ext.define('qiwi.plugin.AutoText', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.auto.text',

	PLACE_HOLDER: '_',

	/**
	 * @public
	 */
	init: function (field) {
		this.regExp = new RegExp(this.PLACE_HOLDER, 'g');
		field.__atRegExp2 = this.createRegexp2(field);

		field.on('render', this.onRender, this, {field: field}, 0);
	},

	/**
	 * @private
	 */
	onRender: function (f) {
		f.getEl().on(
			Ext.isGecko ? 'keypress' : 'keydown',
			this.onKeyPress,
			this,
			{field: f},
			true
		);

		f.getEl().on({
			paste: function (e) {
				e.preventDefault();
			},
			cut: function (e) {
				e.preventDefault();
			}
		});
	},

	/**
	 * @private
	 */
	onKeyPress: function (e, o, p) {
		var EO = Ext.EventObject,
			f = p.field,
			rw = this.split(f.getRawValue()),
			cp = f.getCaretPosition(),
			att = f.autoTextTpl;

		if ((e.isSpecialKey() || !this.isValidKeyCode(f, e.getCharCode())) &&
			e.keyCode !== EO.BACKSPACE && e.keyCode !== EO.DELETE) {
			return;
		}

		/**
		 * Все что вне шаблона - обычное поведение браузера
		 */
		if (e.keyCode === EO.BACKSPACE && cp > att.length) {
			return;
		}
		if (e.keyCode === EO.DELETE && cp >= att.length) {
			return;
		}

		if (e.keyCode === EO.BACKSPACE) {
			if (cp === 0) {
				e.stopEvent();
				return;
			}

			cp -= 1;
			if (this.isSeparator(f, cp)) {
				cp -= 1;
			}
			rw.splice(cp, 1, this.PLACE_HOLDER);
		} else if (e.keyCode === EO.DELETE) {
			if (this.isLastPosition(att, cp)) {
				e.stopEvent();
				return;
			}

			if (this.isSeparator(f, cp)) {
				f.setCaretPosition(cp + 1);
				e.stopEvent();
				return;
			}

			var z = this.getPositionOnDelKey(f, cp);
			rw.splice(cp + (z > -1 ? z : 0), 1, this.PLACE_HOLDER);
		} else {
			if (this.isLastPosition(att, cp)) {
				e.stopEvent();
				return;
			}

			if (this.isSeparator(f, cp)) {
				cp += 1;
			}
			rw.splice(cp, 1, this.getCharCode(e.getCharCode()));
			cp += 1;
		}

		f.setRawValue(this.join(rw));
		f.setCaretPosition(cp);
		e.stopEvent();
	},

	/**
	 * Высчитываем позицию заменяемого символа на PLACEHOLDER при нажатии DEL
	 *
	 * @private
	 */
	getPositionOnDelKey: function (f, cp) {
		var rwStr = f.getRawValue();
		rwStr = rwStr.substr(cp, rwStr.length - cp);
		return rwStr.search(f.__atRegExp2);
	},

	/**
	 * При вычислении позиции заменяемого символа при нажатии DEL мы должны НЕ учитывать PLACEHOLDER и знаки разделения
	 * в шаблоне
	 *
	 * @private
	 */
	createRegexp2: function (f) {
		return new RegExp('[^' + this.PLACE_HOLDER + (this.extractAutoTextSeparators(f)) + ']');
	},

	/**
	 * При вводе цифр с правой клавиатуры определяется код неверно для IE и Chrome для чисел от 0 до 9. Код клавиши 0
	 * на левой клавиатуре равен 48, а код той же клавиши на правой - 96. То есть разница между кодами есть число 48
	 *
	 * @private
	 */
	normalizeKey: function (keyCode) {
		var p = Ext.EventObjectImpl.prototype;
		return keyCode - ((Ext.isIE || Ext.isWebKit) && keyCode >= p.NUM_ZERO && keyCode <= p.NUM_NINE ? 48 : 0);
	},

	/**
	 * @private
	 */
	getCharCode: function (charCode) {
		return String.fromCharCode(this.normalizeKey(charCode));
	},

	/**
	 * @private
	 */
	isLastPosition: function (autoTextTpl, caretPosition) {
		return autoTextTpl.length === caretPosition;
	},

	/**
	 * @private
	 */
	isValidKeyCode: function (field, keyCode) {
		return !Ext.isDefined(field.maskRe) || field.maskRe.test(this.getCharCode(keyCode));
	},

	/**
	 * @private
	 */
	isSeparator: function (f, cp) {
		return this.extractAutoTextSeparators(f).indexOf(f.getRawValue()[cp]) > -1;
	},

	/**
	 * @private
	 */
	join: function (v) {
		return v.join('');
	},

	/**
	 * @private
	 */
	split: function (v) {
		return v.split('');
	},

	/**
	 * @private
	 */
	extractAutoTextSeparators: function (f) {
		return f.autoTextTpl.replace(this.regExp, '');
	}
});