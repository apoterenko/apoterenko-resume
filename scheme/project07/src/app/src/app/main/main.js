import angular from 'angular';

import 'common/services/uploader';
import 'common/services/api';
import 'common/services/user';
import 'common/services/router';
import 'common/controls/language';
import 'common/services/video';

import { MainController } from './MainController';
import mainTemplate from './main.tpl';

function ConfigureModule($stateProvider) {
	$stateProvider.state('main', {
		url: '/main',
		templateUrl: mainTemplate.name,
		controller: MainController,
		controllerAs: 'mainCtrl',
		onExit: function($api, $state) {
			console.debug('exit:', $state.current.name, this);
			$api.setScope();
		}
	});
}

export default angular
	.module('imigo.ui.main', [
		'imigo.api',
		'imigo.user',
		'imigo.uploader',
		'imigo.router',
		'imigo.video',
		'imigo.ui.language',
		mainTemplate.name,
		'app/footer.tpl.html',
		'app/logo.tpl.html',
		'app/post-footer.tpl.html'
	])
	.config(ConfigureModule);