/**
 * "Provide" section
 */
goog.provide('Workflow.transport.JsonRpcTransport');
goog.provide('WF.JRT');

/**
 * "Require" section
 */
goog.require('goog.array');
goog.require('goog.json');
goog.require('goog.net.XhrIo');

/**
 * JsonRpc 2.0 transport implementation
 *
 * @constructor
 */
WF.JRT = Workflow.transport.JsonRpcTransport = function (serviceUrl, options) {
	this.__serviceURL = serviceUrl;
	this.__methodList = options.methods;

	var me = this;

	goog.array.forEach(this.__methodList, function (methodName) {
		this[methodName] = (function (instance, methodName) {
			var call = {instance: instance, methodName: methodName};
			return function () {
				var options = arguments[0];

				call.instance.__callMethod(call.methodName,
					options.params,
					options.onSuccess,
					options.onException,
					options.onComplete,
					options.scope || me);
			};
		})(this, methodName);
	}, this);
};

WF.JRT.requestCount = 0;
WF.JRT.pendingRequests = {};
WF.JRT.callbacks = {};

/**
 * A reference to the JsonRpcTransport logger
 *
 * @private {goog.debug.Logger}
 * @const
 */
WF.JRT.prototype.logger_ = goog.debug.Logger.getLogger("Workflow.transport.JsonRpcTransport");

WF.JRT.prototype.__callMethod = function (methodName, params, successHandler, exceptionHandler, completeHandler, scope) {
	WF.JRT.requestCount++;

	try {
		WF.JRT.pendingRequests[String(WF.JRT.requestCount)] = {
			onSuccess: successHandler,
			onException: exceptionHandler,
			onComplete: completeHandler,
			scope: scope
		};

		var request = {
			jsonrpc: '2.0',
			method: methodName,
			id: WF.JRT.requestCount
		};
		if (params) {
			request.params = params;
		}

		var instance = this,
			requestInfo = {id: WF.JRT.requestCount};

		goog.net.XhrIo.send(
			this.__serviceURL,
			function (o) {
				var response = o.target.getResponseJson();
				if (!response.id) {
					response.id = requestInfo.id;
				}
				instance.__doCallback(response);
			},
			'POST',
			goog.json.serialize(request),
			{'Content-Type': 'application/json; charset=UTF-8;', 'Accept': 'application/json'},
			0,
			true);
	} catch (err) {
		this.logger_.severe("Error in the __callMethod: " + err.message, err);

		var isCaught = false;
		if (exceptionHandler)
			isCaught = exceptionHandler(err);
		if (completeHandler)
			completeHandler();

		if (!isCaught)
			throw err;
	}
};

WF.JRT.prototype.__doCallback = function (response) {
	if (typeof response != 'object')
		throw Error('The server did not respond with a response object.');
	if (!response.id)
		throw Error('The server did not respond with the required response id for asynchronous calls.');

	var prById = WF.JRT.pendingRequests[response.id];

	if (!prById)
		throw Error('Fatal error with RPC code: no ID "' + response.id + '" found in pendingRequests.');

	if (WF.JRT.callbacks[response.id])
		delete WF.JRT.callbacks['r' + response.id];

	var uncaughtExceptions = [],
		err;

	if (response.error !== undefined) {
		err = new Error(response.error.message);
		err.code = response.error.code;
		if (prById.onException) {
			try {
				if (!prById.onException(err))
					uncaughtExceptions.push(err);
			} catch (err2) {
				this.logger_.severe("Error in the __doCallback (section 1): " + err2.message, err2);

				uncaughtExceptions.push(err);
				uncaughtExceptions.push(err2);
			}
		}
		else uncaughtExceptions.push(err);
	} else if (response.result !== undefined) {
		if (prById.onSuccess) {
			try {
				prById.onSuccess.call(prById.scope, response.result);
			} catch (err) {
				this.logger_.severe("Error in the __doCallback (section 2): " + err.message, err);

				if (prById.onException) {
					try {
						if (!prById.onException.call(prById.scope, err))
							uncaughtExceptions.push(err);
					} catch (err2) {
						this.logger_.severe("Error in the __doCallback (section 3): " + err2.message, err2);

						uncaughtExceptions.push(err);
						uncaughtExceptions.push(err2);
					}
				} else uncaughtExceptions.push(err);
			}
		}
	}

	try {
		if (prById.onComplete)
			prById.onComplete.call(prById.scope, response);
	} catch (err) {
		this.logger_.severe("Error in the __doCallback (section 4): " + err.message, err);

		if (prById.onException) {
			try {
				if (!prById.onException.call(prById.scope, err))
					uncaughtExceptions.push(err);
			} catch (err2) {
				this.logger_.severe("Error in the __doCallback (section 5): " + err2.message, err2);

				uncaughtExceptions.push(err);
				uncaughtExceptions.push(err2);
			}
		} else uncaughtExceptions.push(err);
	}

	delete WF.JRT.pendingRequests[response.id];

	if (uncaughtExceptions.length) {
		var code;
		var message = 'There ' + (uncaughtExceptions.length == 1 ?
			'was 1 uncaught exception' :
			'were ' + uncaughtExceptions.length + ' uncaught exceptions') + ': ';

		goog.array.forEach(uncaughtExceptions, function (e) {
			message += e.message;
			if (e.code)
				code = e.code;
			message += "; ";
		});

		err = new Error(message);
		err.code = code;
		throw err;
	}
};