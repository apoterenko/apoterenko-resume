/**
 * @class Workflow.view.form.WElement
 */
Ext.define('Workflow.view.form.WElement', {
	mixinId: 'welement',

	/**
	 * @public
	 */
	refillElement: function (value) {
		this.setValue(value);
	},

	/**
	 * @public
	 */
	empty: function () {
		this.setValue();
	},

	/**
	 * @public
	 */
	setEditable: function (flag) {
		if (this instanceof Ext.form.field.Base) {
			!flag && this.disable() || this.enable();
		}
	},

	/**
	 * @public
	 */
	getData: function () {
		var values = {};
		values[this.getName()] = this.getValue();
		return WF.UD.create(values);
	},

	/**
	 * public
	 */
	getFullData: function () {
		return this.getData();
	}
});