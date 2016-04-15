export class AboutController {

	/*@ngInject*/
	constructor($scope, $language, $rootScope) {
		console.log('controller:', 'aboutCtrl');
		$scope.user_lang = $language.getCurrentLanguage();
	}
}