/**
 * @class qiwi.plugin.CellPreview
 * @singleton
 *
 * Плагин предпросмотра содержимого ячейки в таблице
 *
 * Пример работы:
 *
 * {
 *     xtype: 'view',
 *     plugins: ['qiwi.cell.preview'],
 *
 *     cellPreviewConfig: {
 *          pattern: /([a-z]+)-...-([0-9]+)/,  // action/primary key
 *          timeout: ...
 *          tip: {...},
 *          value: function (action, record) {...}
 *     }
 * }
 */
Ext.define('qiwi.plugin.CellPreview', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.qiwi.cell.preview',

	timeout: 100,

	/**
	 * @public
	 */
	init: function (view) {
		if (!Ext.isDefined(view.cellPreviewConfig)) {
			return;
		}

		var task = new Ext.util.DelayedTask(),
			cfg = view.cellPreviewConfig,
			tip = Ext.create('Ext.tip.ToolTip', Ext.apply({
				renderTo: Ext.getBody(),
				anchor: 'bottom',
				disabled: true
			}, cfg.tip)),
			scope = {
				view: view,
				tip: tip,
				task: task,
				config: view.cellPreviewConfig
			};

		tip.on('close', tip.disable, tip);

		view.on('render', this.onRender, this, scope);

		view.on({
			scope: scope,
			itemmouseleave: cfg.tip && cfg.tip.closable === true ? Ext.emptyFn : this.onItemMouseLeave,
			beforedestroy: this.onBeforeDestroy
		});
	},

	/**
	 * @private
	 */
	onRender: function (view, args) {
		view.getEl().on('mousemove', this.onMouseMove, this, args);
	},

	/**
	 * @private
	 */
	onBeforeDestroy: function () {
		var tip = this.tip,
			task = this.task;

		task.cancel();
		tip.destroy();
	},

	/**
	 * @private
	 */
	onItemMouseLeave: function () {
		var tip = this.tip,
			task = this.task;

		task.cancel();
		tip.disable();
		tip.hide();
	},

	/**
	 * @private
	 */
	onMouseMove: function (e, t, args) {
		args.task.delay(this.timeout, this.onTaskExecute, this, [e.getTarget(), args]);
	},

	/**
	 * @private
	 */
	onTaskExecute: function (target, args) {
		var g,
			record,
			value,
			action,
			id,
			task = args.task,
			tip = args.tip,
			config = args.config,
			store = args.view.getStore();

		g = config.pattern.exec(target.className);
		if (!g || !g.length) {
			return;
		}

		id = parseInt(g[2]);
		action = g[1];
		record = Ext.isFunction(config.extractRecord)
			? config.extractRecord.call(config, store, id)
			: store.getById(id);

		if (!record) {
			return;
		}

		value = config.value.call(config, action, record);
		if (value === false) {
			return;
		}

		task.delay(500 || config.timeout, this.showTip, this, [
			{
				tip: tip,
				value: value,
				target: target
			}
		]);
	},

	/**
	 * @private
	 */
	showTip: function (args) {
		var tip = args.tip,
			value = args.value,
			target = args.target;

		tip.update(value);
		tip.setTarget(target);
		tip.enable();
		tip.show();
	}
});