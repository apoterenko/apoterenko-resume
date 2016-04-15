import angular from 'angular';
import 'common/services/user';
import 'common/services/api';

import { BankPaymentProcessor } from './BankPaymentProcessor';
import { BankController } from './BankController';
import bankTemplate from './bank.tpl';
import popupTemplate from '../popup.tpl';

export default angular
	.module('imigo.ui.bank', [
		'imigo.api',
		'imigo.user',
		bankTemplate.name,
		'app/logo.tpl.html',
		'app/footer.tpl.html',
		'app/post-footer.tpl.html',
		'app/popup.tpl.html'
	])
	.provider('$bankPaymentProcessor', ['$userProvider', '$apiProvider', function ($userProvider, $apiProvider) {
		return {
			$get: function () {
				return new BankPaymentProcessor($userProvider.$get(), $apiProvider.$get());
			}
		}
	}])
	.config(function ($stateProvider) {
		$stateProvider.state('bank', {
			url: '/bank',
			templateUrl: bankTemplate.name,
			controller: BankController,
			controllerAs: 'bankCtrl',
			onExit: function($api, $state) {
				console.debug('exit:', $state.current.name, this);
				$api.setScope();
			}
		});
	});