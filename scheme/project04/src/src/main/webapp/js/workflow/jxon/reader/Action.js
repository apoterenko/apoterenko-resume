/**
 * "Provide" section
 */
goog.provide('Workflow.jxon.reader.Action');
goog.provide('WF.JRAC');

/**
 * "Require" section
 */
goog.require('goog.string');
goog.require('Workflow.jxon.reader.Base');

/**
 * Action preparer implementation
 *
 * @constructor
 */
WF.JRAC = Workflow.jxon.reader.Action = function (action) {
	WF.JRAC.superClass_.constructor.apply(this, arguments);

	var la = action.layout;

	this.layout = {
		id: goog.string.parseInt(this.getPropertyValue(la, 'id')),
		level: this.getPropertyValue(la, 'level'),
		position: this.getPropertyValue(la, 'position')
	};
};

goog.inherits(WF.JRAC, WF.JRBE);

goog.mixin(WF.JRAC.prototype, {

	/**
	 * @private
	 */
	callbacksList: 'onclick',

	/**
	 * @private
	 */
	stringProperties: 'name,description,title,image,iscontext,window__type,eventdialogclosed,dropdownactionname,dropdownmain',

	/**
	 * @private
	 */
	numericAttributes: 'id,sort',

	/**
	 * @public
	 */
	getSort: function () {
		return this.sort;
	},

	/**
	 * @public
	 */
	getEventDialogClosed: function () {
		return this.eventdialogclosed;
	},

	/**
	 * @public
	 */
	getLayout: function () {
		return this.layout;
	},

	/**
	 * @public
	 */
	isInlinePosition: function () {
		return this.layout.position === 'inline';
	},

	/**
	 * @public
	 */
	isRightPosition: function () {
		return this.layout.position === 'right';
	},

	/**
	 * @public
	 */
	isLeftPosition: function () {
		return this.layout.position === 'left';
	},

	/**
	 * @public
	 */
	isTopPosition: function () {
		return this.layout.position === 'top';
	},

	/**
	 * @public
	 */
	isSpecialPosition: function () {
		return this.layout.position === 'special';
	},

	/**
	 * @public
	 */
	isDropDownMain: function () {
		return this.dropdownmain === 'true';
	},

	/**
	 * @public
	 */
	isBottomPosition: function () {
		return this.layout.position === 'bottom';
	},

	/**
	 * @public
	 */
	isFormLevel: function () {
		return this.layout.level === 'form';
	},

	/**
	 * @public
	 */
	isElementLevel: function () {
		return this.layout.level === 'element';
	},

	/**
	 * @public
	 */
	getDropDownActionName: function () {
		return this.dropdownactionname;
	},

	/**
	 * @public
	 */
	getIcon: function () {
		return goog.isDefAndNotNull(this.image) && ('resources/img/' + this.image) || null;
	},

	/**
	 * @public
	 */
	isContext: function () {
		return this.iscontext === 'context';
	},

	/**
	 * @public
	 */
	isSameWindow: function () {
		return this.window__type === 'SAME_WINDOW';
	},

	/**
	 * @public
	 */
	isNewWindow: function () {
		return this.window__type === 'NEW_WINDOW';
	},

	/**
	 * @public
	 */
	isNewDialog: function () {
		return this.window__type === 'NEW_DIALOG';
	}
});

WF.JRAC.FORM_LEVEL_PREDICATE = function (action) {
	return action.isFormLevel();
};

WF.JRAC.NOT_FORM_LEVEL_PREDICATE = function (action) {
	return !WF.JRAC.FORM_LEVEL_PREDICATE(action);
};

WF.JRAC.BOTTOM_POSITION_PREDICATE = function (action) {
	return action.isBottomPosition();
};

WF.JRAC.TOP_POSITION_PREDICATE = function (action) {
	return action.isTopPosition() || action.isSpecialPosition();
};

WF.JRAC.LEFT_OR_RIGHT_PREDICATE = function (action) {
	return action.isLeftPosition() || action.isRightPosition();
};

WF.JRAC.DROP_DOWN_MAIN_PREDICATE = function (action) {
	return action.isDropDownMain();
};

WF.JRAC.DOWN_ACTION_PREDICATE = function (action) {
	return goog.isDefAndNotNull(action.getDropDownActionName());
};

WF.JRAC.NOT_DOWN_ACTION_PREDICATE = function (action) {
	return !WF.JRAC.DOWN_ACTION_PREDICATE(action) || WF.JRAC.DROP_DOWN_MAIN_PREDICATE(action);
};

WF.JRAC.ACTION_COMPARATOR = function (a, b) {
	return a.getSort() > b.getSort() ? 1 : a.getSort() < b.getSort() ? -1 : 0;
};

WF.JRAC.getMenuActionsByAction = function (form, currentAction) {
	if (!currentAction.isDropDownMain()) {
		return [];
	}
	var dropDownActionName = currentAction.getDropDownActionName(),
		actions = goog.object.filter(
			form.actions,
			function (action) {
				return action.getDropDownActionName() === dropDownActionName && action !== currentAction;
			}
		);
	actions = goog.object.getValues(actions);
	goog.array.sort(actions, WF.JRAC.ACTION_COMPARATOR);
	return actions;
};

WF.JRAC.separateSpecialAndTopActions = function (actions) {
	var left = [],
		right = [];

	goog.array.forEach(actions, function (action) {
		if (action.isSpecialPosition()) {
			right.push(action);
		} else {
			left.push(action);
		}
	});
	return {
		left: left,
		right: right
	};
};

WF.JRAC.getFormActions = function (form) {
	var formActions = goog.object.filter(
			goog.object.filter(form.actions, WF.JRAC.FORM_LEVEL_PREDICATE),
			WF.JRAC.NOT_DOWN_ACTION_PREDICATE
		),
		bottom = goog.object.getValues(
			goog.object.filter(formActions, WF.JRAC.BOTTOM_POSITION_PREDICATE)
		),
		top = goog.object.getValues(
			goog.object.filter(formActions, WF.JRAC.TOP_POSITION_PREDICATE)
		);

	goog.array.sort(bottom, WF.JRAC.ACTION_COMPARATOR);
	goog.array.sort(top, WF.JRAC.ACTION_COMPARATOR);

	return {
		bottom: bottom,
		top: top
	};
};