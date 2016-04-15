(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'module', 'app/HistogramStatus'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module, require('app/HistogramStatus'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod, global.HistogramStatus);
		global.HistogramColorResolver = mod.exports;
	}
})(this, function (exports, module, _appHistogramStatus) {
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _HistogramStatus = _interopRequireDefault(_appHistogramStatus);

	var HistogramColorResolver = (function () {
		function HistogramColorResolver() {
			_classCallCheck(this, HistogramColorResolver);
		}

		_createClass(HistogramColorResolver, null, [{
			key: 'resolve',

			/**
    * Resolve histogram color by status
    * @returns {String}
    */
			value: function resolve(status) {
				switch (status) {
					case _HistogramStatus['default'].ERROR:
						return '#ce3249';
					case _HistogramStatus['default'].OK:
						return '#9ec133';
					case _HistogramStatus['default'].WARN:
						return '#f38a36';
					case _HistogramStatus['default'].MISS:
						return '#a0a0a0';
				}
			}
		}]);

		return HistogramColorResolver;
	})();

	module.exports = HistogramColorResolver;
});