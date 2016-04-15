/**
 * "Provide" section
 */
goog.provide('Workflow.jxon.reader.Menu');
goog.provide('WF.JRM');

/**
 * "Require" section
 */
goog.require('goog.array');
goog.require('goog.string');
goog.require('goog.object');

/**
 * Menu preparer implementation
 *
 * @constructor
 */
WF.JRM = Workflow.jxon.reader.Menu = function (xml) {
	this.branches = xml.branches.branch;
};

WF.JRM.prototype = {

	/**
	 * @public
	 */
	readRecords: function () {
		var records = [],
			br = this.branches;

		br && (br = [].concat(br)) && goog.array.forEach(br, function (branch) {
			var o = {};

			goog.isObject(branch) && goog.isDefAndNotNull(branch) && goog.object.forEach(branch, function (v, key) {
				if (!goog.string.startsWith(key, '__') && goog.isDef(v.__value)) {
					o[key] = v.__value;
				}
			}, this);
			records.push(o);
		}, this);

		return records;
	}
};

/**
 * @public
 */
WF.JRM.buildMenu = function (records) {
	var result = [],
		nodes = {},
		parent,
		parentRecord;

	goog.array.forEach(records, function (record) {
		nodes[goog.string.parseInt(record.branch_id)] = record;
		record.leaf = true;

		if (goog.isDefAndNotNull(record.icon)) {
			record.icon = 'resources/img/' + record.icon;
		}
	});

	goog.array.forEach(records, function (record) {
		parent = goog.string.parseInt(record.parent);

		if (parent) {
			parentRecord = nodes[parent];
			if (parentRecord) {
				parentRecord.children = parentRecord.children || [];
				parentRecord.children.push(record);
				parentRecord.expanded = parentRecord.open === '1';
				parentRecord.leaf = false;
			}
		} else {
			result.push(record);
		}
	});

	return {
		children: result,
		expanded: true
	};
};