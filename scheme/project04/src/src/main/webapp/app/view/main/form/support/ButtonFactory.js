/**
 * Workflow.view.form.ButtonFactory
 */
Ext.define('Workflow.view.form.ButtonFactory', {
	singleton: true,

	requires: [
		'Workflow.view.form.ClientDataCollector',
		'Workflow.view.form.ItemAction'
	],

	/**
	 * @public
	 */
	getConfig: function (cfg) {
		var menu,
			config = {};

		if (SH.DNN(menu = this.buildMenu(cfg)) && menu.length) {
			config.menu = menu;
		}
		SH.MX(config, cfg);
		return config;
	},

	/**
	 * @private
	 */
	buildMenu: function (cfg) {
		var BF = Workflow.view.form.ButtonFactory,
			actionOwner = cfg.actionOwner,
			sbcConfig = cfg.sbcConfig,
			wfElement = cfg.wfElement;

		return SH.AM(
			sbcConfig.getMenuActionsByAction(wfElement),
			function (action) {
				return sbcConfig.addClientItem(
					action.getId(),
					Ext.create('Workflow.view.form.ItemAction', BF.getConfig({
						wfElement: action,
						actionOwner: actionOwner,
						sbcConfig: sbcConfig
					}))
				);
			}
		);
	}
});