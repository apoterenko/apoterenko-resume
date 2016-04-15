let logFn = console.log,
	infoFn = console.info,
	warnFn = console.info,
	errorFn = console.error,
	debugFn = console.debug,
	emptyFn = function () {};

if ($Boot.isProduction()) {
	console.log = console.info = console.warn = console.debug = emptyFn;

	// production debugging
	IMIGO.$$restoreLog = function () {
		console.log = logFn;
		console.info = infoFn;
		console.warn = warnFn;
		console.debug = debugFn;
	};
}