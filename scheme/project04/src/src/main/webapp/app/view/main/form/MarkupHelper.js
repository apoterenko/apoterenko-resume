/**
 * Workflow.view.form.MarkupHelper
 */
Ext.define('Workflow.view.form.MarkupHelper', {
	singleton: true,

	/**
	 * @public
	 */
	makeMarkupElement: function (markup) {
		return Ext.DomHelper.append(Ext.getBody(), {
			tag: 'div',
			style: 'margin: -10000px; position: absolute;',
			html: markup
		});
	},

	/**
	 * @public
	 */
	removeMarkupElement: function (el) {
		Ext.getBody().removeChild(el);
	}
});