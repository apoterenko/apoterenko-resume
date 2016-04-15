/**
 * @class qiwi.plugin.SurfaceLabel
 * @singleton
 *
 * Плагин для отображения надписи посередине в контейнере
 *
 * Example: {
 *        xtype: 'panel'
 *        surfaceLabelConfig: {text: 'text},
 *        plugins: ['qiwi.surface.label']
 *    }
 */
Ext.define('qiwi.plugin.SurfaceLabel', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.surface.label',

	/**
	 * @public
	 */
	init: function (container) {

		container.__surfaceLabel = Ext.apply({
			tag: 'span',
			style: 'position: absolute; cursor: default;'
		}, container.surfaceLabelConfig);

		container.addEvents('updatesurfacelabel');

		container.on({
			scope: container,
			render: this.onRender,
			resize: this.onResize,
			updatesurfacelabel: this.onUpdateSurfaceLabel
		});
	},

	/**
	 * @private
	 */
	onRender: function () {
		this.__surfaceLabel = Ext.DomHelper.append(
			this.getEl(),
			this.__surfaceLabel,
			true
		);

		var slc = this.surfaceLabelConfig;

		if (Ext.isDefined(slc)) {
			this.fireEvent('updatesurfacelabel', this, slc.text);
		}
	},

	/**
	 * @private
	 */
	onResize: function () {
		var el = this.getEl(),
			bh = el.getHeight(true),
			bw = el.getWidth(true);

		this.__surfaceLabel.setTop(Math.floor(bh / 2));
		this.__surfaceLabel.setLeft(Math.floor(bw / 2) - (this.__surfaceLabel.getWidth() / 2));
	},

	/**
	 * @private
	 */
	onUpdateSurfaceLabel: function (o, value) {
		this.__surfaceLabel.update(value);
		this.__surfaceLabel.setLeft(Math.floor(this.getEl().getWidth(true) / 2) - (this.__surfaceLabel.getWidth() / 2));
	}
});