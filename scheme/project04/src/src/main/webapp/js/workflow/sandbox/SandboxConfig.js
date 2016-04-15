/**
 * "Provide" section
 */
goog.provide("Workflow.sandbox.SandboxConfig");
goog.provide("WF.SBC");

/**
 * "Require" section
 */
goog.require("Workflow.ShortHand");

/**
 * SandboxConfig implementation
 *
 * Здесь происходит инициализация SandboxConfig объекта – объекта, который создается один на одну “сессию”. Под сессией
 * понимается объект, который создается при открытии любого пункта из основного меню
 *
 * @constructor
 */
WF.SBC = Workflow.sandbox.SandboxConfig = function (config) {
	var formObject = config.form,
		formValues = config.fields,
		formImports = config.imports,
		session = config.session;

	this.getFormObject = function () {
		return formObject;
	};

	this.getFormValues = function () {
		return formValues;
	};

	this.getFormImports = function () {
		return formImports;
	};

	this.getFormSession = function () {
		return session;
	};
};

goog.mixin(WF.SBC.prototype, {

	/**
	 * @public
	 */
	setAction: function (action) {
		this.getAction = function () {
			return action;
		};
		return this;
	},

	/**
	 * @public
	 */
	setPreviousConfig: function (previousConfig) {
		this.getPreviousConfig = function () {
			return previousConfig;
		};
		return this;
	},

	/**
	 * @public
	 */
	initValuesCollector: function (collector) {
		var me = this;
		this.getFormItemsValues = function () {
			return collector.getAllValues.call(me.getClientItems());
		};
		return this;
	},

	/**
	 * @public
	 */
	initMessageProxy: function (messageProxy) {
		this.getInitMessageProxy = function () {
			return messageProxy;
		};
		return this;
	},

	/**
	 * @public
	 */
	initClientForm: function (form) {
		this.getClientForm = function () {
			return form;
		};
		return form;
	},

	/**
	 * @public
	 */
	initRoot: function (root) {
		this.getRoot = function () {
			return root;
		};
		return this;
	},

	/**
	 * @public
	 */
	initClientItems: function () {
		var items = {};

		this.getClientItems = function () {
			return items;
		};
		return this;
	},

	/**
	 * @public
	 */
	initClientPanels: function () {
		var panels = {};

		this.getClientPanels = function () {
			return panels;
		};
		return this;
	},

	/**
	 * @public
	 */
	initClientPages: function () {
		var pages = {};

		this.getClientPages = function () {
			return pages;
		};
		return this;
	},

	/**
	 * @public
	 */
	addClientPageFromWfPage: function (wfPage, container) {
		return this.addClientPage(wfPage.getId(), container);
	},

	/**
	 * @public
	 */
	getClientPageById: function (id) {
		return this.getClientPages()[id];
	},

	/**
	 * @public
	 */
	getClientPanelById: function (id) {
		return this.getClientPanels()[id];
	},

	/**
	 * @public
	 */
	getClientItemById: function (id) {
		return this.getClientItems()[id];
	},

	/**
	 * @public
	 */
	addClientPage: function (id, container) {
		return this.getClientPages()[id] = container;
	},

	/**
	 * @public
	 */
	addClientPanel: function (id, container) {
		return this.getClientPanels()[id] = container;
	},

	/**
	 * @public
	 */
	addClientItem: function (id, container) {
		return this.getClientItems()[id] = container;
	},

	/**
	 * @public
	 */
	getFormImportsByName: function (name) {
		return this.getFormImports()[name];
	},

	/**
	 * @public
	 */
	getHeaderPages: function () {
		return this.getFormObject().getHeader().getPages();
	},

	/**
	 * @public
	 */
	getMainPages: function () {
		return this.getFormObject().getMain().getPages();
	},

	/**
	 * @public
	 */
	getFooterPages: function () {
		return this.getFormObject().getFooter().getPages();
	},

	/**
	 * @public
	 */
	getFunctionsCode: function () {
		var fo;
		return (fo = this.getFormObject()) && fo.getFunctions();
	},

	/**
	 * @public
	 */
	callFnByItemName: function (name, fn) {
		name = goog.isString(name) ? name : name && name.toString();

		SH.OFE(this.getClientItems(), function (item, key) {
			(name === item.name || name == key) && fn(item);
		});
	},

	/**
	 * @public
	 */
	filterClientItemsByName: function (name) {
		return SH.OF(
			this.getClientItems(),
			function (item) {
				return name === item.name;
			}
		);
	},

	/**
	 * @public
	 */
	getMenuActionsByAction: function (action) {
		return WF.JRAC.getMenuActionsByAction(this.getFormObject(), action);
	},

	/**
	 * @public
	 */
	applySessionKey: function (values) {
		SH.DNN(this.getFormSession()) && (values.__sessionKey = this.getFormSession());
	},

	/**
	 * @public
	 */
	getActiveButton: function (wfElement) {
		var buttons = [],
			id = wfElement.getId();

		SH.OFE(this.getClientItems(), function (o) {
			SH.FN(o.wfElement.getLayout) && o.wfElement.getLayout().id === id && (buttons.push(o));
		});

		if (buttons.length) {
			/**
			 * Активная кнопка – та, которая ближе всего к полю ввода, т.е. та, значение sort которой меньше (sort
			 * приходит с сервера)
			 */
			goog.array.sort(buttons, WF.JRAC.ACTION_COMPARATOR);
			return buttons[0];
		}
		return null;
	},

	/**
	 * @public
	 */
	getFormActions: function () {
		return WF.JRAC.getFormActions(this.getFormObject());
	},

	/**
	 * @public
	 */
	getElement: function (identificator) {
		switch (arguments.length) {
			case 0:
				throw Error("NotImplementedException, identificator " + identificator);
			case 1:
				return SH.NB(identificator)
					? this.getClientItemById(identificator)
					: SH.GAV(this.filterClientItemsByName(identificator));
		}
	},

	/**
	 * @public
	 */
	getPanel: function (identificator) {
		switch (arguments.length) {
			case 0:
				throw Error("NotImplementedException, identificator " + identificator);
			case 1:
				return this.getClientPanelById(identificator);
		}
	},

	/**
	 * @public
	 */
	getPage: function (identificator) {
		switch (arguments.length) {
			case 0:
				throw Error("NotImplementedException, identificator " + identificator);
			case 1:
				return this.getClientPageById(identificator);
		}
	},

	/**
	 * @public
	 */
	getForm: function () {
		return this.getClientForm();
	}
});

/**
 * @public
 */
WF.SBC.create = function (config) {
	return new WF.SBC(config);
};