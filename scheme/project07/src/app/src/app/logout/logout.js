import angular from 'angular';

import 'common/services/user';
import 'common/services/router';

import { LogoutController } from './LogoutController';
import logoutTemplate from './logout.tpl';

export default angular
	.module('imigo.ui.logout', [
		'imigo.user',
		'imigo.router',
		logoutTemplate.name,
		'app/post-footer.tpl.html',
		'app/logo.tpl.html'
	])
	.config(function ($stateProvider) {
		$stateProvider.state('logout', {
			url: '/logout',
			templateUrl: logoutTemplate.name,
			controller: LogoutController,
			controllerAs: 'logoutCtrl'
		});
	});