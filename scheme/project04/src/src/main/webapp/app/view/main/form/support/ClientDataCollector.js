/**
 * Workflow.view.form.ClientDataCollector
 */
Ext.define('Workflow.view.form.ClientDataCollector', {
	singleton: true,

	/**
	 * @public
	 */
	getValues: function (action, sbcConfig) {
		var CDC = Workflow.view.form.ClientDataCollector,
			actionElementId = action.getLayout().id,
			clientPanel = sbcConfig.getClientPanelById(actionElementId),
			clientItem = sbcConfig.getClientItemById(actionElementId),
			applyValue = CDC.applyValue,
			values = {},
			currentItems = [],
			invalidateItems = [];

		switch (action.getLayout().level) {
			case 'element':
				CDC.validateItem.call(invalidateItems, clientItem);
				applyValue.call(values, clientItem);
				break;
			case 'panel':
				currentItems = SH.GOV(
					CDC.validateItems(clientPanel.getPanelItems(), invalidateItems)
				);
				SH.OFE(clientPanel.getPanelItems(), applyValue, values);
				break;
			case 'form':
				currentItems = SH.GOV(
					CDC.validateItems(sbcConfig.getClientItems(), invalidateItems)
				);
				values = CDC.getAllValues.call(sbcConfig.getClientItems());
				break;
		}

		SH.AFE(currentItems, CDC.markInvalidItem, {
			visible: false
		});

		SH.AFE(invalidateItems, CDC.markInvalidItem, {
			visible: true
		});

		return {
			values: values,
			invalidateItems: invalidateItems
		};
	},

	/**
	 * @public
	 */
	validateItem: function (item) {
		item.isFormField && item.isVisible() && !item.isValid() && this.push(item);
		return item;
	},

	/**
	 * @public
	 */
	validateItems: function (items, invalidateItems) {
		var CDC = Workflow.view.form.ClientDataCollector;
		SH.OFE(items, CDC.validateItem, invalidateItems);
		return items;
	},

	/**
	 * @public
	 */
	getAllValues: function () {
		var CDC = Workflow.view.form.ClientDataCollector,
			values = {};
		SH.OFE(this, CDC.applyValue, values);
		return values;
	},

	/**
	 * @private
	 */
	applyValue: function (item) {
		item.isFormField && (
			SH.FN(item.applyValue) ? item.applyValue(this) : (this[item.getName()] = item.getValue())
			);
	},

	/**
	 * @private
	 */
	markInvalidItem: function (item) {
		var tab = SH.PATH(item, 'wfOwner.tab');
		SH.DNN(tab) && tab[this.visible ? 'addCls' : 'removeCls']('sencha-invalid-tab');
	}
});