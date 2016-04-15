// Import angular modules
import angular from 'angular';
import 'common/services/user';
import 'common/services/api';
import 'common/services/report';

// Import app modules
import { ChatController } from './ChatController';

// Import resources files
import chatTemplate from './chat.tpl';
import popupTemplate from '../popup.tpl';

export default angular
	.module('imigo.ui.chat', [
		'imigo.api',
		'imigo.user',
		'imigo.report',
		chatTemplate.name,
		'app/logo.tpl.html',
		'app/footer.tpl.html',
		'app/post-footer.tpl.html',
		'app/popup.tpl.html'
	])
	.config(function ($stateProvider) {
		$stateProvider.state('chat', {
			url: '/chat/{partner}?{ad}',
			templateUrl: chatTemplate.name,
			controller: ChatController,
			controllerAs: 'chatCtrl',
			onExit: function($chat, $api, $state) {
				console.debug('exit:', $state.current.name, this);
				$api.setScope();
				$chat.leave();
			}
		});
	});