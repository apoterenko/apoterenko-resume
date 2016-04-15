/**
 * @class qiwi.plugin.ToolbarButton
 * @singleton
 *
 * Инжектируемая кнопка в toolbar
 *
 * Пример работы:
 *
 * {
 *     xtype: 'toolbar',
 *     plugins: ['qiwi.toolbar.button'],
 *
 *     tbConfig: {
 *            ...,
 *            handler: function () {..}
 *     }
 * }
 */
Ext.define('qiwi.plugin.ToolbarButton', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.toolbar.button',

	/**
	 * @public
	 */
	init: function (toolbar) {
		if (!Ext.isDefined(toolbar.tbConfig)) {
			return;
		}

		toolbar.on('afterrender', this.onAfterRender, {
			me: this,
			toolbar: toolbar
		});
	},

	/**
	 * @private
	 */
	onAfterRender: function () {
		var btn,
			me = this.me,
			toolbar = this.toolbar;

		/* Display info support */
		var ti = toolbar.items,
			position = ti.getCount(),
			indexOfDisplayItem = ti.indexOf(ti.getByKey('displayItem'));

		if (indexOfDisplayItem > -1) {
			position = indexOfDisplayItem - 1;
		}

		toolbar.items.insert(
			position,
			toolbar.__tButton = btn = Ext.create('Ext.button.Button', Ext.merge({
				ui: 'default-toolbar'
			}, toolbar.tbConfig))
		);

		if (Ext.isDefined(toolbar.store)) {
			toolbar.store.on({
				scope: {
					toolbar: toolbar,
					btn: btn
				},
				load: me.onLoad,
				beforeload: me.doHide,
				beforepoll: me.doHide,
				abort: me.doHide,
				disconnect: me.doHide,
				exception: me.doHide
			});
		}
	},

	/**
	 * @private
	 */
	onLoad: function (o, response) {
		var store = this.toolbar.store;

		if (Ext.isFunction(store.getTotalCount) && !store.getTotalCount()) {
			return;
		}

		if ((Ext.isEmpty(response) || Ext.isEmpty(response.data) || !response.data.length)
			&& (!Ext.isArray(response) || (Ext.isArray(response) && !response.length))) {
			return;
		}

		this.btn.show();
		this.toolbar.doLayout();
	},

	/**
	 * @private
	 */
	doShow: function () {
		this.btn.show();
		this.toolbar.doLayout();
	},

	/**
	 * @private
	 */
	doHide: function () {
		this.btn.hide();
	}
});