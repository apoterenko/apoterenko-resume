import angular from 'angular';
import 'common/services/eventBus';
import 'common/services/alert';

let apiPrefix = '/api/1/'; // TODO injectabje config!

let $scope = null;

let errorHandlerTask;

let errorHandler = function(response, $alert) {
	let code = response.status;
	switch (code) {
		case -1:
		case 401:
		case 404:
			return;
	}
	if ($scope && code >= 400 && code < 500) {
		$alert.activate(response.data);
		return;
	}

	let wrapper = $('.imigo-error-tooltip-wrapper');
	wrapper.removeClass('imigo-hidden');

	$('.imigo-error-tooltip-label').html([response.status, ': ', response.statusText || 'Error']);

	if (errorHandlerTask) {
		clearTimeout(errorHandlerTask);
	}

	errorHandlerTask = setTimeout(function () {
		wrapper.addClass('imigo-hidden');
	}, 5000);
};

let handledPromise = function(promise, onSuccess, onError) {
	promise.then(onSuccess, onError);
	return promise;
};

let decorateHttpMethod = function ($http, $alert, method) {
	let originalHttpFn = $http[method];

	$http[method] = function () {
		return handledPromise(originalHttpFn.apply(this, arguments),
			angular.noop,
			function (response) {
				console.log('ERROR: ', response);
				errorHandler(response, $alert);
			}
		);
	};
};

