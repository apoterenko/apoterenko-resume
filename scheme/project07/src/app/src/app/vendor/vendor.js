import angular from 'angular';

import { VendorController } from './VendorController';
import vendorTemplate from './vendor.tpl';

export default angular
	.module('imigo.ui.vendor', [
		vendorTemplate.name,
		'app/post-footer.tpl.html',
		'app/logo.tpl.html'
	])
	.config(function ($stateProvider) {
		$stateProvider.state('vendor', {
			url: '/vendor',
			templateUrl: vendorTemplate.name,
			controller: VendorController,
			controllerAs: 'vendorCtrl'
		});
	});