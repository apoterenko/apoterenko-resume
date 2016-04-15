/**
 * Workflow.data.StoreFactory
 */
Ext.define('Workflow.data.StoreFactory', {
	singleton: true,

	/**
	 * @public
	 */
	makeInstance: function (config) {
		var store = Ext.create(config.store, {
			reader: {
				wfElement: config.wfElement
			},
			fields: config.fields
		});

		SH.MX(store.getProxy(), config, 'wfElement,sbcConfig');
		return store;
	}
});