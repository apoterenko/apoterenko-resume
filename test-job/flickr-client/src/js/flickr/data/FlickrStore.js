/**
 * @class flickr.data.FlickrServiceStore
 *
 * Service's store
 */
Ext.define('flickr.data.FlickrServiceStore', {
	extend: 'Ext.data.Store',

	model: 'flickr.model.FlickrModel',
	proxy: {
		type: 'jsonp',
		url : 'https://api.flickr.com/services/feeds/photos_public.gne?format=json'

		/* callbackName: 'jsonFlickrFeed' !!! don't work <= server callback hardcoded */
	}
});

/**
 * @class flickr.data.FlickrStore
 *
 * Main's store
 */
Ext.define('flickr.data.FlickrStore', {
	extend: 'Ext.data.Store',

	model: 'flickr.model.FlickrModel',
	proxy: {
		type: 'memory',
		reader: {
			type: 'json',
			root: 'items'
		}
	}
});

/**
 * @class flickr.data.FlickrStoreFactory
 *
 * Store's factory
 */
Ext.define('flickr.data.FlickrStoreFactory', {
	singleton: true,

	/**
	 * @public
	 */
	makeInstance: function () {
		var mainStore;

		mainStore = Ext.create('flickr.data.FlickrStore');

		/* Workaround: server is not support callback's name */
		window.jsonFlickrFeed = function (data) {
			mainStore.loadData(data.items);
		};
		return mainStore;
	}
});