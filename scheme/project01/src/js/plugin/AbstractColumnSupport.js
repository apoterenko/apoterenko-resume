/**
 * @class qiwi.plugin.AbstractColumnSupport
 * @singleton
 *
 * Абстрактный класс, общий для плагин, которые рендерят во View внешние элементы, типа кнопок и т.п.
 */
Ext.define('qiwi.plugin.AbstractColumnSupport', {
	extend: 'Ext.AbstractPlugin',

	/**
	 * @public
	 */
	init: function (view, config) {
		var cfg = {view: view, targetCls: [].concat(config.targetCls)};

		view.on('viewready', this.onViewReady, this);
		view.on('itemupdate', this.onItemRefresh, this, cfg);
		view.on('refresh', this.onRefresh, this, cfg);
	},

	/**
	 * @private
	 */
	onViewReady: function (view) {
		this.SERVICE_CLS && view.getEl().addCls(this.SERVICE_CLS);
	},

	/**
	 * @private
	 */
	onRefresh: function (view, args) {
		var el = view.getEl();

		Ext.each(args.targetCls, function (i) {
			el.select('.' + i).each(this.processElement, view);
		}, this);
	},

	/**
	 * @private
	 */
	onItemRefresh: function (record, index, node, args) {
		var o,
			view = args.view,
			targetCls = args.targetCls,
			parent = Ext.fly(node).parent('.' + this.SERVICE_CLS);

		Ext.each(targetCls, function (i) {
			/**
			 * Плагину нужно знать, сколько элементов на одном уровне, поэтому при обновлении одного – мы вынуждены
			 * снова делать запрос
			 */
			o = parent.select('.' + i);

			Ext.fly(node).select('.' + i).each(function (el) {
				this.processElement.call(view, el, o, this.findIndex(o, el));
			}, this);
		}, this);
	},

	/**
	 * @private
	 */
	findIndex: function (o, el) {
		var i = 0,
			elements = o.elements,
			dom = el.dom,
			len = elements.length;

		for (; i < len; i++) {
			if (elements[i] === dom) {
				return i;
			}
		}
		return -1;
	},

	/**
	 * @protected
	 */
	processElement: Ext.emptyFn
});