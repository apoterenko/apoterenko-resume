import angular from 'angular';

import 'common/services/language';
import 'common/directives/dynamicheight';

import alertTemplate from '../../app/video.tpl';

let RU_VIDEO = 'https://www.youtube.com/embed/4ZSbEMNb3tw';

export default angular
	.module('imigo.video', ['ng', 'imigo.dynamic.height', 'app/video.tpl.html'])
	.config(function ($sceDelegateProvider) {
		$sceDelegateProvider.resourceUrlWhitelist([
			'self',
			RU_VIDEO
		]);
	})
	.service('$video', ['$rootScope', function ($rootScope) {
		$Boot.regService('$video', this);

		console.debug('[$video] Initialization...');

		this.activate = function () {
			$rootScope.videoDialog = true;
		};

		$rootScope.onClose = function () {
			delete $rootScope.videoDialog;
		};

		$rootScope.$watch('currentLanguage', function () {

			$rootScope.videoPath = RU_VIDEO;
			$rootScope.videoLinkPath = 'https://www.youtube.com/watch?v=4ZSbEMNb3tw&lang=ru';

			switch ($rootScope.currentLanguage) {
				case 'jp':
					$rootScope.videoPath = RU_VIDEO;
					$rootScope.videoLinkPath = 'https://www.youtube.com/watch?v=4ZSbEMNb3tw&lang=jp';
					break;
				case 'en':
					$rootScope.videoPath = RU_VIDEO;
					$rootScope.videoLinkPath = 'https://www.youtube.com/watch?v=4ZSbEMNb3tw&lang=en';
					break;
			}
		});
	}]);
