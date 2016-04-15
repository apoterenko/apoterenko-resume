import angular from 'angular';

import 'common/services/language';

export default angular.module('imigo.ui.language', ['ng', 'imigo.language'])
	.directive("language", ['$language', function ($language) {
		return {
			restrict: "A",
			replace: true,

			template: [
				'<div>',
					"<div ng-click='doSelectLanguage($event)' ui-rel ui-inline-block ui-vc-align data-tip=\"{{'Change language' | translate}}\" class='imigo-profile-lang-button imigo-profile-lang-button-{{currentLanguage}}'>",
						'<div ui-abs ng-style="{display: selectLanguage ? \'block\' : \'none\'}" class="imigo-profile-lang-list">',
							'<div ng-repeat="lang in getAccessibleLanguages()"',
									'ng-click="onSelectLanguage($event, lang)" class="imigo-profile-lang-button imigo-profile-lang-button-{{lang}}">&nbsp;</div>',
							'</div>',
						'</div>',
					'</div>'
			].join(''),

			link: function ($scope, element, attrs) {
				if ('readonly' in attrs) {
					return;
				}

				let bindFn = function () {
					console.debug('[$language][bindFn]');
					delete $scope.selectLanguage;
				};

				$(document).on('click', bindFn);

				$scope.$on('$destroy', function() {
					$(document).unbind('click', bindFn);
				});

				$scope.doSelectLanguage = function ($event) {
					$event.stopPropagation();

					if ($scope.selectLanguage) {
						delete $scope.selectLanguage;
					} else {
						$scope.selectLanguage = 1;
					}
				};

				$scope.onSelectLanguage = function($event, lang) {
					$event.stopPropagation();

					delete $scope.selectLanguage;
					$scope.currentLanguage = lang;

					if (attrs.ngModel) {
						$scope.$eval(attrs.ngModel + "='" + lang + "'");
					}

					$scope.onAfterChangeLanguage && $scope.onAfterChangeLanguage(lang);
				};

				$scope.getAccessibleLanguages = function () {
					let values = $language.getAccessibleLanguages();
					if ($scope.allowEmptyLanguage) {
						values = values.concat(['']);
					}
					return values.filter(function (lang) {return $scope.currentLanguage !== lang;});
				};
			}
		};
	}]);