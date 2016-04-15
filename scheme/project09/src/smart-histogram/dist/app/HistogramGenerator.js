(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports", "app/HistogramView", "app/HistogramModel", "app/HistogramStatus", "app/HistogramController"], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require("app/HistogramView"), require("app/HistogramModel"), require("app/HistogramStatus"), require("app/HistogramController"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.HistogramView, global.HistogramModel, global.HistogramStatus, global.HistogramController);
		global.HistogramGenerator = mod.exports;
	}
})(this, function (exports, _appHistogramView, _appHistogramModel, _appHistogramStatus, _appHistogramController) {
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _HistogramView = _interopRequireDefault(_appHistogramView);

	var _HistogramModel = _interopRequireDefault(_appHistogramModel);

	var _HistogramStatus = _interopRequireDefault(_appHistogramStatus);

	var _HistogramController = _interopRequireDefault(_appHistogramController);

	var histogramZoom = 50;
	var histogramCount = 100;
	var histogramWidth = 20;
	var histogramDensity = 1;

	var HistogramGenerator = (function () {
		function HistogramGenerator() {
			_classCallCheck(this, HistogramGenerator);
		}

		_createClass(HistogramGenerator, null, [{
			key: "generate",
			value: function generate() {
				for (var i = 0; i < histogramCount; i++) {
					HistogramGenerator.generateHistogram();
				}
			}
		}, {
			key: "generateHistogram",
			value: function generateHistogram() {
				var originalHistogramWidth = histogramWidth,
				    originalHistogramDensity = histogramDensity,
				    originalHistogram = [],
				    originalHistogramUnitCount = undefined,
				    controller = new _HistogramController["default"](),
				    view = new _HistogramView["default"](),
				    model = new _HistogramModel["default"](originalHistogram, originalHistogramWidth, originalHistogramDensity);

				controller.setModel(model);

				view.setController(controller).setModel(model).setZoom(histogramZoom);

				originalHistogramUnitCount = HistogramGenerator.getRandomValue(25);
				if (originalHistogramUnitCount == 0) {
					return;
				}

				for (var i = 0; i < originalHistogramUnitCount; i++) {
					originalHistogram.push(HistogramGenerator.getRandomValue(4));
				}

				$('body').append(view.buildView());
			}
		}, {
			key: "getRandomValue",
			value: function getRandomValue(maxValue) {
				return Math.round(Math.random(maxValue) * (maxValue - 1));
			}
		}]);

		return HistogramGenerator;
	})();

	HistogramGenerator.generate();
});