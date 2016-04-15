/**
 * @class Workflow.view.form.DateRange
 */
Ext.define('Workflow.view.form.DateRange', {
	extend: 'Ext.container.Container',

	requires: [
		'Workflow.view.form.DateTime',
		'Workflow.view.form.WElement',
		'Ext.form.field.Date',
		'Ext.form.field.Field',
		'Ext.layout.container.HBox',
		'Ext.container.Container'
	],

	mixins: [
		'Workflow.view.form.WElement',
		'Ext.form.field.Field'
	],

	layout: {
		type: 'hbox',
		align: 'stretch'
	},

	/**
	 * @inheritdoc
	 */
	initComponent: function () {
		this.items = [
			{xtype: this.firstField = this.createDateField()},
			{xtype: 'label', html: '&nbsp;-&nbsp;'},
			{xtype: this.secondField = this.createDateField()}
		];

		this.callParent(arguments);
	},

	/**
	 * @public
	 */
	setEditable: function () {
		this.callParent(arguments);

		var fn = Workflow.view.form.WElement.prototype.setEditable;
		fn.apply(this.firstField, arguments);
		fn.apply(this.secondField, arguments);
	},

	/**
	 * @private
	 */
	createDateField: function () {
		return Ext.create('Workflow.view.form.DateTime');
	},

	/**
	 * @public
	 */
	setValue: function (v) {
		if (!goog.isDefAndNotNull(v)) {
			this.firstField.setValue();
			this.secondField.setValue();
			return;
		}

		//TODO
	},

	/**
	 * @public
	 */
	getValue: function () {
		var values = {};
		values[this.name + WF.SDH.FIRST_KEY] = this.toDateHolder(this.firstField);
		values[this.name + WF.SDH.SECOND_KEY] = this.toDateHolder(this.secondField);
		return values;
	},

	/**
	 * @public
	 */
	toDateHolder: function (field) {
		var v = field.getValue();
		return new WF.SDH(v, Ext.Date.format(v, WF.SDH.DATE_PATTERN));
	},

	/**
	 * @public
	 */
	applyValue: function (values) {
		goog.mixin(values, this.getValue());
	},

	/**
	 * @public
	 */
	getFullData: function () {
		return this.getValue();
	}
});