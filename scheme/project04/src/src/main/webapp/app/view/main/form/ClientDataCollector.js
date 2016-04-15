/**
 * Workflow.view.form.ClientDataCollector
 */
Ext.define('Workflow.view.form.ClientDataCollector', {
	singleton: true,

	/**
	 * @public
	 */
	getValues: function (action) {
		var CDC = Workflow.view.form.ClientDataCollector,
			values = {},
			panels = this.clientPanels,
			items = this.clientItems,
			actionLayout = action.getLayout(),
			actionElementId = actionLayout.id,
			panel = panels[actionElementId],
			element = items[actionElementId],
			applyValue = CDC.applyValue,
			currentItems = [],
			invalidateItems = [];

		switch (actionLayout.level) {
			case 'element':
				CDC.validateItem.call(invalidateItems, element);
				applyValue.call(values, element);
				break;
			case 'panel':
				currentItems = goog.object.getValues(
					CDC.validateItems(panel.panelItems, invalidateItems)
				);
				goog.object.forEach(panel.panelItems, applyValue, values);
				break;
			case 'form':
				currentItems = goog.object.getValues(
					CDC.validateItems(this.clientItems, invalidateItems)
				);
				values = CDC.getAllValues.call(this);
				break;
		}

		goog.array.forEach(currentItems, CDC.markInvalidItem, {
			visible: false
		});

		goog.array.forEach(invalidateItems, CDC.markInvalidItem, {
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
		if (item.isFormField && item.isVisible() && !item.isValid()) {
			this.push(item);
		}
		return item;
	},

	/**
	 * @public
	 */
	validateItems: function (items, invalidateItems) {
		var CDC = Workflow.view.form.ClientDataCollector;
		goog.object.forEach(items, CDC.validateItem, invalidateItems);
		return items;
	},

	/**
	 * @public
	 */
	getAllValues: function () {
		var CDC = Workflow.view.form.ClientDataCollector,
			values = {},
			applyValue = CDC.applyValue;

		goog.object.forEach(this.clientItems, applyValue, values);
		return values;
	},

	/**
	 * @private
	 */
	applyValue: function (item) {
		if (item.isFormField) {
			if (goog.isFunction(item.applyValue)) {
				item.applyValue(this);
			} else {
				this[item.getName()] = item.getValue();
			}
		}
	},

	/**
	 * @private
	 */
	markInvalidItem: function (item) {
		var owner = item.wfOwner;

		if (!goog.isDefAndNotNull(owner)) {
			return;
		}

		if (goog.isDefAndNotNull(owner.tab)) {
			owner.tab[this.visible ? 'addCls' : 'removeCls']('sencha-invalid-tab');
		}
	}
});