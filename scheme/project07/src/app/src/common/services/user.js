import angular from 'angular';

import { RouteDispatcher } from './router/RouteDispatcher';
import { RouteService } from './router/RouteService';

import 'common/services/api';
import 'common/services/router';
import 'common/services/language';

let enableLogging = function (user) {
	if ($Boot.isProduction() && user.email && user.email.indexOf('tfbnw.net') > -1) {
		IMIGO.$$restoreLog();
	}
};

export default angular
	.module('imigo.user', ['ng', 'ui.router', 'imigo.router'])
	.service('$user', ['$q', '$api', '$language', '$state', '$routeService', function ($q, $api, $language, $state, $routeService) {
		let userDefer,
			getUser;

		getUser = this.getUser = function (refresh) {
			if (!userDefer || refresh) {
				(userDefer = $q.defer()).promise.then(
					function (user) {
						let currentState = $state.current.name;
						console.debug('[$user][getUser]: current user is ', user, ', current state is ', currentState);

						enableLogging(user);

						$language.refresh(user.language);
						$routeService.checkState($state);
					},
					function (reason) {
						console.debug('[$user][getUser]: rejected with reason ', reason);

						$routeService.redirect(reason);
					}
				);
				$api.user.get().then(
					function (response) {
						RouteDispatcher.dispatch(response, userDefer);
					}, function (response) {
						RouteDispatcher.dispatch(response, userDefer);
					}
				);
			}
			return userDefer.promise;
		};

		this.authUser = function () {
			let authDefer = $q.defer();

			authDefer.promise.then(
				function (authInfo) {
					console.debug('[$user][authUser]: auth info ', authInfo);
				},
				function (reason) {
					console.debug('[$user][authUser]: rejected with reason ', reason);
				}
			);
			$api.user.auth().then(
				function (response) {
					RouteDispatcher.dispatch(response, authDefer);
				}, function (response) {
					RouteDispatcher.dispatch(response, authDefer);
				}
			);
			return authDefer.promise;
		};

		this.registerUser = function (params) {
			let registerDefer = $q.defer();

			$api.user.register(params).then(
				function (response) {
					let id;
					if (response && response.data && (id = response.data.data)) {
						console.debug('[$user][registerUser]: register id is ', id);

						registerDefer.resolve(id);
						getUser(true);
					} else {
						console.warn('[$user][registerUser]: empty response ', response);

						registerDefer.reject(response);
					}
				},
				function (response) {
					console.log('registration error: ', response);
					registerDefer.reject(response);
				}
			);
			return registerDefer.promise;
		}
	}])
	.controller('userCtrl', ['$scope', '$language', function ($scope, $language) {
		console.debug('[controller]: ', 'userCtrl');

		$scope.redirect = RouteService.redirect;

		$language.refresh();
	}]);