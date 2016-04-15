/**
 * @class qiwi.plugin.DatePickerSpecificDay
 * @singleton
 *
 * Плагин позволяет переопределять поведение кнопки “Сегодня”, превращая ее в кнопку с определенным значением
 *
 * Example: {
 *        xtype: 'datepicker',
 *        pickerField: ...
 *        plugins: ['qiwi.date.picker.specific.day'],
 *
 *        specificDayConfig: {
 *            text: 'text',
 *            value: new Date(),
 *            predicate: function (newValue) {...}
 *        }
 *    }
 */
Ext.define('qiwi.plugin.DatePickerSpecificDay', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.date.picker.specific.day',

	/**
	 * @public
	 */
	init: function (datepicker) {
		if (!Ext.isDefined(datepicker.specificDayConfig)) {
			return;
		}

		var me = this,
			fn = datepicker.update;

		datepicker.update = function (newValue) {
			fn.apply(this, arguments);
			me.onUpdate.call(this);
		};

		datepicker.selectToday = this.selectSpecificDay;
		datepicker.on('render', this.onRender, datepicker);
	},

	/**
	 * @private
	 */
	onRender: function () {
		this.todayBtn.setText(this.specificDayConfig.text);
	},

	/**
	 * @private
	 */
	onUpdate: function () {
		var cfg = this.specificDayConfig,
			pf = this.pickerField,
			cells = this.cells,
			cls = this.selectedCls,
			sCls = 'qiwi-date-picker-specific-day',
			tCls = Ext.baseCSSPrefix + 'datepicker-today',
			v = pf.getValue(),
			isSpecificValue = Ext.isDate(v) && cfg.predicate.call(cfg, v) === true;

		if (!Ext.isDate(v) || isSpecificValue) {
			/**
			 * В поле не валидное значение, либо выбрана специфичная дата, тогда убираем выделение
			 */
			cells.each(function (c) {
				c.removeCls(cls);
				c.removeCls(tCls);
			}, this);
		}

		if (isSpecificValue) {
			/**
			 * В поле выбрана специфичная дата, поэтому кнопку подсвечиваем
			 */
			this.todayBtn.addCls(sCls);
		} else {
			this.todayBtn.removeCls(sCls);
		}
	},

	/**
	 * Copy of "Ext.picker.Date.selectToday"
	 *
	 * @private
	 */
	selectSpecificDay: function () {
		var me = this,
			btn = me.todayBtn,
			handler = me.handler;

		if (btn && !btn.disabled) {
			/**
			 * Ext version: new Date()
			 *
			 * -->
			 *
			 * Qiwi version: this.specificDayConfig.value
			 */
			me.setValue(this.specificDayConfig.value);

			me.fireEvent('select', me, me.value);
			if (handler) {
				handler.call(me.scope || me, me, me.value);
			}
			me.onSelect();
		}
		return me;
	}
});