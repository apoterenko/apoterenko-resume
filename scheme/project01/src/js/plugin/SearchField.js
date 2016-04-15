/**
 * @class qiwi.plugin.SearchField
 * @singleton
 *
 * Плагин позволяет полю ввода получить функционал поискового поля ввода. Поисковое поле ввода реагирует на изменение
 * содержимого поля и выбрасывает событие search. Внешний потребитель обрабатывает это событие, и мы можем осуществить
 * поиск по данному событию.
 *
 * Example: {
 *     xtype: 'field',
 *     plugins: ['qiwi.field.search'],
 *
 *     listeners: {
 *         search: function() {
 *             ...
 *             store.load(...);
 *         }
 *     }
 * }
 */
Ext.define('qiwi.plugin.SearchField', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.field.search',

	DELAY_TIMEOUT: 1000,

	init: function (field) {
		var task = new Ext.util.DelayedTask();

		field.on('specialkey', this.onSpecialKey, this);

		field.on({
			scope: task,
			blur: task.cancel,
			specialkey: task.cancel
		});

		if (field.delayTimeout !== 0) {
			field.on('change', this.onChange, this, {field: field, task: task});
		}

		field.addEvents('search', 'cancel', 'upkey', 'downkey');

		/**
		 * В первый раз вызов checkChange не должен приводить к выбросу события search
		 */
		field.lastValue = field.getValue();
	},

	/**
	 * @private
	 */
	onSpecialKey: function (field, e) {
		switch (e.getKey()) {
			case e.ENTER:
				this.doSearch.apply(field);
				break;
			case e.ESC:
				field.fireEvent('cancel', field);
				break;
			case e.UP:
				field.fireEvent('upkey', field, e);
				break;
			case e.DOWN:
				field.fireEvent('downkey', field, e);
				break;
		}
	},

	/**
	 * @private
	 */
	onChange: function (a, b, c, args) {
		if (!Ext.isDefined(args)) {
			return;
		}

		var field = args.field;
		args.task.delay(field.delayTimeout || this.DELAY_TIMEOUT, this.doSearch, field, {task: args.task});
	},

	/**
	 * @private
	 */
	doSearch: function () {
		this.fireEvent('search', this, this.getRawValue());
	}
});