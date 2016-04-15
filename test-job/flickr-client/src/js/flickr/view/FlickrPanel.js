/**
 * @class flickr.view.FlickrPanel
 *
 * Main entity's view
 */
Ext.define('flickr.view.FlickrPanel', {
	extend: 'Ext.grid.Panel',

	title: 'Flickr public feed',

	enableColumnResize: false,

	/**
	 * Init component
	 */
	initComponent: function () {
		this.viewConfig = {
			emptyText: '<div class="flickr-empty">no data</div>'
		};

		this.columns = [
			{
				dataIndex: 'media',
				text: 'photo',
				align: 'center',
				width: 110,

				/**
				 * @protected
				 */
				renderer: function (v) {
					return Ext.String.format('<img class="flickr-photo" src="{0}"></img>', v);
				}
			},
			{
				dataIndex: 'published',
				text: 'published',
				width: 370
			},
			{
				dataIndex: 'title',
				text: 'title',
				flex: 1
			},
			{
				dataIndex: 'tags',
				text: 'tags',
				width: 120,

				/**
				 * @protected
				 */
				renderer: function (v) {
					return Ext.isArray(v) ? v.join('<br>') : '';
				}
			}
		];

		this.renderTo = Ext.getBody();

		this.tbar = Ext.create('Ext.Toolbar', {
			items: Ext.create('Ext.form.field.Text', {
				width: 100,
				emptyText: 'enter tag',

				listeners: {
					scope: this,
					change: this.onChangeTagField
				}
			})
		});

		this.tagsFilter = Ext.create('Ext.util.Filter', {value: 0});

		this.callParent(arguments);
	},

	/**
	 * @private
	 *
	 * @param component Field
	 * @param v Current field's value
	 */
	onChangeTagField: function (component, v) {
		if (v) {
			this.tagsFilter.setFilterFn(function(item) {
				return item.get('tags')
						.join(' ')
						.toLowerCase()
						.indexOf(v.toLowerCase()) > -1;
			});

			this.store.filter(this.tagsFilter);
		} else {
			this.store.clearFilter();
		}
	}
});