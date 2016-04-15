/**
 * Workflow.plugin.ElementResize
 */
Ext.define('Workflow.plugin.ElementResize', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.element.resize',

	requires: [
		'Ext.AbstractPlugin'
	],

	/**
	 * @public
	 */
	init: function (target) {
		var root = target.sbcConfig.getRoot();

		target.on({
			scope: target,
			boxready: this.onResize,
			afteritemexpand: this.onResize
		});

		target.on({
			scope: {
				me: this,
				target: target
			},
			activate: this.onDeferActivate
		});

		root.on({
			scope: {
				me: this,
				target: target
			},
			deferactivate: this.onDeferActivate
		});

		root.on({
			scope: target,
			resize: this.onResize
		});
	},

	/**
	 * @private
	 */
	onDeferActivate: function () {
		Ext.Function.defer(this.me.onResize, 1, this.target);
	},

	/**
	 * @private
	 */
	onResize: function () {
		var tds,
			el = this.getEl(),
			newHeight,
			branchEl,
			erConfig = this.elementResizeConfig;

		if (!el) {
			return;
		}

		el = this.getEl();
		if (!el.getWidth()) {
			return;
		}

		/**
		 * Подстраиваем ширину ext-компонента под родителя, в которого он вложен. Родитель есть тег TD в таблице с
		 * фиксированным layout. Т.к. два компонента могут быть расположены по горизонтали, мы не можем опираться на
		 * ширину TABLE, а берем ширину TD. Т.к. layout фиксированный, именно TD определяет ширину вложенного элемента
		 */
		if (!this.__parentTdElement) {
			tds = [];
			while (el) {
				if (el.getStyle('table-layout') === 'fixed') {
					break;
				}
				el.dom.nodeName.toLowerCase() === 'td' && tds.push(el);
				el = el.parent();
			}
			/**
			 * Компонент может быть вложен в несколько TABLE, но именно TABLE с fixed layout на нужен, а уже у
			 * него берем TD, поэтому вытаскиваем из массива последний обнаруженный TD, родитель которого есть
			 * непосредственно TABLE с fixed layout, а никакой другой TABLE
			 */
			tds.length && (this.__parentTdElement = tds.pop());
		}

		if (!this.__parentTdElement) {
			return;
		}

		if (!goog.isDefAndNotNull(erConfig) && (!erConfig || erConfig.preventYResize !== true)) {
			var h = 0;

			branchEl = this.__parentTdElement.parent('.sencha-wf-branch-cls');
			if (!branchEl) {
				return;
			}

			var tops = {},
				top,
				tdHeight;

			branchEl.select('.wf-row-cls').each(function (tr) {
				if (!tr.select('.wf-row-cls').getCount()) {
					/**
					 * Высота содержимого, которое рендерится вручную можно посчитать по высоте всех TR-элементов.
					 * Причем они могут быть вложены друг в друга, поэтому считаем сумму только тех, которые не
					 * имеют вложенных TR (т.к. их высота равна сумме вложенных TR), т.е. находятся в самом низу
					 * иерархии.
					 */
					top = tr.getTop();
					tdHeight = tr.getHeight();

					if (tdHeight) {
						if (!tops[top]) {
							tops[top] = 1;
							/**
							 * Также мы должны учесть тот факт, как две и более TR могут быть на одном уровне
							 * (расположены параллельно), и не содержать других вложенных TR, кроме полей-компонентов.
							 * Поэтому берем в расчет только один из этих TR
							 */
							h += tdHeight;

							/**
							 * Теперь идем наверх и собираем паддинги и бордеры у элементов TD. Исходя из приходящего с сервера
							 * XML, только у TD могут быть паддинги (НО НЕ бордеры в XML! см. ниже), их мы и берем в расчет.
							 * Вниз по дереву не идем, т.к. текущий TR уже в себе содержит высоту PADDING, если она
							 * проставлена через конфигурацию
							 */
							var parentTd = tr,
								parentTdDom;
							while (parentTd = parentTd.parent('.wf-column-cls')) {
								parentTdDom = parentTd.dom;
								/**
								 * Здесь есть небольшая хитрость. Т.к. нет возможности у tbody проставить padding, мы
								 * ему задаем border, который браузер в рантайме перераспределяет на border’ы
								 * TD-элементов, которые лежат внутри THEAD, TFOOD, TBODY. Прикольно, но мы используем
								 * эту фичу браузера
								 */
								h += parentTd.getPadding('tb') +
								/**
								 * parentTd.getBorderWidth('tb') использовать не можем, т.к. результат его вычисления
								 * для Firefox и других браузеров различен, поэтому вычисляем через разность
								 */
									/* parentTd.getBorderWidth('tb') */ +
									(parentTdDom.offsetHeight - parentTdDom.clientHeight);
							}
						}
					}
				}
			});

			/**
			 * В контейнере могут быть заголовки TabPanel и Toolbar, поэтому их нужно вычитать из общей суммы
			 */
			var calcOtherHeight = function (cls) {
				var t = 0;
				goog.array.forEach(branchEl.query(cls), function (tabBar) {
					t += Ext.fly(tabBar).getHeight();
				});
				return t;
			};

			h += calcOtherHeight('.sencha-wf-tab-bar-cls');
			h += calcOtherHeight('.sencha-wf-toolbar-cls');

			/**
			 * Если есть заголовок у бранча, то учитываем его высоту и высоту нижнего бордюра (если это всплывающий
			 * диалог, например)
			 */
			h += calcOtherHeight('.sencha-wf-branch-header-cls');
			h += branchEl.getBorderWidth('b');

			newHeight = this.getHeight() + branchEl.getHeight() - h;
			if (newHeight > 199) {
				this.setHeight(newHeight);
				this.sbcConfig.getRoot().doLayout();
			}
		}

		this.setWidth(this.__parentTdElement.getWidth());
	}
});