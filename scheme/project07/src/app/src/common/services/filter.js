import angular from 'angular';

let entityMap = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': '&quot;',
	"'": '&#39;',
	"/": '&#x2F;'
};

function escapeHtml(string) {
	return String(string).replace(/[&<>"'\/]/g, function (s) {
		return entityMap[s];
	});
}

function linkify(inputText) {
	var replacedText, replacePattern1, replacePattern2;

	//URLs starting with http://, https://, or ftp://
	replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
	replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

	//Change email addresses to mailto:: links.
	replacePattern2 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
	replacedText = replacedText.replace(replacePattern2, '<a href="mailto:$1">$1</a>');

	return replacedText;
}

export default angular.module('imigo.filter', ['ng'])
	.filter('html', function () {
		return function (value) {
			return value ? escapeHtml(value).replace(/\n/g, '<br>') : value;
		};
	})
	.filter('link', function () {
		return function (value) {
			return value ? linkify(value) : value;
		};
	})
	.filter('singleLineHtml', function () {
		return function (value) {
			return value ? value.replace(/<br>/g, '') : value;
		};
	})
	.filter('timeInterval', ['$filter', function ($filter) {
		return function (value) {
			value = value - 0;
			if (isNaN(value)) {
				return '';
			}
			let d = value / (60 * 60 * 24);
			if (d >= 1) {
				return Math.round(d);
			}
			return $filter('date')(value * 1000, 'HH:mm:ss');
		};
	}])
	.filter('parseDate', ['$filter', function ($filter) {
		return function (value) {
			if (!value) {
				return '';
			}
			if (angular.isNumber(value)) {
				value = new Date(value);
			}
			return $filter('date')(value, 'MM/dd/yyyy HH:mm');
		};
	}]);