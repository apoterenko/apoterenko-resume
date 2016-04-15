import angular from 'angular';

let KEY_MAP = {
	13: 'enter'
};

let specialKeys = angular.module('imigo.special.keys', [])
	.directive("specialKey", function () {

		return function ($scope, element) {
			element.bind("keydown", function ($event) {
				let target = $($event.target),
					specialKeyMap,
					callback;

				if (!$event.shiftKey && !$event.ctrlKey) {
					specialKeyMap = target.attr("special-key");

					if (specialKeyMap) {
						specialKeyMap = JSON.parse(specialKeyMap);
						callback = specialKeyMap[KEY_MAP[$event.which]];

						if (callback) {
							$scope.$apply(function () {
								$scope.$eval(callback);
							});
							$event.preventDefault();
						}
					}
				}
			});
		};
	});

export default specialKeys;