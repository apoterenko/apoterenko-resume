/**
 * Workflow.model.MenuTreeModel
 */
Ext.define('Workflow.model.MenuTreeModel', {
	extend: 'Ext.data.TreeModel',

	idProperty: 'branch_id',

	fields: [
		{name: 'branch_id', type: 'int'},
		{name: 'name', type: 'string', useNull: true},
		{name: 'target_chain_id', type: 'string', useNull: true},
		{name: 'parent', type: 'int', useNull: true},
		{name: 'in_unidata', type: 'string', useNull: true},
		{name: 'custom_window_type', type: 'string', useNull: true},
		{name: 'open_in_new_tab', type: 'int', useNull: true},
		{name: 'item_type', type: 'string', useNull: true},
		{name: 'platform', type: 'string', useNull: true},
		{name: 'count', type: 'int', useNull: true},
		{name: 'sort', type: 'int'},
		{name: 'text', convert: function (v, r) {
			var count;
			(count = r.get('count')) && (count = goog.string.parseInt(count));
			return r.get('name') + (count && ([' ', '(', count, ')'].join('')) || '');
		}}
	]
});