/**
 * @class flickr.model.FlickrModel
 *
 * Main entity's model
 */
Ext.define('flickr.model.FlickrModel', {
	extend: 'Ext.data.Model',

	fields: [
		{name: 'title', type: 'string'},
		{name: 'published', type: 'date', format: 'Y-m-d\\TH:i:s\\Z'},
		{
			name: 'media',

			/**
			 * @protected
			 */
			convert: function (v) {
				return v && v.m || '';
			}
		},
		{
			name: 'tags',

			/**
			 * @protected
			 */
			convert: function (v) {
				return v && v.split(' ') || [];
			}
		}
	]
});