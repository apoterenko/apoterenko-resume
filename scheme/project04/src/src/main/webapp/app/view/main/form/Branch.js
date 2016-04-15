/**
 * @class Workflow.view.form.Branch
 */
Ext.define('Workflow.view.form.Branch', {
	mixinId: 'branch',

	requires: [
		'Workflow.view.form.Page',
		'Workflow.view.form.ClientDataCollector',
		'Workflow.view.form.ButtonFactory',
		'Workflow.view.form.Action',
		'Ext.Msg',
		'Ext.menu.Menu',
		'Ext.toolbar.Toolbar',
		'Ext.layout.container.VBox',
		'Ext.toolbar.Fill',
		'Ext.tab.Panel',
		'Ext.panel.Panel'
	],

	/**
	 * @public
	 */
	getBranch: function (sbcConfig) {
		sbcConfig
			.initValuesCollector(Workflow.view.form.ClientDataCollector)
			.initMessageProxy(Ext.Msg)
			.initClientItems()
			.initClientPanels()
			.initClientPages();

		var formActions,
			me = this,
			headerItems = me.makeHeaderItems(sbcConfig),
			mainItems = me.makeMainItems(sbcConfig),
			footerItems = me.makeFooterItems(sbcConfig),
			existHeader = !!headerItems.length,
			existMain = !!mainItems.length,
			existFooter = !!footerItems.length,
			itemsArray = [],
			outerItemsArray = [];

		existHeader && outerItemsArray.push(headerItems);
		existMain && outerItemsArray.push(mainItems);
		existFooter && outerItemsArray.push(footerItems);

		SH.AFE(outerItemsArray, function (items) {
			itemsArray.push(me.makeConfig(items));
		});

		var branchConfig = {
			title: sbcConfig.getFormObject().getTShort(),

			closable: true,

			layout: {
				type: 'vbox',
				align: 'stretch'
			},

			overflowY: 'auto',
			overflowX: 'hidden',

			cls: 'sencha-wf-branch-cls',
			header: {
				cls: 'sencha-wf-branch-header-cls'
			},

			items: itemsArray,

			listeners: {
				scope: {
					me: me,
					sbcConfig: sbcConfig
				},
				boxready: me.onReadyBranch,
				activate: me.onActivateBranch,
				destroy: me.onDestroyBranch
			}
		};

		formActions = sbcConfig.getFormActions();
		if (formActions.bottom.length) {
			branchConfig.bbar = me.makeToolbar(formActions.bottom, sbcConfig);
		}
		if (formActions.top.length) {
			branchConfig.tbar = me.makeToolbar(formActions.top, sbcConfig);
		}
		return branchConfig;
	},

	/**
	 * @private
	 */
	makeToolbar: function (actions, sbcConfig) {
		var separatedActions = WF.JRAC.separateSpecialAndTopActions(actions),
			items = this.makeToolbarItems(separatedActions.left, sbcConfig)
				.concat(Ext.create('Ext.toolbar.Fill'))
				.concat(this.makeToolbarItems(separatedActions.right, sbcConfig));

		return Ext.create('Ext.toolbar.Toolbar', {items: items, cls: 'sencha-wf-toolbar-cls'});
	},

	/**
	 * @private
	 */
	makeToolbarItems: function (actions, sbcConfig) {
		return SH.AM(actions, function (action) {
			return sbcConfig.addClientItem(action.getId(), Ext.create(
				'Workflow.view.form.Action', Workflow.view.form.ButtonFactory.getConfig({
					actionOwner: this,
					wfElement: action,
					sbcConfig: sbcConfig
				})
			));
		}, this);
	},

	/**
	 * @private
	 */
	makeConfig: function (items) {
		var isTabPanel = !(items.length === 1),
			config = {
				xtype: isTabPanel ? 'tabpanel' : 'container',
				tabBar: {
					cls: 'sencha-wf-tab-bar-cls'
				},
				items: items
			};

		if (isTabPanel) {
			config.itemCls = 'sencha-wf-overflow-cls';
			config.flex = 1;
		} else {
			config.cls = 'sencha-wf-overflow-cls';
		}
		return config;
	},

	/**
	 * @private
	 */
	makeHeaderItems: function (sbcConfig) {
		return this.makeFormItems(sbcConfig.getHeaderPages(), sbcConfig);
	},

	/**
	 * @private
	 */
	makeMainItems: function (sbcConfig) {
		return this.makeFormItems(sbcConfig.getMainPages(), sbcConfig);
	},

	/**
	 * @private
	 */
	makeFooterItems: function (sbcConfig) {
		return this.makeFormItems(sbcConfig.getFooterPages(), sbcConfig);
	},

	/**
	 * @private
	 */
	makeFormItems: function (wfPages, sbcConfig) {
		return Ext.Array.map(wfPages, this.makePage, {
			sbcConfig: sbcConfig
		});
	},

	/**
	 * @private
	 */
	makePage: function (wfPage) {
		return this.sbcConfig.addClientPageFromWfPage(
			this.wfPage = wfPage,
			Ext.create('Workflow.view.form.Page', this)
		);
	},

	/**
	 * @private
	 */
	onReadyBranch: function () {
		var me = this.me,
			sbcConfig = this.sbcConfig;

		me.fireEvent('loadelement', sbcConfig.getFormObject(), {
			sbcConfig: sbcConfig,

			/**
			 * formValues – значения, которые пришли с сервера при загрузке формы. Именно с этими данными запускается
			 * функция onLoad
			 */
			clientData: sbcConfig.getFormValues()
		});
	},

	/**
	 * @private
	 */
	onDestroyBranch: function () {
		this.me.fireEvent('destroysession', this.me, this.sbcConfig);
	},

	/**
	 * @private
	 */
	onActivateBranch: function () {
		this.me.fireEvent('deferactivate', this.me);
	}
});