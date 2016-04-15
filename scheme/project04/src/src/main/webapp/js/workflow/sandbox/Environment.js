/**
 * "Provide" section
 */
goog.provide("Workflow.sandbox.Environment");

/**
 * "Require" section
 */
goog.require("goog.debug");
goog.require("Workflow.ShortHand");
goog.require("Workflow.sandbox.Convert");
goog.require("Workflow.sandbox.UniData");
goog.require("Workflow.sandbox.Importer");
goog.require("Workflow.sandbox.Message");

/**
 * Environment implementation
 *
 * @constructor
 */
Workflow.sandbox.Environment = function (config) {
	this.properties = config.properties || {};
	this.sbcConfig = config.sbcConfig;
	this.value = config.value;
	this.convert = Workflow.sandbox.Convert;
	this.importer = new Workflow.sandbox.Importer(config);
	this.Messages = new Workflow.sandbox.Message(config);
	this.uniData = WF.UD.create(config.clientData);
};

goog.mixin(Workflow.sandbox.Environment.prototype, {

	/**
	 * A reference to the Environment logger
	 *
	 * @private {goog.debug.Logger}
	 * @const
	 */
	logger_: goog.debug.Logger.getLogger("Workflow.sandbox.Environment"),

	/**
	 * @public
	 */
	importClass: function (clazz) {
		this.logger_.info("class imported " + clazz);
	},

	/**
	 * @public
	 */
	setContext: function () {
		this.properties['isContext'] = true;
	},

	/**
	 * @public
	 */
	isSetContext: function () {
		var isContext = this.properties['isContext'];
		return SH.DNN(isContext) ? isContext : false;
	},

	/**
	 * @public
	 */
	getData: function () {
		return this.uniData;
	},

	/**
	 * @public
	 */
	getValue: function () {
		return this.value;
	},

	/**
	 * @public
	 */
	printRegistryData: function () {
		// TODO
		alert('Печать элемента: ' + ([].concat(arguments)).join(','));
	},

	/**
	 * @public
	 */
	emptyData: function () {
		return this.uniData = WF.UD.create();
	},

	/**
	 * @public
	 */
	reloadElement: function (name) {
		var params = this.uniData.getAllFields();

		this.sbcConfig.callFnByItemName(
			name,
			function (item) {
				SH.FN(item.reloadElement) && item.reloadElement.call(
					item, params
				)
			}
		);
	},

	/**
	 * @public
	 */
	refillElement: function (name) {
		var me = this;

		this.sbcConfig.callFnByItemName(
			name,
			function (item) {
				SH.FN(item.refillElement) && item.refillElement.call(
					item, me.uniData.getField(name)
				);
			}
		);
	},

	/**
	 * @public
	 */
	addListener: function (a, b, c, d) {
		var id,
			name,
			eventName,
			listener;

		switch (arguments.length) {
			case 3:
				name = a;
				eventName = b;
				listener = c;
				break;
			case 4:
				name = a;
				id = b;
				eventName = c;
				listener = d;
				break;
		}
		// TODO
	},

	/**
	 * @public
	 */
	putData: function (name) {
		var element,
			result = WF.UD.create(),
			UN = WF.UD.UD_NONE;

		element = this.getElement(name);
		if (SH.NDNN(element)) {
			return result;
		}

		result.add(element.getData(), UN);
		this.uniData.add(result, UN);
		return result;
	},

	/**
	 * @public
	 */
	empty: function (name) {
		this.sbcConfig.callFnByItemName(
			name,
			function (item) {
				SH.FN(item.empty) && item.empty.call(item);
			}
		);
	},

	/**
	 * @public
	 */
	putElementState: function (name) {
		console.log('TODO: putElementState - ' + name);
	},

	/**
	 * @public
	 */
	putFullData: function (name) {
		var element = this.getElement(name);

		if (SH.NDNN(element)) {
			return this.uniData;
		}

		if (SH.FN(element.getFullData)) {
			this.uniData.replace(element.getFullData());
		} else {
			this.logger_.warning("Element " + name + " has no method getFullData");
		}
		return this.uniData;
	},

	/**
	 * @public
	 */
	putFormData: function () {
		this.uniData.__mergeData(this.sbcConfig.getFormItemsValues());
	},

	/**
	 * @public
	 */
	$: function (name) {
		return this.importer.get(name);
	},

	/**
	 * @public
	 */
	alert: function (value) {
		this.logger_.info(value);
	},

	/**
	 * @public
	 */
	setVisible: function () {
		this.__callOperation.apply({
			me: this,
			operation: 'setVisible'
		}, arguments);
	},

	/**
	 * @public
	 */
	setEditable: function () {
		this.__callOperation.apply({
			me: this,
			operation: 'setEditable'
		}, arguments);
	},

	/**
	 * @public
	 */
	__callOperation: function (a, b, c) {
		var me = this.me,
			operation = this.operation,
			flag,
			level,
			entity,
			identificator;

		switch (arguments.length) {
			case 2:
				flag = b;
				identificator = a;
				entity = me.getElement(identificator);
				break;
			case 3:
				flag = c;
				level = a;
				identificator = b;
				entity = me.getEntity(level, identificator);
				break;
		}

		if (SH.DNN(entity)) {
			if (SH.FN(entity[operation])) {
				entity[operation](flag);
			} else {
				this.logger_.warning("Entity by id " + identificator + " has no method " + operation);
			}
		}
	},

	/**
	 * @public
	 */
	getEntity: function (level, id) {
		switch (level) {
			case 'form':
				return this.getForm();
			case 'page':
				return this.getPage(id);
			case 'panel':
				return this.getPanel(id);
			case 'element':
				return this.getElement(id);
			case 'action':
				return this.getElement(id);
		}
		this.logger_.warning("Entity is not found by level " + level + " and identificator " + id);
		return null;
	},

	/**
	 * @public
	 */
	getForm: function () {
		var form = this.sbcConfig.getForm();
		if (SH.NDNN(form)) {
			this.logger_.warning("Form is not found");
			return null;
		}
		return form;
	},

	/**
	 * @public
	 */
	getPage: function (identificator) {
		var page = this.sbcConfig.getPage(identificator);
		if (SH.NDNN(page)) {
			this.logger_.warning("Page is not found by identificator " + identificator);
			return null;
		}
		return page;
	},

	/**
	 * @public
	 */
	getPanel: function (identificator) {
		var panel = this.sbcConfig.getPanel(identificator);
		if (SH.NDNN(panel)) {
			this.logger_.warning("Panel is not found by identificator " + identificator);
			return null;
		}
		return panel;
	},

	/**
	 * @public
	 */
	getElement: function (identificator) {
		var element = this.sbcConfig.getElement(identificator);
		if (SH.NDNN(element)) {
			this.logger_.warning("Element/action is not found by identificator " + identificator);
			return null;
		}
		return element;
	}
});