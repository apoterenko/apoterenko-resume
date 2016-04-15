import angular from 'angular';
import 'common/services/user';
import 'common/services/api';

import { HistoryController } from './HistoryController';
import { HistoryFactory } from './HistoryFactory';
import historyTemplate from './history.tpl';

export default angular
	.module('imigo.ui.bank.history', [
		'imigo.api',
		'imigo.user',
		historyTemplate.name,
		'app/logo.tpl.html',
		'app/footer.tpl.html',
		'app/post-footer.tpl.html'
	])
	.factory('$historyFactory', ['$user', '$api', function ($user, $api) {
		return new HistoryFactory($user, $api);
	}])
	.config(function ($stateProvider) {
		$stateProvider.state('bank-history', {
			url: '/bank/history',
			templateUrl: historyTemplate.name,
			controller: HistoryController,
			controllerAs: 'historyCtrl'
		});
	});