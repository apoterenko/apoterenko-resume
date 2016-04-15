import angular from 'angular';

import { ErrorEmailController } from './ErrorEmailController';
import errorTemplate from './error.tpl';

import errorEmailTemplate from './errorEmail.tpl';
import errorIdpPermissionTemplate from './idpPermission.tpl';

export default angular
	.module('imigo.ui.errorEmail', [
		errorTemplate.name,
		errorEmailTemplate.name,
		errorIdpPermissionTemplate.name,
		'app/post-footer.tpl.html',
		'app/logo.tpl.html'
	])
	.config(function ($stateProvider) {
		$stateProvider.state('error', {
			url: '/error/{type}/{idp}',
			templateUrl: errorTemplate.name,
			controller: ErrorEmailController,
			controllerAs: 'errorEmailCtrl'
		});
	});