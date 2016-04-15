import angular from 'angular';
import 'common/services/api';

var newData = function() {
	return {
		ads: [],
		index: 0,
		hasNext: true
	}
};

var now = function() {
	return Math.round((new Date()).getTime() / 1000);
};

export default angular
	.module('imigo.search', ['ng', 'imigo.api'])
	.service('$search', ['$q', '$api', function($q, $api) {
		var seen = {};
		this.see = function(id) {
			seen[id] = 1;
		};
		this.seen = function(id) {
			return !!seen[id];
		};

		this.query = {};

		this.found = {
			premium: newData(),
			standard: newData()
		};
		this.selected = null;

		this.select = function(ad) {
			this.selected = ad;
			this.see(ad._id);
		};

		var self = this;

		var lastFound = function(options) {
			var found = self.found[options].ads;
			return found.length && found[found.length - 1];
		};

		var lastBefore = function(options) {
			var last = lastFound(options);
			return last ? last.published : now();
		};

		var apply = function(options, ads, replace, hasNext) {
			var data = self.found[options];
			if (replace) {
				data.ads = ads;
				data.index = 0;
			} else {
				data.ads = data.ads.concat(ads);
			}
			data.hasNext = typeof hasNext == 'boolean' ? hasNext : true;
		};

		var onFound = function(options, response) {
			console.log('search result:', response, options);
			var found = response.data && response.data.data;
			if (!found) {
				return;
			}

			if (options) {
				apply(options, found[options], false, found.hasNext && found.hasNext[options]);
			} else {
				['premium', 'standard'].forEach(function(o) {
					apply(o, found[o], true, found.hasNext && found.hasNext[o]);
				});
			}
		};

		this.find = function(options, timeout) {
			switch (this.query.category) {
				case 'romance':
				case 'friendship':
				case 'professional':
					break;
				default:
					console.warn('illegal ad.search category:', this.query.category);
					return;
			}

			var q = {
				before: now(),
				options: options
			};

			switch (options) {
				case 'premium':
				case 'standard':
					if (!this.found[options].hasNext) {
						console.log('no more ' + options + ' ads of category: ', this.query.category);
						return;
					}
					q.before = lastBefore(options);
					break;
				default:
					q.options = 'all';
					options = null;
			}

			angular.extend(q, this.query);
			console.log('search query:', q);
			var promise = $api.ad.search(q, timeout);
			var handler = angular.bind(this, onFound, options);
			promise.then(handler, handler);
			return promise;
		};
	}]);
