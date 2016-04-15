(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports", "module", "app/HistogramStatus"], factory);
	} else if (typeof exports !== "undefined" && typeof module !== "undefined") {
		factory(exports, module, require("app/HistogramStatus"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod, global.HistogramStatus);
		global.HistogramModel = mod.exports;
	}
})(this, function (exports, module, _appHistogramStatus) {
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _HistogramStatus = _interopRequireDefault(_appHistogramStatus);

	var HistogramModel = (function () {

		/**
   * @param {Array} histogramArray
   * @param {Number} histogramWidth
   * @param {Number} histogramDensity
   */

		function HistogramModel(histogramArray, histogramWidth, histogramDensity) {
			_classCallCheck(this, HistogramModel);

			this.histogramArray = histogramArray;
			this.histogramWidth = histogramWidth;
			this.histogramDensity = histogramDensity;
			!this.histogramArray.length && this.histogramArray.push(_HistogramStatus["default"].MISS);
		}

		/**
   * Get histogram width
   * @returns {Number}
   */

		_createClass(HistogramModel, [{
			key: "getHistogramWidth",
			value: function getHistogramWidth() {
				return this.histogramWidth;
			}

			/**
    * Get histogram array
    * @returns {Array}
    */
		}, {
			key: "getHistogramArray",
			value: function getHistogramArray() {
				return this.histogramArray;
			}

			/**
    * Get histogram density
    * @returns {Number}
    */
		}, {
			key: "getHistogramDensity",
			value: function getHistogramDensity() {
				return this.histogramDensity;
			}
		}]);

		return HistogramModel;
	})();

	module.exports = HistogramModel;
});