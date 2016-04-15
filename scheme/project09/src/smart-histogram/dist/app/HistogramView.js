(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports", "module", "app/HistogramColorResolver"], factory);
	} else if (typeof exports !== "undefined" && typeof module !== "undefined") {
		factory(exports, module, require("app/HistogramColorResolver"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod, global.HistogramColorResolver);
		global.HistogramView = mod.exports;
	}
})(this, function (exports, module, _appHistogramColorResolver) {
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _HistogramColorResolver = _interopRequireDefault(_appHistogramColorResolver);

	var HistogramView = (function () {
		function HistogramView() {
			_classCallCheck(this, HistogramView);

			this.zoom = 1;
		}

		_createClass(HistogramView, [{
			key: "setController",

			/**
    * Set controller
    * @param {HistogramController} controller
    * @returns {HistogramView}
    */
			value: function setController(controller) {
				this.controller = controller;
				return this;
			}

			/**
    * Set model
    * @param {HistogramModel} model
    * @returns {HistogramView}
    */
		}, {
			key: "setModel",
			value: function setModel(model) {
				this.model = model;
				return this;
			}

			/**
    * Set zoom
    * @param {Number} zoom
    * @returns {HistogramView}
    */
		}, {
			key: "setZoom",
			value: function setZoom(zoom) {
				this.zoom = zoom;
				return this;
			}

			/**
    * Build histogram body
    * @returns {String} Histogram body template
    */
		}, {
			key: "buildBody",
			value: function buildBody() {
				var me = this,
				    htmlBlock = [],
				    histogramProperties = this.controller.getHistogramProperties(),
				    isHistogramUnitWidthExpanding = false;

				this.controller.eachScaledHistogramUnit(function (item) {
					htmlBlock.push(s.sprintf(HistogramView.HISTOGRAM_UNIT, item.scaledHistogramUnitWidth * me.zoom, _HistogramColorResolver["default"].resolve(item.scaledHistogramUnitValue)));
					isHistogramUnitWidthExpanding = item.isHistogramUnitWidthExpanding;
				});

				if (!this.controller.getHistogramProperties().isHistogramUnitWidthExpanding) {
					return s.sprintf(HistogramView.HISTOGRAM_BLOCK, histogramProperties.scaledHistogramUnitCapacity, histogramProperties.scaledHistogramUnitCount, htmlBlock.join(""));
				}
				return htmlBlock.join("");
			}

			/**
    * Build histogram view
    * @returns {String} Histogram view template
    */
		}, {
			key: "buildView",
			value: function buildView() {
				var histogramArray = this.model.getHistogramArray();

				return ['Histogram: [', histogramArray.join(', '), ']', '<br>', 'Histogram size:' + histogramArray.length, '<br>', this.buildBody(), '<br><br><br><br>'].join("");
			}
		}], [{
			key: "HISTOGRAM_UNIT",
			value: "<div class='histogram-unit' style='width: %dpx; background-color: %s;'></div>",
			enumerable: true
		}, {
			key: "HISTOGRAM_BLOCK",
			value: "<div class='histogram'><div class='histogram-compressing'>Compressing</div>" + "Scaled histogram unit capacity: %d<br/>" + "Scaled histogram unit count: %d<br/>%s" + "</div>",
			enumerable: true
		}]);

		return HistogramView;
	})();

	module.exports = HistogramView;
});