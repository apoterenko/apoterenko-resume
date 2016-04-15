import angular from 'angular';

import 'angular-gettext';

let DEFAULT_LANG = 'en',
	ACCESSIBLE_LANGUAGES = [DEFAULT_LANG, 'ru', 'jp'],
	ACCESSIBLE_LANGUAGES_MAP = {
		'ru': 'ru',
		'ru-RU': 'ru',
		'ja': 'jp',
		'jp': 'jp',
		'en': 'en',
		'en-US': 'en'
	},
	PO_EDIT_MAP = {
		'jp': 'ja',
		'en': 'en',
		'ru': 'ru'
	};

export default angular
	.module('imigo.language', ['ng', 'gettext'])
	.service('$language', ['$rootScope', 'gettextCatalog', function ($rootScope, gettextCatalog) {
		var me = this,
			currentLanguage = DEFAULT_LANG;

		let langMap = {};

		langMap[DEFAULT_LANG] = true;
		let updateBody = function (userLang) {
			let body = $(document.body);
			ACCESSIBLE_LANGUAGES.forEach(function (lang) {
				body.removeClass('imigo-' + lang);
			});
			body.addClass('imigo-' + userLang);
		};

		this.getCurrentLanguage = function () {
			return currentLanguage;
		};

		this.refresh = function (userLang) {
			userLang = userLang || me.getBrowserLang();

			gettextCatalog.setCurrentLanguage(PO_EDIT_MAP[userLang] || userLang);
			updateBody(userLang);
			currentLanguage = userLang;

			$rootScope.currentLanguage = userLang;

			if (!langMap[userLang]) {
				gettextCatalog.loadRemote($Boot.getLangPath(userLang));
				langMap[userLang] = true;

				console.debug('[$language][refresh]: load dictionary for language ', userLang, ', language map is ', langMap);
			}
		};

		this.getBrowserLang = function () {
			let navLngs = navigator.languages,
				currentLng;

			if (navLngs && navLngs.length) {
				navLngs.forEach(function (lng) {
					!currentLng && (currentLng = ACCESSIBLE_LANGUAGES_MAP[lng]);
				});
			} else {
				currentLng = navigator.browserLanguage
					|| navigator.userLanguage
					|| navigator.systemLanguage
					|| navigator.language;
				currentLng = ACCESSIBLE_LANGUAGES_MAP[currentLng];
			}

			console.debug('[$language][getBrowserLang]: browser language detected as ', currentLng || '-');
			return currentLng || DEFAULT_LANG;
		};

		this.getAccessibleLanguages = function () {
			return ACCESSIBLE_LANGUAGES;
		}
	}]);