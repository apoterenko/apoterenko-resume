// Import angular modules
import angular from 'angular';
import 'ng-dialog';

import 'common/services/uploader';
import 'common/services/user';
import 'common/services/api';
import 'common/controls/language';
import 'common/services/router';

// Import app modules
import { ProfileController } from './ProfileController';

// Import resources files
import profileTemplate from './profile.tpl';
import popupTemplate from '../popup.tpl';

export default angular
	.module('imigo.ui.profile', [
		'imigo.api',
		'imigo.user',
		'imigo.uploader',
		'imigo.router',
		'imigo.ui.language',
		'ngDialog',
		profileTemplate.name,
		'app/logo.tpl.html',
		'app/footer.tpl.html',
		'app/post-footer.tpl.html',
		'app/popup.tpl.html'
	])
	.config(function ($stateProvider) {
		$stateProvider.state('profile', {
			url: '/profile/{user}?{ad}{from}',
			templateUrl: profileTemplate.name,
			controller: ProfileController,
			controllerAs: 'profileCtrl',
			onExit: function($api, $state) {
				console.debug('exit:', $state.current.name, this);
				$api.setScope();
			}
		});
	}
);