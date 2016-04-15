/**
 * Workflow.view.form.ButtonFactory
 */
Ext.define('Workflow.view.form.ButtonFactory', {
	singleton: true,

	requires: [
		'Workflow.view.form.ClientDataCollector',
		'Ext.menu.Item'
	],

	/**
	 * @public
	 */
	getConfig: function (self, button, wfConfig, element) {
		var menu,
			icon = button.getIcon(),
			config = {
				tooltip: button.getDescription() || button.getTitle(),
				name: button.getName(),
				text: button.getTitle()
			};

		if (goog.isDefAndNotNull(icon)) {
			config.icon = icon;
		}

		if (!button.isDropDownMain()) {
			config.scope = {
				scope: this,
				me: self,
				action: button,
				wfConfig: wfConfig
			};
			config.handler = this.onElementAction;
		}
		if (goog.isDefAndNotNull(element)) {
			config.renderTo = element;
		}
		if (goog.isDefAndNotNull(menu = this.buildMenu(self, button, wfConfig)) && menu.length) {
			config.menu = menu;
		}
		return config;
	},

	/**
	 * @private
	 */
	buildMenu: function (self, button, wfConfig) {
		return goog.array.map(
			WF.JRAC.getMenuActionsByAction(wfConfig.formObject, button),
			function (action) {
				return self.clientItems[action.getId()] =
					Ext.create('Ext.menu.Item', Workflow.view.form.ButtonFactory.getConfig(
						self, action, wfConfig
					))
			}
		);
	},

	/**
	 * @private
	 */
	onElementAction: function () {
		var scope = this.scope,
			action = this.action,
			callbacks = action.callbacks;

		if (!callbacks || !goog.object.getAnyKey(callbacks)) {
			scope.doElementAction.call(this);
			return;
		}

		goog.object.forEach(callbacks, function (callback, callbackName) {
			scope.doElementAction.call(this, callbackName);
		}, this);
	},

	/**
	 * @private
	 */
	doElementAction: function (callback) {
		var me = this.me,
			action = this.action,
			wfConfig = this.wfConfig,
			wfRoot = me.wfRoot || me,
			result = Workflow.view.form.ClientDataCollector.getValues.call(me, action),
			invalidateItems = result.invalidateItems;

		if (invalidateItems.length) {
			return;
		}

		me.fireEvent('actiondocument', wfRoot, action, {
			callback: callback,
			wfConfig: wfConfig,
			clientData: result.values
		});
	}
});