import angular from 'angular';

import { AboutController } from './AboutController';
import aboutTemplate from './about.tpl';

export default angular
	.module('imigo.ui.about', [
		aboutTemplate.name,
		'app/post-footer.tpl.html',
		'app/logo.tpl.html'
	])
	.config(function ($stateProvider) {
		$stateProvider.state('about', {
			url: '/about',
			templateUrl: aboutTemplate.name,
			controller: AboutController,
			controllerAs: 'aboutCtrl'
		});
	});