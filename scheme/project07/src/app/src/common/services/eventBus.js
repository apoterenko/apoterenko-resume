import angular from 'angular';

let eventBus = angular.module('imigo.event-bus', ['ng']);

eventBus.service('$eventBus', ['$rootScope', '$interval', '$timeout', function($rootScope, $interval, $timeout) {
	const rootScopeEvent = '__imi_bus_event';
	var counter = 0;
	var consumers = {};
	var subscriptions = {};

	var cancel = function(id) {
		var topic = subscriptions[id];
		delete subscriptions[id];
		if (!angular.isUndefined(topic)) {
			var t = consumers[topic];
			t && delete t[id];
			for (var c in t) {
				return;
			}
			delete consumers[topic];
		}
	};

	this.subscribe = function(topic, fn, scope) {
		if (!angular.isString(topic) || !angular.isFunction(fn)) {
			console.warn('subscribe failed, topic:', topic, ', fn:', fn);
			return;
		}
		var id = '' + ++counter;
		(consumers[topic] || (consumers[topic] = {}))[id] = fn;
		subscriptions[id] = topic;
		let canceler = {
			cancel: function() {
				cancel(id);
			}
		};
		this.addCanceler(scope, canceler);
		return canceler;
	};

	this.publish = function(topic, payload) {
		$rootScope.$emit(rootScopeEvent, {
			topic: topic,
			payload: payload
		});
	};

	this.addCanceler = function(scope, canceler) {
		if (angular.isObject(scope)) {
			(scope.cancelers || (scope.cancelers = [])).push(canceler);
		}
	};

	this.addTimeoutCanceler = function (scope, promise) {
		if (angular.isObject(scope)) {
			this.addCanceler(scope, {
				cancel: function() {
					promise && $timeout.cancel(promise);
				}
			})
		}
	};

	this.addIntervalCanceler = function (scope, promise) {
		if (angular.isObject(scope)) {
			this.addCanceler(scope, {
				cancel: function() {
					promise && $interval.cancel(promise);
				}
			})
		}
	};

	// This method may be assigned to arbitrary scope as feature.
	this.cancelAll = function(scope) {
		scope = (scope || this);
		if (angular.isArray(scope.cancelers)) {
			scope.cancelers.forEach(function(c) {
				c && angular.isFunction(c.cancel) && c.cancel();
			});
			delete scope.cancelers;
		}
	};

	$rootScope.$on(rootScopeEvent, function(event, e) {
		if (!e || !e.topic) {
			return;
		}
		var targets = consumers[e.topic];
		angular.isObject(targets) && angular.forEach(targets, function(target) {
			target(e.payload);
		});
	});

	$(document).on('visibilitychange', angular.bind(this, function() {
		let state = document.visibilityState;
		console.log('Visibility state changed:', state);
		this.publish('document.visibility.change', state);
	}));
}]);

export default eventBus;
