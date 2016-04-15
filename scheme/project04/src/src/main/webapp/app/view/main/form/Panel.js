/**
 * @class Workflow.view.form.Panel
 */
Ext.define('Workflow.view.form.Panel', {
	extend: 'Ext.container.Container',

	requires: [
		'Workflow.view.form.ElementFactory',
		'Workflow.view.form.ButtonFactory',
		'Workflow.view.form.MarkupHelper',
		'Workflow.view.form.Action',
		'Ext.container.Container'
	],

	/**
	 * @inheritdoc
	 */
	initComponent: function () {
		this.callParent(arguments);

		this.panelItems = this.getPanelItems();
		this.on('render', this.onPanelRender, this);
	},

	/**
	 * @public
	 */
	getPanelItems: function () {
		if (this.panelItems) {
			return this.panelItems;
		}

		var WVF = Workflow.view.form,
			EF = WVF.ElementFactory,
			MH = WVF.MarkupHelper,
			me = this,
			items = {},
			sbcConfig = me.sbcConfig,
			wfPanel = me.wfPanel,
			wfOwner = me.wfOwner,
			actions = wfPanel.getForm().getActions(),
			markupElement = MH.makeMarkupElement(wfPanel.getMarkup()),

			eachFn = function (wfElement, id) {
				items[id] = sbcConfig.addClientItem(id, EF.makeComponent(wfElement, {
					sbcConfig: sbcConfig,
					wfOwner: wfOwner
				}));
			};

		SH.OFE(wfPanel.getElements(), eachFn);
		SH.OFE(wfPanel.getHiddenElements(), eachFn);
		SH.OFE(wfPanel.getActionsMap(markupElement.dom), function (o, id) {
			var action = actions[id];

			/**
			 * Некоторые кнопки есть inline, поэтому их нет в документе
			 */
			SH.DEF(action) && (
				items[id] = sbcConfig.addClientItem(id, Ext.create('Workflow.view.form.Action', WVF.ButtonFactory.getConfig(
					{
						actionOwner: me,
						wfElement: actions[id],
						sbcConfig: sbcConfig
					}
				))));
		});

		WVF.MarkupHelper.removeMarkupElement(markupElement);

		me.on('destroy', function () {
			SH.OFE(items, function (item) {
				item.destroy();
			});
		});

		me.on('activate', function () {
			SH.OFE(items, function (pa) {
				pa.fireEvent('activate', pa);
			});
		});
		return items;
	},

	/**
	 * @private
	 */
	onPanelRender: function () {
		var elements,
			me = this,
			el = me.getEl(),
			dom = el.dom,
			wfPanel = me.wfPanel,
			panelItems = me.panelItems;

		el.update(wfPanel.getMarkup());
		elements = wfPanel.getElementsMap(dom);

		SH.OFE(wfPanel.getElements(), function (o, id) {
			panelItems[id].render(elements[id]);
		});

		SH.OFE(wfPanel.getHiddenElements(), function (o, id) {
			panelItems[id].render(el);
		});

		SH.OFE(wfPanel.getActionsMap(dom), function (element, id) {
			panelItems[id].render(element);
		});
	}
});