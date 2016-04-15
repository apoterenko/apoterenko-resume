window.global = window || {};

global.defineCdnUrl = function (path, prefix) {
	IMIGO.CDN_PATH = path;
	IMIGO.CDN_PREFIX = prefix;
};

$.ajaxSetup({cache: true});

global.$Boot = {

	_ga: function (event_type, category, action, params) {
		console.debug('[$Boot][_ga]', category, action, params);
		try {
			params = params || '';
			try {
				params = typeof params === 'object' ? JSON.stringify(params) : params;
			} catch (_e) {
			}
			ga('send', event_type, category, action);
		} catch (e) {
			console.log(e);
		}
	},

	gaEvent: function (category, action, params) {
		this._ga('event', category, action, params);
	},

	gaPageView: function (page, params) {
		this._ga('pageview', page);
	},

	regService: function (name, service) {
		if (this.isProduction()) {
			return;
		}
		this.service = this.service || {};
		this.service[name] = service;
	},

	/**
	 * Is production or not
	 * @returns {boolean}
	 */
	isProduction: function () {
		return IMIGO.RELEASE && !IMIGO.TEST_RELEASE;
	},

	/**
	 * Is develop or not
	 * @returns {boolean}
	 */
	isDevelop: function () {
		return !IMIGO.RELEASE;
	},

	/**
	 * Can change base path
	 * @returns {*|boolean}
	 */
	canChangeBasePath: function () {
		return this.isProduction() && IMIGO.CDN_PATH;
	},

	/**
	 * Get base path
	 * @returns {string}
	 */
	getBasePath: function () {
		return (this.canChangeBasePath() ? IMIGO.CDN_PATH + '/' : '') + IMIGO.APP_PATH;
	},

	/**
	 * Get documentation
	 * @param name
	 */
	getDoc: function (name) {
		window.open([IMIGO.CDN_PATH, 'docs', name].join('/'), '_blank');
	},

	/**
	 * Get lang path
	 * @param lang Lang
	 * @returns {string}
	 */
	getLangPath: function (lang) {
		return [IMIGO.APP_PATH, 'languages/' + lang + '.json?_dc=', IMIGO.APP_VERSION].join('');
	},

	/**
	 * Init main application
	 */
	initAppSync: function (src) {
		// Async -> optimization fix
		setTimeout(function () {
			if ($Boot.isDevelop()) {
				$('<script>', {src: 'jspm_packages/system.js'}).appendTo('body');
				$('<script>', {src: 'jspm_packages/system-polyfills.src.js'}).appendTo('body'); // FireFox + IE supported
				$('<script>', {src: 'system.config.js'}).appendTo('body');
				System.import('app/app');
			} else {
				$('<script>', {src: 'jspm_packages/npm/babel-core@5.8.25/external-helpers.min.js'}).appendTo('body');
				$('<script>', {src: src}).appendTo('body');
			}
		});
	},

	/**
	 * Init google analytics
	 * @param key
	 */
	initAnalytics: function (key) {
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', key, 'auto');
		ga('send', 'pageview');
	},

	/**
	 * Init styles
	 */
	initStyles: function () {
		var baseNode = $('base')[0],
			previousBasePath = baseNode.href;

		// Set CDN base path
		this.canChangeBasePath() && (baseNode.href = IMIGO.CDN_PATH);

		// Before load we changes base path by CDN path
		$('<link>', {
			rel: 'stylesheet',
			type: 'text/css',
			href: [IMIGO.APP_PATH, 'resources/css/imigo-core.css?_dc=', IMIGO.APP_VERSION].join('')
		}).appendTo('body');

		// Restore original base path
		this.canChangeBasePath() && (baseNode.href = previousBasePath || '/');
	},

	/**
	 * Convert to CDN path
	 * @param url
	 * @returns {string}
	 */
	toCdnPath: function (url) {
		return [IMIGO.CDN_PATH, '/', url].join('');
	},

	/**
	 * Convert to CDN path for images
	 * @param url
	 * @param size
	 * @returns {string}
	 */
	toPath: function (url, size) {
		return [IMIGO.CDN_PATH, '/', url, '_', size, '.jpeg', /*url.endsWith('avatar') ? ['?_dc=', Date.now()].join('') : */ ''].join('');
	},

	to675Path: function (url) {
		return this.toPath(url, '675');
	},

	to600Path: function (url) {
		return this.toPath(url, '600');
	},

	to350Path: function (url) {
		return this.toPath(url, '350');
	},

	to115Path: function (url) {
		return this.toPath(url, '115');
	},

	toUserAvatarPath: function (user, size) {
		return this.toPath('img/' + user + '/avatar', size);
	},

	detectBrowser: function () {
		var userAgent = window.navigator.userAgent,
			browsers = [['ie', /trident/i], ['chrome', /chrome/i], ['safari', /safari/i], ['firefox', /firefox/i], ['ie', /internet explorer/i]],
			currentBrowser = 'unknown';

		$.each(browsers, function (index, value) {
			if (value[1].test(userAgent)) {
				currentBrowser = value[0];
				return false;
			}
		});
		$('body').addClass('imigo-' + currentBrowser + '-browser');
	}
};