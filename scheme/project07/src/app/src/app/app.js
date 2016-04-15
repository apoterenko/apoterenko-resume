// Import angular modules
import angular from 'angular';
import 'angular-ui-router';
import 'angular-perfect-scrollbar';
import 'angular-ui-select';
import 'angular-ui-slider';
import 'angular-sanitize';
import 'angular-keyfilter';

import 'common/override/log'
import 'common/directives/uiResource';
import 'common/directives/specialKeys';
import 'common/directives/contenteditable';
import 'common/services/uiTooltip';
import 'common/services/filter';
import 'common/services/router';
import 'common/services/eventBus';
import 'app/about/about';
import 'app/bank/bank';
import 'app/bank/history/history';
import 'app/main/main';
import 'app/chat/chat';
import 'app/help/help';
import 'app/login/login';
import 'app/landing/landing';
import 'app/profile/profile';
import 'app/registration/registration';
import 'app/error/errorEmail';
import 'app/search/search';
import 'app/vendor/vendor';
import 'app/logout/logout';

// Import common templates
import logoTemplate from './logo.tpl';
import footerTemplate from './footer.tpl';
import postFooterTemplate from './post-footer.tpl';

let app = angular.module('imigo', [
	'ngSanitize',
	'perfect_scrollbar',
	'ui.select',
	'ui.slider',
	'ui.resource',
	'ui.router',
	'imigo.router',
	'imigo.filter',
	'imigo.ui.about',
	'imigo.ui.bank',
	'imigo.ui.chat',
	'imigo.ui.help',
	'imigo.ui.login',
	'imigo.ui.main',
	'imigo.ui.profile',
	'imigo.ui.registration',
	'imigo.ui.search',
	'imigo.ui.vendor',
	'imigo.ui.logout',
	'imigo.ui.landing',
	'imigo.ui.bank.history',
	'imigo.ui.errorEmail',
	'imigo.special.keys',
	'imigo.content.editable',
	'imigo.event-bus',
	'keyfilter'
]);

app.config(['$compileProvider', '$httpProvider', function ($compileProvider, $httpProvider) {
	$httpProvider.useApplyAsync(true);
	$compileProvider.debugInfoEnabled(!$Boot.isProduction());
}]);

app.filter('ifEmpty', function () {
	return function (input, defaultValue) {
		if (angular.isUndefined(input) || input === null || input === '') {
			return defaultValue;
		}
		return input;
	}
});

app.controller('footerCtrl', ['$scope', '$user', '$chat', '$state', '$eventBus', function ($scope, $user, $chat, $state, $eventBus) {
	let onUserUpdate = function(user) {
		$scope.user = user;
	};
	$user.getUser().then(onUserUpdate);
	$eventBus.subscribe('imigo.user.update', onUserUpdate, $scope);

	$scope.$on('$destroy', function() {
		$eventBus.cancelAll($scope);
	});

	$scope.hasNewMessages = function() {
		return $chat.getDefaultPartner() in $chat.hasNewMessages;
	};
	$scope.getChatPartner = function() {
		var p = $chat.getDefaultPartner();
		if (p in $chat.hasNewMessages) {
			return p;
		}
		if (p === 'system' && $state.is('chat')) {
			p = $chat.query.from || '';
		}
		return p;
	};

	$chat.listen();
}]);

angular.element(document).ready(function () {
	var doesAppInitialized = angular.element(document.body).scope();

	if (angular.isUndefined(doesAppInitialized)) {
		angular.bootstrap(document.body, [app.name], {
			strictDi: true
		});
	}
});

export default app;