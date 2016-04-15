import angular from 'angular';

import 'common/services/user';
import 'common/services/video';

import { LandingController } from './LandingController';

import landingTemplate from './landing.tpl';
import customerTemplate from './customer.tpl';
import clientTemplate from './client.tpl';
import videoTemplate from '../video.tpl';

export default angular
	.module('imigo.ui.landing', [
		'imigo.user',
		'imigo.video',
		landingTemplate.name,
		customerTemplate.name,
		clientTemplate.name,
		videoTemplate.name,
		'app/post-footer.tpl.html',
		'app/logo.tpl.html'
	])
	.config(function ($stateProvider) {
		$stateProvider.state('landing', {
			url: '/landing/{type}?{lang}',
			templateUrl: landingTemplate.name,
			controller: LandingController,
			controllerAs: 'landingCtrl'
		});
	});
