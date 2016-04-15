/**
 * @class Workflow.view.form.Page
 */
Ext.define('Workflow.view.form.Page', {
	extend: 'Ext.container.Container',

	requires: [
		'Workflow.view.form.Panel',
		'Workflow.view.form.ValueSetter',
		'Workflow.view.form.MarkupHelper',
		'Ext.container.Container'
	],

	/**
	 * @inheritdoc
	 */
	initComponent: function () {
		this.title = this.wfPage.getDescription();
		this.callParent(arguments);

		this.initPageItems();
		this.on({
			scope: this,
			render: this.onPageRender,
			componentrender: this.onComponentRender
		});
	},

	/**
	 * @private
	 */
	onComponentRender: function (scope, field) {
		Workflow.view.form.ValueSetter.setValue(field, this.sbcConfig);
	},

	/**
	 * @private
	 */
	initPageItems: function () {
		var WVF = Workflow.view.form,
			me = this,
			sbcConfig = me.sbcConfig,
			wfPage = me.wfPage,
			wfPagePanels = wfPage.getPanels(),
			markupElement = WVF.MarkupHelper.makeMarkupElement(wfPage.getMarkup());

		me.pageItems = {};

		SH.OFE(wfPagePanels, function (wfPanel, id) {
			me.pageItems[id] = sbcConfig.addClientPanel(
				id,
				Ext.create('Workflow.view.form.Panel', {
					wfOwner: me,
					wfPanel: wfPanel,
					sbcConfig: sbcConfig
				})
			);
		});

		WVF.MarkupHelper.removeMarkupElement(markupElement);

		me.on('destroy', function () {
			SH.OFE(me.pageItems, function (pa) {
				pa.destroy();
			});
		});

		me.on('activate', function () {
			SH.OFE(me.pageItems, function (pa) {
				pa.fireEvent('activate', pa);
			});
		});
	},

	/**
	 * @private
	 */
	onPageRender: function () {
		var panels,
			me = this,
			el = me.el,
			page = me.wfPage;

		el.update(page.getMarkup());
		panels = page.getPanelsMap(el.dom);

		SH.OFE(page.getPanels(), function (wfPanel, id) {
			me.pageItems[id].render(panels[wfPanel.getId()]);
		});
	},

	/**
	 * @public
	 */
	requestFocus: function () {
		var owner = this.ownerCt;
		SH.DNN(owner) && SH.FN(owner.setActiveTab) && owner.setActiveTab(this);
	},

	/**
	 * @public
	 */
	setVisible: function (flag) {
		if (SH.DNN(this.tab)) {
			this.tab[flag ? 'show' : 'hide']();
		} else {
			this.callParent(arguments);
		}
	}
});