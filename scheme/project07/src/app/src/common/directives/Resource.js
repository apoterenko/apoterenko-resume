export default function ($compile) {
	let linkTemplate = '<link rel="stylesheet" type="text/css" ng-href="{{path}}">',
		imageTemplate = '<img ng-src="{{path}}" alt="">',

		getTemplate = function (contentType) {
			var template = '';
			switch (contentType) {
				case 'image':
				case 'img':
					template = imageTemplate;
					break;
				case 'link':
					template = linkTemplate;
					break;
			}
			return template;
		};

	return {
		restrict: "E",
		replace: true,
		scope: {},

		template: function (element, attrs) {
			return getTemplate(attrs.type);
		},

		link: function ($scope, element, attrs) {
			$scope.path = $Boot.getBasePath() + attrs.path;

			console.debug('[$resource][element.contents()]', element.contents(), $scope);
			$compile(element.contents())($scope);
		}
	};
}
