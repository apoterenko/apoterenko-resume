(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports", "module", "app/HistogramModel", "app/HistogramStatus"], factory);
	} else if (typeof exports !== "undefined" && typeof module !== "undefined") {
		factory(exports, module, require("app/HistogramModel"), require("app/HistogramStatus"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod, global.HistogramModel, global.HistogramStatus);
		global.HistogramController = mod.exports;
	}
})(this, function (exports, module, _appHistogramModel, _appHistogramStatus) {
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _HistogramModel = _interopRequireDefault(_appHistogramModel);

	var _HistogramStatus = _interopRequireDefault(_appHistogramStatus);

	var HistogramController = (function () {
		function HistogramController() {
			_classCallCheck(this, HistogramController);
		}

		_createClass(HistogramController, [{
			key: "setModel",

			/**
    * Set model
    * @param {HistogramModel} histogramModel
    */
			value: function setModel(histogramModel) {
				this.histogramModel = histogramModel;
				this.histogramProperties = null;
			}

			/**
    * Get the calculated properties of the histogram
    * @returns {object}
    */
		}, {
			key: "getHistogramProperties",
			value: function getHistogramProperties() {
				if (this.histogramProperties) {
					return this.histogramProperties;
				}

				var model = this.histogramModel,
				    originalHistogramWidth = model.getHistogramWidth(),
				    originalHistogramUnitCount = model.getHistogramArray().length,
				    scaledHistogramWidth = originalHistogramWidth / model.getHistogramDensity(),
				    isHistogramUnitWidthExpanding = scaledHistogramWidth / originalHistogramUnitCount >= 1,
				    scaledHistogramUnitCount = isHistogramUnitWidthExpanding ? originalHistogramUnitCount : scaledHistogramWidth,
				    scaledHistogramUnitCapacity = Math.max(Math.ceil(originalHistogramUnitCount / scaledHistogramUnitCount), 1),
				    scaledHistogramUnitWidth = isHistogramUnitWidthExpanding ? scaledHistogramWidth * originalHistogramUnitCount / (scaledHistogramUnitCount * scaledHistogramUnitCount) : scaledHistogramWidth * scaledHistogramUnitCapacity / originalHistogramUnitCount;

				scaledHistogramUnitWidth = scaledHistogramUnitWidth * model.getHistogramDensity();

				return this.histogramProperties = {
					originalHistogramWidth: originalHistogramWidth,
					originalHistogramUnitCount: originalHistogramUnitCount,
					scaledHistogramUnitWidth: scaledHistogramUnitWidth,
					scaledHistogramWidth: scaledHistogramWidth,
					scaledHistogramUnitCount: scaledHistogramUnitCount,
					scaledHistogramUnitCapacity: scaledHistogramUnitCapacity,
					isHistogramUnitWidthExpanding: isHistogramUnitWidthExpanding
				};
			}

			/**
    * Get the scaled histogram
    * @returns {Array}
    */
		}, {
			key: "getScaledHistogram",
			value: function getScaledHistogram() {
				var histogramProperties = this.getHistogramProperties(),
				    originalHistogramArray = this.histogramModel.getHistogramArray(),
				    scaledHistogramUnitCapacity = histogramProperties.scaledHistogramUnitCapacity,
				    scaledHistogramArray = [],
				    originalHistogramUnitValue = undefined,
				    scaledHistogramArrayItem = undefined;

				for (var i = 0, k = 0, j = undefined; i < histogramProperties.scaledHistogramUnitCount; i++) {
					for (j = 0; j < scaledHistogramUnitCapacity; j++, k++) {
						originalHistogramUnitValue = originalHistogramArray[k];
						if (typeof originalHistogramUnitValue !== "undefined") {
							scaledHistogramArrayItem = scaledHistogramArray[i] = scaledHistogramArray[i] || [];
							scaledHistogramArrayItem.push(originalHistogramUnitValue);
						} else {
							return scaledHistogramArray;
						}
					}
				}
				return scaledHistogramArray;
			}

			/**
    * Get the scaled histogram unit value
    * @param {Array} histogramUnit
    * @returns {HistogramStatus} Scaled histogram status
    */
		}, {
			key: "eachScaledHistogramUnit",

			/**
    * Each scaled the histogram unit
    * @param {Function} callback
    */
			value: function eachScaledHistogramUnit(callback) {
				var histogramProperties = this.getHistogramProperties(),
				    scaledHistogram = this.getScaledHistogram();

				scaledHistogram.forEach(function (scaledHistogramItem) {
					callback({
						isHistogramUnitWidthExpanding: histogramProperties.isHistogramUnitWidthExpanding,
						scaledHistogramUnitWidth: histogramProperties.scaledHistogramUnitWidth,
						scaledHistogramUnitCount: histogramProperties.scaledHistogramUnitCount,
						scaledHistogramUnitCapacity: histogramProperties.scaledHistogramUnitCapacity,
						scaledHistogramUnitValue: HistogramController.getScaledHistogramUnitValue(scaledHistogramItem)
					});
				});
			}
		}], [{
			key: "getScaledHistogramUnitValue",
			value: function getScaledHistogramUnitValue(histogramUnit) {
				var status = _HistogramStatus["default"].MISS;

				histogramUnit.every(function (histogramUnitValue) {
					if (histogramUnitValue === _HistogramStatus["default"].ERROR) {
						status = _HistogramStatus["default"].ERROR;
						// Error has higher priority than warn status
						return false;
					} else if (histogramUnitValue === _HistogramStatus["default"].WARN) {
						status = _HistogramStatus["default"].WARN;
					} else if (histogramUnitValue === _HistogramStatus["default"].OK && status !== _HistogramStatus["default"].WARN) {
						// Warn has higher priority than ok status
						status = _HistogramStatus["default"].OK;
					}
					return true;
				});
				return status;
			}
		}]);

		return HistogramController;
	})();

	module.exports = HistogramController;
});