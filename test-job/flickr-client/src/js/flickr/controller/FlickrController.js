/**
 * @class flickr.controller.FlickrController
 *
 * Main flickr's controller
 */
Ext.define('flickr.controller.FlickrController', {
	singleton: true,

	/**
	 * @public
	 *
	 * Flickr app's entry point
	 */
	go: function () {
		/* Prepare jsonp's data (see comments into FlickStore.js) */
		Ext.create('flickr.data.FlickrServiceStore').load();

		/* Create main view */
		Ext.create('flickr.view.FlickrPanel', {
			store: flickr.data.FlickrStoreFactory.makeInstance()
		});
	}
});