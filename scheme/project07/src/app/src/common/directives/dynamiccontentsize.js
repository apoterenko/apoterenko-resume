import angular from 'angular';

let dynamiccontentsize = angular.module('imigo.dynamic.content.size', [])
	.directive("dynamiccontentsize", function ($rootScope) {

		let onResize = function ($scope, element, attrs) {
			let width = element.width(),
				height = element.height(),
				result = Math.floor(width / 100) * Math.floor(height / 100);

			$scope.pageSize[attrs.dynamiccontentsize] = result || 20;

			console.debug('[$dynamiccontentsize] result for ' + attrs.dynamiccontentsize + ' is ', result);
		};

		return {
			restrict: 'A',
			link: function ($scope, element, attrs) {
				let callback = function () {
					onResize($scope, element, attrs);
				};

				$rootScope.$on('forceresize', callback);

				$(window).resize(callback);
			}
		};
	});

export default dynamiccontentsize;