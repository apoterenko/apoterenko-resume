import angular from 'angular';

let keyCode = [8, 37, 39, 46];

let contenteditable = angular.module('imigo.content.editable', [])
	.directive("contenteditable", function () {

		return {
			restrict: 'A',
			require: '?ngModel',
			link: function (scope, element, attrs, ngModel) {
				if (!ngModel) {
					return;
				}
				ngModel.$render = function () {
					element.html(ngModel.$viewValue || '');
				};
				element.on('blur keyup change', function () {
					scope.$apply(read);
				});

				let maxLength = parseInt(element.attr("maxlength")),
					minLength = parseInt(element.attr("minlength"));

				element.bind("keydown keypress", function (event) {
					if (event.which === 13) {
						return false;
					}
					if (maxLength || minLength) {
						let viewValue = element.html() || '';
						if (viewValue.length <= minLength) {
							if (event.which === 8 || event.which === 46) {
								return false;
							}
						}
						if (viewValue.length >= maxLength) {
							if ($.inArray(event.which, keyCode) === -1) {
								return false;
							}
						}
					}
				});

				function read() {
					ngModel.$setViewValue(element.html());
				}

				read();
			}
		};
	});

export default contenteditable;