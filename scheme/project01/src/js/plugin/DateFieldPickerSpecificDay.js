/**
 * @class qiwi.plugin.DateFieldPickerSpecificDay
 * @singleton
 *
 * Плагин позволяет переопределять поведение кнопки “Сегодня”, превращая ее в кнопку с определенным значением
 *
 * Example: {
 *        xtype: 'datefield',
 *        plugins: ['qiwi.date.field.picker.specific.day'],
 *
 *        specificDayConfig: {
 *            text: 'text',
 *            value: new Date()
 *        },
 *
 *        selectedDayConfig: {
 *             getValue: function (field, oldValue, newValue) {
 *                 return ...
 *             }
 *        }
 *    }
 */
Ext.define('qiwi.plugin.DateFieldPickerSpecificDay', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.date.field.picker.specific.day',

	/**
	 * @public
	 */
	init: function (datefield) {
		datefield.picker = this.createPicker.call(datefield);
	},

	/**
	 * Copy of "Ext.form.field.Date.createPicker" with plugin's inject
	 *
	 * @private
	 */
	createPicker: function () {
		/**
		 * ExtJS's code
		 */
		var config,
			me = this,
			format = Ext.String.format;

		config = {
			pickerField: me,
			ownerCt: me.ownerCt,
			renderTo: document.body,
			floating: true,
			hidden: true,
			focusOnShow: true,
			minDate: me.minValue,
			maxDate: me.maxValue,
			disabledDatesRE: me.disabledDatesRE,
			disabledDatesText: me.disabledDatesText,
			disabledDays: me.disabledDays,
			disabledDaysText: me.disabledDaysText,
			format: me.format,
			showToday: me.showToday,
			startDay: me.startDay,
			minText: format(me.minText, me.formatDate(me.minValue)),
			maxText: format(me.maxText, me.formatDate(me.maxValue)),
			listeners: {
				scope: me,
				select: me.onSelect
			},
			keyNavConfig: {
				esc: function () {
					me.collapse();
				}
			}
		};

		/**
		 * Qiwi inject
		 */
		if (this.specificDayConfig) {
			Ext.apply(config, {
				specificDayConfig: this.specificDayConfig,
				plugins: ['qiwi.date.picker.specific.day']
			});
		}

		if (this.selectedDayConfig) {

			Ext.apply(config, {

				/**
				 * @public
				 */
				setValue: function (newValue) {
					/**
					 * Дата может меняться, в зависимости от нужд пользователя API – поэтому при открытии списка
					 * может быть выбрана дата, отличная от того, что выбрано в поле ввода даты
					 */
					this.self.prototype.setValue.call(
						this,
						arguments.callee.caller !== me.self.prototype.onExpand
							? newValue
							: me.selectedDayConfig.getValue.call(this, me, me.getValue(), newValue)
					);
				}
			});
		}

		return Ext.create('Ext.picker.Date', config);
	}
});