// source: http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
let hashCode = function (str) {
	var hash = 0, i, chr, len;
	if (str.length === 0) {
		return hash;
	}
	for (i = 0, len = str.length; i < len; i++) {
		chr   = str.charCodeAt(i);
		hash  = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};

export default angular
	.module('imigo.api', ['ng', 'imigo.event-bus', 'imigo.alert'])
	.service('$api', ['$http', '$alert', function($http, $alert) {
		$Boot.regService('$api', this);

		['post', 'put', 'delete', 'get'].forEach(function (method) {
			decorateHttpMethod($http, $alert, method);
		});

		this.getUrlPrefix = function() {
			return apiPrefix;
		};
		this.url = function(path, unique) {
			let url = this.getUrlPrefix() + path;
			if (unique) {
				url += '?_dc=' + Date.now();
			}
			return url;
		};
		let url = angular.bind(this, this.url);

		let timeShift = 0;
		let	updateTimeShift = function(response) {
				let now = Date.now();
				let sts = response.data && response.data.timestamp;
				timeShift = angular.isNumber(sts) ? now - sts : 0;
				console.log('time shift:', timeShift);
				return response;
			};

		this.now = function() {
			return Date.now() - timeShift;
		};
		this.setScope = function(scope) {
			$scope = scope || null;
		};

		this.location = function(prefix) {
			return $http.post(url('location'), {prefix: prefix});
		};
		this.user = {
			auth: function() {
				$Boot.gaEvent('User', 'Trying to authorization');

				let promise = $http.get(url('auth/me', true));
				promise.then(
					function () {
						$Boot.gaEvent('User', 'Successful authorization');
					},
					function () {
						$Boot.gaEvent('User', 'Fail authorization');
					}
				);
				return promise;
			},
			logout: function() {
				$Boot.gaEvent('User', 'Trying to logout');
				return $http.get(url('auth/logout',true));
			},
			register: function(user) {
				$Boot.gaEvent('User', 'Trying to sign up', user);

				let promise = $http.post(url('users/me'), user);
				promise.then(
					function () {
						$Boot.gaEvent('User', 'Successful sign up', user);
					},
					function () {
						$Boot.gaEvent('User', 'Fail sign up', user);
					}
				);
				return promise;
			},
			update: function(user) {
				$Boot.gaEvent('User', 'Trying to update', user);
				return $http.put(url('users/me'), user);
			},
			get: function(id) {
				if (angular.isUndefined(id)) {
					id = 'me';
				}
				return handledPromise(
					$http.get(url('users/' + id, true)),
					updateTimeShift);
			},
			deleteImage: function(id) {
				return $http.delete(url('users/me/images/' + id));
			},

			getSurvey: function() {
				return $http.get(url('/users/me/survey', true));
			},
			passSurvey: function() {
				return $http.post(url('/users/me/survey'));
			},

			// chat scope!
			contacts: function() {
				return $http.get(url('chat/contacts', true));
			},
			addContact: function(id) {
				return $http.put(url('chat/contacts/' + id));
			},
			deleteContact: function(id) {
				return $http.delete(url('chat/contacts/' + id));
			},
			engagements: function(id) {
				return $http.get(url('analytics/engagement/' + id, true));
			},
			addEngagement: function(id, ad) {
				return $http.put(url('analytics/engagement/' + id), {advertisement: ad});
			}
		};
		this.chat = {
			listen: function(query, timeout) {
				return $http.post(url('chat/listen'), query,
					timeout ? {timeout: timeout} : undefined);
			},
			post: function(m) {
				return handledPromise(
					$http.post(url('chat'), m),
					updateTimeShift);
			},
			abuse: function(obj, type, text) {
				let abuse = {
					dtype: 'abuseReport',
					profile: obj.user,
					type: type,
					text: text
				};
				if (obj.ad) {
					abuse.advertisement = obj.ad;
				}
				return this.post(abuse);
			}
		};
		this.ad = {
			post: function(adv) {
				let role = adv.role,
					category = adv.category;

				$Boot.gaEvent('Ad', 'Trying to add for category ' + category, adv);
				$Boot.gaEvent('Ad', 'Trying to add for category ' + category + ' as ' + role, adv);
				return $http.post(url('ad'), adv);
			},
			get: function(id) {
				return $http.get(url('ad/' + id, true));
			},
			del: function(id) {
				$Boot.gaEvent('Ad', 'Trying to remove', id);
				return $http.delete(url('ad/' + id));
			},
			search: function(query, timeout) {
				$Boot.gaEvent('Ad', 'Trying to search', query);
				return $http.post(url('ad/search'), query,
					timeout ? {timeout: timeout} : undefined);
			},
			deleteImage: function(id) {
				$Boot.gaEvent('Ad', 'Trying to remove image', id);
				return $http.delete(url('ad/images/' + id));
			}
		};
		this.deals = {
			offer: function(offer) {
				$Boot.gaEvent('Offer', 'Trying to make the offer as ' + offer.role, offer);
				return handledPromise(
					$http.post(url('deals/offer'), offer),
					updateTimeShift);
			},
			start: function(id) {
				$Boot.gaEvent('Offer', 'Trying to start the deal', id);
				return $http.post(url('deals/' + id + '/start'));
			},
			refuse: function(id) {
				$Boot.gaEvent('Offer', 'Trying to refuse the deal', id);
				return $http.post(url('deals/' + id + '/refuse'));
			},
			cancel: function(id) {
				$Boot.gaEvent('Offer', 'Trying to cancel the deal', id);
				return $http.post(url('deals/' + id + '/cancel'));
			},
			feedback: function(id, feedback) {
				$Boot.gaEvent('Offer', 'Trying to send the feedback', [id, feedback]);
				return $http.put(url('deals/' + id + '/feedback'), feedback);
			}
		};
		this.bank = {
			buyImi: function(amount, type, body) {
				$Boot.gaEvent('Bank', 'Trying to buy IMI by ' + type, amount);
				let params = {amount: amount};
				if (type) {
					params.type = type;
				}
				let promise = $http.post(url('bank/buyimi'), body, {params: params});
				promise.then(
					function () {
						$Boot.gaEvent('Bank', 'IMI purchase redirected successful by ' + type, amount);
					},
					function () {
						$Boot.gaEvent('Bank', 'IMI purchase fail by ' + type, amount);
					}
				);
				return promise;
			},
			buyPremium: function(type) {
				$Boot.gaEvent('Bank', 'Trying to buy premium by ' + type, type);

				let promise = $http.post(url('bank/buysubscription/' + type));
				promise.then(
					function () {
						$Boot.gaEvent('Bank', 'Premium account purchase successful by ' + type, type);
					},
					function () {
						$Boot.gaEvent('Bank', 'Premium account purchase fail by ' + type, type);
					}
				);
				return promise;
			},
			withdraw: function(email, amount, type, destination) {
				$Boot.gaEvent('Bank', 'Trying to withdrawal by ' + type, amount);
				let promise = $http.post(url('bank/withdraw'), {
					email: email,
					amount: amount,
					destinationType: type,
					destination: destination
				});
				promise.then(
					function() {
						$Boot.gaEvent('Bank', 'Withdrawal successful by ' + type, amount);
					},
					function() {
						$Boot.gaEvent('Bank', 'Withdrawal fail by ' + type, amount);
					}
				);
				return promise;
			},
			subscription: function () {
				$Boot.gaEvent('Bank', 'Trying to subscribe');
				return $http.get(url('bank/subscription', true));
			},
			history: function(count, before) {
				let query = {
					count: angular.isNumber(count) ? count : 50
				};
				if (before) {
					query.before = before;
				}
				return $http.get(url('bank/history', true), {params: query});
			}
		};
	}])
	.service('$chat', ['$q', '$api', '$user', '$timeout', '$interval', '$eventBus', function(
			$q, $api, $user, $timeout, $interval, $eventBus) {
		// TODO create centralized definition source for event names!
		const userUpdateEventName = 'imigo.user.update';
		const originalDocumentTitle = document.title;

		this.hasNewMessages = {};
		this.lastMessages = {};
		this.sentMessages = {};
		this.messages = [];
		this.query = {};

		let contacts = this.contacts = {
			system: {
				id: 'system',
				nickname: 'Помощник-Патрисио'
			},
			map: {
				system: 'Помощник-Патрисио'
			},
			index: 0,
			getId: function(id) {
				if (angular.isNumber(id)) {
					let c = this.data[id];
					id = c && c.id;
				}
				return id;
			},
			toUrl: function(id) {
				return $Boot.toUserAvatarPath(this.getId(id), 115);
			},
			toName: function (name) {
				return name && name.split(' ').shift();
			},
			selected: function() {
				return this.data[this.index];
			},
			isSelected: function(id) {
				if (angular.isNumber(id)) {
					return id === this.index;
				} else {
					var c = this.selected();
					return c && c.id === id;
				}
			}
		};

		contacts.data = [contacts.system];

		let selectContact = function(id) {
			for (let i = 0; i < contacts.data.length; i++) {
				if (id === contacts.data[i].id) {
					contacts.index = i;
					return;
				}
			}

			let partner = {id: id};
			contacts.index = contacts.data.push(partner) - 1;
			$api.user.get(partner.id).then(
				function(response) {
					console.log('contact info:', response);
					partner.nickname = response.data.data.nickname;
				});
		};

		let applyContactsArray = function(a) {
			a.forEach(function(c) {
				contacts.data.push(c);
				contacts.map[c.id] = c.nickname;
			});
		};
		let applyContactsMap = function(m) {
			angular.forEach(m, function(nickname, id) {
				contacts.data.push({
					id: id,
					nickname: nickname
				});
			});
			angular.extend(contacts.map, m);
		};
		let onContactsLoad = function(response) {
			console.log('contacts response:', response);

			contacts.data = [contacts.system];

			let data = response.data.data;
			angular.isArray(data) ?
				applyContactsArray(data) :
				applyContactsMap(data);

			console.log('contacts data:', contacts.data);
		};

		let refreshContacts = function () {
			$api.user.contacts().then(onContactsLoad);
		};

		let onNewMessage = function(m) {
			for (let i = 0; i < contacts.data.length; i++) {
				let c = contacts.data[i];
				if (c && c.id === m.from) {
					return;
				}
			}
			console.debug('New message form new contact:', m.from);
			refreshContacts();
		};

		let offers = {};

		$interval(function () {
				for (let id in offers) {
				if (offers[id] &&
					offers[id].active) {
					let timeLeft = 60*5 + Math.round((offers[id].timestamp - $api.now()) / 1000);
					if (timeLeft > 0) {
						offers[id].timeLeft = timeLeft;
					} else {
						delete offers[id].timeLeft;
						offers[id].active = false;
					}
				}
			}
		}, 100);

		let userId;
		let applyUserId = function() {
			$user.getUser().then(
				function (user) {
					userId = user._id;
				}
			);
		};
		applyUserId();

		let defaultPartner = 'system';
		this.getDefaultPartner = function() {
			return defaultPartner;
		};
		this.reviewNewMessages = function() {
			for (let p in this.hasNewMessages) {
				if (p === userId) {
					continue;
				}
				defaultPartner = p;
				document.title = '* ' + originalDocumentTitle;
				return;
			}
			defaultPartner = 'system';
			document.title = originalDocumentTitle;
		};

		let isVisible = document.visibilityState == 'visible';
		console.debug('[$chat]::isVisible[init]:', isVisible); // FIXME

		let readTimeout;
		this.readOnVisible = function() {
			readTimeout = null;
			let from = this.query.from;
			if (from && this.hasNewMessages[from]) {
				delete this.hasNewMessages[from];
				if (this.lastMessages[from]) {
					this.markRead(from, this.lastMessages[from]);
				}
				this.reviewNewMessages();
			}
		};
		this.onVisibilityStateChange = function(state) {
			isVisible = state == 'visible';
			readTimeout && $timeout.cancel(readTimeout);
			console.debug('[$chat]::isVisible:', isVisible); // FIXME
			if (isVisible) {
				readTimeout = $timeout(angular.bind(this, this.readOnVisible), 1000);
			} else {
				readTimeout = null;
			}
		};
		$eventBus.subscribe('document.visibility.change', angular.bind(this, this.onVisibilityStateChange));

		let needRefreshUser, markReadTime, eventMarkReadTime;

		this.dispatch = function(m) {
			// FIXME workaround
			if (m.from == '000000000000000000000000') {
				m.from = 'system';
			}
			if (m.to == '000000000000000000000000') {
				m.to = 'system';
			}

			if (m.dtype == 'event') {
				this.query.newMessagesTimestamp = m.timestamp;
				if (m.from == 'systemEvents') {
					eventMarkReadTime = m.timestamp;
				}
				if (m.event == 'newMessage') {
					console.debug('[$api][dispatch] new message:', m);

					if (m.from != userId) {
						this.hasNewMessages[m.from] = m;
						onNewMessage(m);
					}
					// we must not show 'newMessage' events in chat window
					return;
				}
				if (m.event == 'updateUser') {
					console.log('event update user');
					needRefreshUser = needRefreshUser || !m.read;
					// we must not show 'updateUser' events in chat window
					return;
				}
			} else if (m.dtype == 'deal') {
				switch (m.type) {
					case 'offered':
						m.active = true;
						offers[m.dealId] = m;
						break;
					default:
						if (offers[m.dealId]) {
							offers[m.dealId].active = false;
						}
				}
			}

			this.lastMessages[m.from] = m.timestamp;
			this.lastMessages[m.to] = m.timestamp;

			if (m.dtype == 'message' && m.from == userId && m.hash) {
				let sent = this.sentMessages[m.hash];
				if (sent && angular.isNumber(sent.index)) {
					this.messages[sent.index] = m;
					delete this.sentMessages[m.hash];
					return;
				}
			}

			if (this.query.from === m.from) {
				if (isVisible) {
					if (this.hasNewMessages[m.from] &&
						this.hasNewMessages[m.from].data <= m.timestamp) {
						delete this.hasNewMessages[m.from];
					}
					markReadTime = m.timestamp;
				} else {
					this.hasNewMessages[m.from] = {
						data: m.timestamp
					};
				}
			} else if (this.query.from !== m.to) {
				// prevent appearing of non-selected partner messages
				return;
			}

			this.messages.push(m);
		};

		this.updateQueryTimestamp = function() {
			var id = this.query.from;
			if (id && this.lastMessages[id]) {
				this.query.timestamp = this.lastMessages[id];
			} else {
				delete this.query.timestamp;
			}
		};

		var cancel, enter;
		var isCanceled = function() {
			return cancel === true;
		};
		var onSuccess = angular.bind(this, function(response) {
			console.log('chat response:', response);
			cancel = null;
			var data = response.data.data;
			if (data.length) {
				markReadTime = null;
				eventMarkReadTime = null;
				needRefreshUser = false;
				applyUserId();
				data.forEach(this.dispatch, this);

				// post-dispatch processing:
				this.updateQueryTimestamp();
				this.reviewNewMessages();
				if (needRefreshUser) {
					needRefreshUser = false;
					$user.getUser(true).then(
						function (user) {
							$eventBus.publish(userUpdateEventName, user);
						}
					);
				}
				if (markReadTime !== null) {
					this.markRead(this.query.from, markReadTime);
				}
				if (eventMarkReadTime !== null) {
					this.markRead('systemEvents', eventMarkReadTime);
				}
			}
			if (!isCanceled()) {
				this.listen();
			}
		});
		var onFailure = angular.bind(this, function(response) {
			if (isCanceled()) {
				return;
			}
			cancel = null;
			if (enter) {
				enter = false;
				this.listen();
				return;
			}
			console.error('chat listen failure:', response);
			$timeout(angular.bind(this, this.listen), 5000);
		});

		this.listen = function() {
			if (cancel && !isCanceled()) {
				console.warn('$chat.listen() duplicate call!');
				return;
			}
			console.log('$chat.listen(), query:', angular.copy(this.query));
			cancel = $q.defer();
			$api.chat.listen(this.query, cancel.promise)
				.then(onSuccess, onFailure);
		};

		this.markRead = function(from, timestamp) {
			return $api.chat.post({
				from: from,
				dtype: 'markRead',
				timestamp: timestamp
			});
		};

		this.cancel = function() {
			console.log('$chat.cancel()');
			cancel.resolve();
			cancel = true;
		};

		let messageHash = function(message) {
			return 1234 * hashCode(message.text) + message.timestamp + message.index;
		};

		this.post = function(to, text) {
			let message = {
				dtype: 'message',
				from: userId,
				to: to,
				text: text,
				timestamp: Date.now()
			};
			message.index = this.messages.push(message) - 1;
			message.hash = messageHash(message);
			this.sentMessages[message.hash] = message;

			let m = {
				to: to,
				text: text,
				hash: message.hash
			};
			console.debug('$chat.post:', m);
			return $api.chat.post(m);
		};

		this.enter = function(id) {
			if (this.query.from == id) {
				return;
			}
			this.leave();
			this.query.from = id;
			if (cancel && !isCanceled()) {
				enter = true;
				cancel.resolve();
			}
			refreshContacts();
			selectContact(id);
		};

		this.leave = function() {
			delete this.query.from;
			delete this.query.timestamp;
			this.messages.length = 0;
			this.sentMessages = {};
			offers = {};
		};

		$eventBus.subscribe(userUpdateEventName, function(user) {
			console.log('[$chat]::' + userUpdateEventName + ':', user);
		});
	}])
;