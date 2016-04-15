/**
 * @class qiwi.plugin.CascadeWindow
 * @singleton
 *
 * Плагин для каскадирования открываемых окон.
 *
 * Пример работы:
 *
 * {
 *     xtype: 'window',
 *     plugins: ['qiwi.cascade.window']
 * }
 */
Ext.define('qiwi.plugin.CascadeWindow', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.cascade.window',

	deltaByX: 10,
	deltaByY: 10,

	/**
	 * @public
	 */
	init: function (window) {
		window.beforeShow = Ext.Function.createInterceptor(window.beforeShow, this.beforeShow, {
			plugin: this,
			window: window
		});

		var st = this.statics();

		window.on('render', function () {
			this.mon(this.getEl(), 'mousedown', function () {
				st.lastWindow = window;
			});
		}, window);
	},

	/**
	 * @private
	 */
	beforeShow: function () {
		var position,
			plugin = this.plugin,
			window = this.window,
			st = plugin.statics(),
			lastWindow = st.lastWindow;

		if (lastWindow && lastWindow.isVisible()) {
			position = lastWindow.getPosition();
			window.setPosition(
				position[0] + plugin.deltaByX,
				position[1] + plugin.deltaByY
			);
		}

		st.lastWindow = window;
	}
});