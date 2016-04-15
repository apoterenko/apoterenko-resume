import angular from 'angular';

import 'common/services/api';
import 'common/services/user';
import 'common/services/language';

import { RegistrationController } from './RegistrationController';
import registrationTemplate from './registration.tpl';

export default angular
	.module('imigo.ui.registration', [
		'imigo.api',
		'imigo.user',
		'imigo.language',
		registrationTemplate.name,
		'app/post-footer.tpl.html',
		'app/logo.tpl.html'
	])
	.config(function ($stateProvider) {
		$stateProvider.state('registration', {
			url: '/registration',
			templateUrl: registrationTemplate.name,
			controller: RegistrationController,
			controllerAs: 'registrationCtrl'
		});
	});