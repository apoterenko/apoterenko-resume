import angular from 'angular';

import 'common/services/video';
import 'common/services/user';

import { LoginController } from './LoginController';
import loginTemplate from './login.tpl';

export default angular
	.module('imigo.ui.login', [
		'imigo.user',
		'imigo.video',
		loginTemplate.name,
		'app/post-footer.tpl.html',
		'app/logo.tpl.html'
	])
	.config(function ($stateProvider) {
		$stateProvider.state('login', {
			url: '/login',
			templateUrl: loginTemplate.name,
			controller: LoginController,
			controllerAs: 'loginCtrl'
		});
	});
