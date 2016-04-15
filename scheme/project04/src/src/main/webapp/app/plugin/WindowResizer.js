/**
 * Workflow.plugin.WindowResizer
 *
 * Можно конечно задать width и height в процентах, но из коробки сборка при помощи sencha cmd не работает с данной
 * конфигурацией. Возможно это проблемы оптимизатора
 */
Ext.define('Workflow.plugin.WindowResizer', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.window.resize',

	requires: [
		'Ext.AbstractPlugin'
	],

	/**
	 * @public
	 */
	init: function (target) {
		this.updateWidth.call(target);

		target.on('resize', target.center, target);
		target.on('close', this.unResize, {
			me: this,
			target: target
		});

		Ext.on('resize', this.updateWidth, target);
	},

	/**
	 * @private
	 */
	unResize: function () {
		Ext.un('resize', this.me.updateWidth, this.target);
	},

	/**
	 * @private
	 */
	updateWidth: function () {
		var viewPortSize = goog.dom.getViewportSize(),
			height = viewPortSize.height,
			width = viewPortSize.width,
			factor = 0.9;

		this.setWidth(Math.round(width * factor));
		this.setHeight(Math.round(height * factor));
	}
});