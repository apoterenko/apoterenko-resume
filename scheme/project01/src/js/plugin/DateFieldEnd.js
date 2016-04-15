/**
 * @class qiwi.plugin.DateFieldEnd
 * @singleton
 *
 * Плагин для автоматической подстановки временного периода после выбора даты в datepicker
 *
 * Example: {
 *        xtype: 'datefield',
 *        plugins: ['qiwi.date.field.end'],
 *        dateEndConfig: {
 *            format: 'H:mi:s'
 *            value: '23:59:59'
 *        }
 *    }
 */
Ext.define('qiwi.plugin.DateFieldEnd', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.date.field.end',

	init: function (component) {
		if (component.dateEndConfig) {
			component.setValue = this.setValue;
			component.parseDateChar = this.parseDateChar;
		}
	},

	/**
	 * @override
	 */
	setValue: function (date) {
		date = this.parseDateChar(date) || date;

		this.self.prototype.setValue.call(this, date);
	},

	/**
	 * @private
	 */
	parseDateChar: function(date) {
		var format, value,
			DC = this.dateEndConfig;

		if (!DC) {
			return date;
		}

		format = DC.format.split(/\W+/);
		value = DC.value.split(/\W+/);

		if (format.length !== value.length) {
			throw 'Wrong date format or pattern!';
		}

		Ext.each(format, function(character, index) {
			date = Ext.Date.add(date, character, value[index]);
		});

		return date;
	}
});