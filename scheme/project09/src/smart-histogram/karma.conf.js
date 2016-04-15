module.exports = function (config) {
	config.set({

		// The port where the webserver will be listening.
		port: 9999,

		// Base path, that will be used to resolve all relative paths defined in files and exclude. If basePath is a
		// relative path, it will be resolved to the __dirname of the configuration file.
		basePath: '.',

		// Enable or disable colors in the output (reporters and logs).
		colors: true,

		// Continuous Integration mode.
		// If true, it captures browsers, runs tests and exits with 0 exit code (if all tests passed) or 1 exit code (if any test failed).
		singleRun: true,

		// Level of logging.
		// LOG_DISABLE | LOG_ERROR | LOG_WARN | LOG_INFO | LOG_DEBUG.
		logLevel: config.LOG_DEBUG,

		// Karma can be easily extended through plugins. In fact, all the existing preprocessors, reporters, browser
		// launchers and frameworks are also plugins.
		plugins: [
			'karma-systemjs',
			'karma-phantomjs-launcher',
			'karma-jasmine'
		],

		// Karma can be easily extended through plugins. In fact, all the existing preprocessors, reporters, browser
		// launchers and frameworks are also plugins.
		frameworks: [
			'systemjs',
			'jasmine'
		],

		// A list of browsers to launch and capture. Once Karma is shut down, it will shut down these browsers as well.
		// You can capture any browser manually just by opening a url, where Karma's web server is listening.
		// Chrome | ChromeCanary | Firefox | Opera | Safari | PhantomJS.
		browsers: [
			'PhantomJS'
		],

		// List of files/patterns to load in the browser.
		files: [
			'test/*.spec.js',
			'test/**/*.spec.js'
		],

		// SystemJS - universal dynamic module loader - loads ES6 modules, AMD, CommonJS and global scripts in the
		// browser and NodeJS. Works with both Traceur and Babel.
		systemjs: {

			// Path to your SystemJS configuration file.
			// configFile: 'system.config.js',

			// SystemJS configuration specifically for tests, added after your config file.
			// Good for adding test libraries and mock modules.
			config: {
				// Karma-systemjs defaults to using Traceur as transpiler.
				// You can specify another transpiler (eg. babel or typescript).
				transpiler: 'babel',

				// Backwards-compatibility mode for the loader to automatically add '.js' extensions when not present to module requests.
				// This allows code written for SystemJS 0.16 or less to work easily in the latest version
				defaultJSExtensions: true,

				// Karma-systemjs looks up the paths for es6-module-loader, systemjs, and your transpiler (babel,
				// traceur, or typescript) in the paths object of your SystemJS configuration.
				paths: {
					"app/*": "dist/app/*",
					'babel': 'node_modules/babel-core/browser.js',
					'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.js',
					'systemjs': 'node_modules/systemjs/dist/system.js',
					'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js',
					'phantomjs-polyfill': 'node_modules/phantomjs-polyfill/bind-polyfill.js'
				}
			},

			// Patterns for files that you want Karma to make available, but not loaded until a module requests them.
			// eg. Third-party libraries.
			serveFiles: [
				'dist/**/*.js'
			]
		}
	});
};