$(document).ready(function () {
	$(document.body).append('<div id="$ui-simple-tooltip" class="ui-simple-tooltip" style="display: none; position: absolute;"></div>');

	var getTipTarget = function (target) {
		var dataTip = target.attr("data-tip"),
			parent;

		if (dataTip) {
			return target;
		}
		target.parents().each(function (index, parentTarget) {
			parentTarget = $(parentTarget);
			if (parentTarget.attr("data-tip")) {
				parent = parentTarget;
			}
		});
		return parent;
	};

	var DelayedTask = function (callback, delay) {
		this.callback = callback;
		this.delay = delay;
	};

	$.extend(DelayedTask.prototype, {

		setContext: function (context) {
			this.context = context;
			return this;
		},

		hasContext: function () {
			return !!this.context;
		},

		resetContext: function () {
			return this.setContext(null);
		},

		start: function () {
			var me = this;

			this.cancel();

			if (me.context) {
				if (me.context.force) {
					me.callback.call(me);
					return;
				}
			}

			me.taskId = setTimeout(me.callback.bind(me), me.delay)
		},

		cancel: function () {
			this.taskId && clearTimeout(this.taskId);
			return this;
		}
	});

	var tooltip = $(document.getElementById('$ui-simple-tooltip')),
		hideTask = new DelayedTask(function () {
			tooltip.css({display: 'none'});
		}, 1000),
		showTask = new DelayedTask(function () {
			var target = this.context.target,
				dataTip = target.attr("data-tip"),
				dataTipAlign = target.attr("data-tip-align");

			if (!target.length) {
				return;
			}

			tooltip.css({display: 'block'});
			tooltip.html(dataTip);

			var targetWidth = target.width(),
				targetOffset = target.offset();

			targetOffset.top -= tooltip.height();

			if (dataTipAlign && dataTipAlign === 'left') {
				targetOffset.left -= tooltip.width();
			} else if (dataTipAlign && dataTipAlign === 'center') {
				targetOffset.left += targetWidth / 2;
			} else {
				targetOffset.left += targetWidth;
			}

			tooltip.offset(targetOffset);
		}, 500);

	showTask.isContextChanged = function (context) {
		return this.context && this.context.target.get(0) !== context.target.get(0);
	};

	var hideTooltip = function () {
		hideTask.setContext({force: true}).start();
		showTask.resetContext().cancel();
	};

	$(document).mousemove(function ($event) {
		var target = getTipTarget($($event.target));

		if (!target) {
			hideTooltip();
			return;
		}

		if (showTask.hasContext()) {
			if (showTask.isContextChanged({target: target})) {
				hideTooltip();
			} else {
				return;
			}
		}
		showTask.setContext({target: target}).start();
	});

	// Hide hint by clicking (view can change the state)
	$(document).click(hideTooltip);
});