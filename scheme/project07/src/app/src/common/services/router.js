import angular from 'angular';

import 'angular-ui-router';

import { RouteService } from './router/RouteService';

let BodyRule = function () {
	console.debug('[$router][body rule]');

	let hash = document.location.hash,
		body = $('body'),
		html = $('html');

	body.removeClass("imigo-login-body");
	body.removeClass("imigo-default-body");
	body.removeClass("imigo-registration-body");
	html.removeClass("imigo-landing-html");

	if (hash.indexOf('landing') === -1) {
		if (hash === '' || hash.indexOf('login') > -1) {
			body.addClass("imigo-login-body");
		} else if (hash.indexOf('registration') > -1) {
			body.addClass("imigo-registration-body");
		} else {
			body.addClass("imigo-default-body");
		}
	} else {
		html.addClass("imigo-landing-html");
	}
};

let GoogleAnalyticsRule = function ($injector, $location) {
	console.debug('[$router][analytics rule]: ' + $location.path());
	$Boot.gaPageView($location.path(), '');
};

export default angular.module('imigo.router', ['ng', 'ui.router'])
	.config(['$urlRouterProvider', function ($urlRouterProvider) {
		console.debug('[$router][config]');

		$urlRouterProvider.rule(function ($injector) {
			console.debug('[$router][access rule]');

			let $routeService = $injector.get('$routeService'),
				$user = $injector.get('$user'),
				$state = $injector.get('$state'),
				$rootScope = $injector.get('$rootScope');

			$rootScope.resetAlertDialogButtons && $rootScope.resetAlertDialogButtons();

			if (!RouteService.isUnprotectedPath()) {
				$user.getUser().then(
					function () {
						console.warn('[$router][access rule]: approve with state', $state);
						$routeService.checkState($state);
					},
					function (reason) {
						console.warn('[$router][access rule]: rejected with reason', reason);
						$routeService.redirect(reason, true);
					}
				);
			}
		});
		$urlRouterProvider.rule(BodyRule);
		$urlRouterProvider.rule(GoogleAnalyticsRule);
	}])
	.provider('$routeService', function () {
		return {
			$get: function ($state) {
				return new RouteService($state);
			}
		}
	});