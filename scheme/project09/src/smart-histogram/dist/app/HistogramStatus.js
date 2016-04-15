(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports", "module"], factory);
	} else if (typeof exports !== "undefined" && typeof module !== "undefined") {
		factory(exports, module);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod);
		global.HistogramStatus = mod.exports;
	}
})(this, function (exports, module) {
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HistogramStatus = (function () {
		function HistogramStatus() {
			_classCallCheck(this, HistogramStatus);
		}

		_createClass(HistogramStatus, null, [{
			key: "MISS",
			value: 3,
			enumerable: true
		}, {
			key: "OK",
			value: 1,
			enumerable: true
		}, {
			key: "WARN",
			value: 2,
			enumerable: true
		}, {
			key: "ERROR",
			value: 0,
			enumerable: true
		}]);

		return HistogramStatus;
	})();

	module.exports = HistogramStatus;
});