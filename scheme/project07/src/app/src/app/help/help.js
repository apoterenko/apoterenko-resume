import angular from 'angular';

import { HelpController } from './HelpController';
import helpTemplate from './help.tpl';

export default angular
	.module('imigo.ui.help', [
		helpTemplate.name,
		'app/post-footer.tpl.html',
		'app/logo.tpl.html'
	])
	.config(function ($stateProvider) {
		$stateProvider.state('help', {
			url: '/help',
			templateUrl: helpTemplate.name,
			controller: HelpController,
			controllerAs: 'helpCtrl'
		});
	});