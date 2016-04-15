import angular from 'angular';

var getParent = function (attrs) {
	var parentAttr = attrs["dynamicheight"];

	if (parentAttr) {
		return $(document.getElementById(parentAttr));
	}
	return null;
};

let dynamicheight = angular.module('imigo.dynamic.height', [])
	.directive("dynamicheight", function () {
		return {
			restrict: 'A',
			link: function ($scope, element, attrs) {
				let callback = function () {
					try {
						let parent = getParent(attrs);
						if (parent) {
							parent = getParent(attrs);
							let height = parent.height() * 0.5,
								width = height * 2;

							element.height(height);
							element.width(width);

							console.debug('[$dynamicheight] height: ', height,' width: ', width);
						}
					} catch (e) {
						console.debug('[$dynamicheight]', e);
					}
				};
				callback();
				$(window).resize(callback);
			}
		};
	});

export default dynamicheight;