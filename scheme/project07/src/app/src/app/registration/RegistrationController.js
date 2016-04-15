import months from 'app/months.json!';

var monthsByCode = {};
months.forEach(function(m) {
	monthsByCode[m.code] = m;
});

export class RegistrationController {

	/*@ngInject*/
	constructor($scope, $api, $user, $language) {
		console.log('controller:', 'registrationCtrl');

		$api.setScope($scope);

		let form = $scope.form = null,
			user = $scope.user = {},
			month = $scope.month = {};

		$scope.months = months;

		$scope.registration = function() {
			if (!form.valid) {
				return;
			}
			$user.registerUser({
				nickname: form.name,
				gender: form.gender,
				month_of_birth: form.month,
				year_of_birth: form.year,
				// auto-loaded by auth:
				email: user.email,
				country: user.country,
				city: user.city,
				language: user.language || $language.getBrowserLang(),
				version: 0
			}).then(
				function (id) {
					user.id = id;
					window.openWelcome = true;
				}, function () {
				}
			);
		};

		$scope.setGender = function(gender) {
			form.gender = gender;
		};

		$scope.onSelectCondition = function () {
			$Boot.getDoc('terms_en.pdf');
		};

		$scope.onSelectPolitics = function () {
			$Boot.getDoc('privacy.pdf');
		};

		$scope.onAfterChangeLanguage = function (lang) {
			user.language = lang;
			$language.refresh(lang);
		};

		let init = function() {
			form = $scope.form = {};

			$scope.$watchCollection('form', function() {
				form.valid = !!(
					form.name &&
					form.month &&
					form.year &&
					form.gender &&
					form.agreement
				);
				console.log('form:', form);
			});

			$scope.$watchCollection('user', function() {
				user.nickname && (form.name = user.nickname);
				user.gender && (form.gender = user.gender);
				user.month_of_birth && (form.month = user.month_of_birth);
				user.year_of_birth && (form.year = user.year_of_birth);
			});

			$scope.$watchCollection('month', function() {
				month.selected && (form.month = month.selected.code);
			});
		};

		$user.authUser().then(
			function (authInfo) {
				init();
				angular.extend(user, authInfo);
				month.selected = monthsByCode[user.month_of_birth];
			}, function () {
			}
		);
	}
}