/**
 * @class Workflow.view.form.ListBox
 */
Ext.define('Workflow.view.form.ListBox', {
	extend: 'Ext.form.field.ComboBox',

	requires: [
		'Workflow.view.form.WElement',
		'Ext.form.field.ComboBox'
	],

	mixins: [
		'Workflow.view.form.WElement'
	],

	editable: false,
	valueField: 'code',
	displayField: 'description',
	queryMode: 'local',

	/**
	 * @inheritdoc
	 */
	initComponent: function () {
		this.store = Ext.create('Ext.data.Store', {
			fields: ['code', 'description']
		});

		this.callParent(arguments);
	},

	/**
	 * @public
	 */
	setEditable: function () {
		this.callParent(arguments);
		Workflow.view.form.WElement.prototype.setEditable.apply(this, arguments);
	},

	/**
	 * @inheritdoc
	 */
	setValue: function (v, values) {
		if (goog.isDefAndNotNull(values)) {
			var itemValues = values[this.getName() + '__listbox'];
			if (goog.isDefAndNotNull(itemValues)) {
				this.store.loadData(WF.JRR.extractRows(itemValues));
			}
		}

		if (!goog.isDefAndNotNull(v) && this.store.getCount()) {
			v = this.store.getAt(0).get('code');
		}
		this.callParent([v]);
	}
});