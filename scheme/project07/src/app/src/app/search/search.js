// Import angular modules
import angular from 'angular';

import 'common/services/api';
import 'common/services/search';
import 'common/controls/language';
import 'common/services/router';
import 'common/services/report';
import 'common/directives/dynamiccontentsize';

// Import app modules
import { SearchController } from './SearchController';

// Import resources files
import searchTemplate from './search.tpl';
import popupTemplate from '../popup.tpl';

export default angular
	.module('imigo.ui.search', [
		'imigo.api',
		'imigo.user',
		'imigo.search',
		'imigo.router',
		'imigo.report',
		'imigo.ui.language',
		'imigo.dynamic.content.size',
		searchTemplate.name,
		'app/logo.tpl.html',
		'app/footer.tpl.html',
		'app/post-footer.tpl.html',
		'app/popup.tpl.html'
	])
	.config(function ($stateProvider) {
		$stateProvider.state('search', {
			url: '/search/{category}?{ad}',
			templateUrl: searchTemplate.name,
			controller: SearchController,
			controllerAs: 'searchCtrl',
			onExit: function($api, $state) {
				console.debug('exit:', $state.current.name);
				$api.setScope();
			}
		});
	}
);