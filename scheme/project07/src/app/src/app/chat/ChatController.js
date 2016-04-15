import category from 'common/utils/category';
import { ChatScroller } from './ChatScroller';

let extractFirstName = function (name) {
	return name ? name.split(' ').shift() : name;
};

export class ChatController {

	/*@ngInject*/
	constructor($scope, $user, $api, $chat, $state, $stateParams, $filter, $interval, $window, $eventBus) {
		console.debug('[$chatCtrl] $stateParams:', $stateParams);
		$api.setScope($scope);

		$Boot.regService('$chat', $scope);

		const partner = $scope.partner = $stateParams.partner;

		if (!partner) {
			$state.go('chat', {partner: $chat.getDefaultPartner()});
			return;
		}
		if (partner == '000000000000000000000000') {
			$state.go('chat', {partner: 'system'});
			return;
		}
		if (partner == 'system' && $stateParams.ad !== undefined) {
			$state.go('chat', {partner: 'system', ad: undefined});
			return;
		}

		$scope.roles = [
			{name: 'Client', value: 'customer'},
			{name: 'Performer', value: 'performer'}
		];
		$scope.professions = [
			{name: 'Friendship', value: 'friendship'},
			{name: 'Romance', value: 'romance'},
			{name: 'Professional', value: 'professional'}
		];

		let selectBy = function(a, value, key) {
			key = key || 'value';
			for (let i = 0; i < a.length; i++) {
				if (a[i][key] == value) {
					return a[i];
				}
			}
		};

		$scope.notSystemPartner = function () {
			return partner !== 'system';
		};

		var offer = $scope.offer = {
			//price: 10,
			//duration: 1
		};

		var chat = $scope.chat = {};

		var contacts = $scope.contacts = $chat.contacts;

		$scope.hasNewMessages = function(id) {
			return !!$chat.hasNewMessages[contacts.getId(id)];
		};

		let applyAd = function (ad) {
			console.debug('using ad[' + ad._id + ']:', ad);
			let role;
			switch (ad.role) {
				case 'customer':
					role = selectBy($scope.roles, 'performer');
					break;
				case 'performer':
				default:
					role = selectBy($scope.roles, 'customer');
					break;
			}
			$scope.selected.role = role;
			$scope.selected.category = selectBy($scope.professions, ad.category);
			$scope.offer.price = ad.price;
			$scope.offer.duration = 1;
		};

		var desk = $scope.desk = {
			data: [],
			index: -1,
			card: null,
			prev: function () {
				if (this.index > 0) {
					this.index--;
					this.update();
					this.isAd() && applyAd(this.card);
				}
			},
			next: function () {
				if (this.index < this.data.length - 1) {
					this.index++;
					this.update();
					this.isAd() && applyAd(this.card);
				}
			},
			hasPrev: function() {
				return this.index > 0;
			},
			hasNext: function() {
				return this.index < this.data.length - 1;
			},
			update: function () {
				if (this.index >= this.data.length) {
					this.index = this.data.length - 1;
				}
				if (this.index >= 0) {
					this.card = this.data[this.index];
				} else if (this.data.length > 0) {
					this.card = this.data[this.index = 0];
				} else {
					delete this.card;
				}
				console.log('desk updated:', this);
			},
			isAd: function() {
				return !!(this.card && this.card.advertisement);
			},
			getImageType: function() {
				return this.card && category.toType(this.card.category);
			},
			getPhotoUrl: function() {
				let url = this.card && this.card.image;
				if (angular.isString(url) && !url.startsWith('img/')) {
					url = 'img/' + url;
				}
				return $Boot.to350Path(url || 'default_userpic');
			},
			getPartnerId: function() {
				return this.isAd() ? this.card.owner : this.card.partner;
			},
			// FIXME duplicate code with MainController.js
			isDeal: function() {
				return !!(this.card && this.card.started);
			},
			isDealActive: function() {
				return this.isDeal() && !this.card.finished;
			},
			isDealFinished: function() {
				return this.isDeal() && !!this.card.finished;
			},
			incrementScore: function(type) {
				var f = this.card && this.card.feedback;
				if (!f) {
					return;
				}
				if (this.card.points > 0) {
					this.card.points--;
					f[type]++;
				}
				console.log('feedback changed:', f);
			},
			decrementScore: function(type) {
				var f = this.card && this.card.feedback;
				if (!f) {
					return;
				}
				if (f[type] > 0) {
					f[type]--;
					this.card.points++;
				}
				console.log('feedback changed:', f);
			},
			getTimeLeft: function() {
				if (!this.isDealActive()) {
					return null;
				}
				let d = this.card.duration;
				return this.card.started + d - Math.round($api.now() / 1000);
			}
		};

		let partnerDeals = function() {
			let deals = [];
			if (!$scope.user || !$scope.user.deals) {
				return deals;
			}
			$scope.user.deals.forEach(function (d) {
				if (d.partner == partner) {
					deals.push(d);
				}
			});
			return deals;
		};

		if ($scope.notSystemPartner()) {
			offer.partner = partner;
			$api.user.engagements(partner).then(
				function (response) {
					console.log('engagements:', response);
					desk.data = partnerDeals();
					response.data.data.forEach(function (a) {
						desk.data.push(a.advertisement);
						a.advertisement.advertisement = true;
					});
					desk.update();
				},
				function (response) {
					console.warn('engagements load error:', response);
				}
			);

			if ($stateParams.ad) {
				$api.ad.get($stateParams.ad).then(
					function (response) {
						applyAd(response.data.data);
					},
					function (response) {
						console.warn('ad[' + $stateParams.ad + '] load error:', response);
					}
				)
			}
		}

		$scope.$watch('contacts.index', function(index) {
			var c = contacts.selected();
			console.log('selected contact #' + index + ':', c);
			offer.partner = c.id;
		});

		$scope.messages = $chat.messages;
		$scope.$m = {
			getType: function (m) {
				if (this.isDealOffer(m) && !this.isMyMessage(m)) {
					return 'deal-offer';
				} else if (this.isDealOffer(m) && this.isMyMessage(m)) {
					return 'self-offer';
				} else if (this.isOfferActive(m)) {
					return 'offer-active';
				} else if (this.isDealStarted(m)) {
					return 'deal-started';
				} else if (this.isDealRefused(m)) {
					return 'deal-refused';
				} else if (this.isDealCanceled(m)) {
					return 'deal-canceled';
				} else if (this.isDealFinished(m)) {
					return 'deal-finished';
				} else if (this.isMessage(m)) {
					return 'simple-message';
				}
			},
			isDealOffer: function(m) {
				return m.dtype === 'deal'
				    && m.type === 'offered';
			},
			isMyMessage: function(m) {
				return m.from === $scope.user._id;
			},
			isOfferCustomer: function(m) {
				return  m.dtype === 'deal'
				    && m.type === 'offered'
				    && m.role === 'customer';
			},
			isOfferPerformer: function(m) {
				return  m.dtype === 'deal'
				    && m.type === 'offered'
				    && m.role === 'performer';
			},
			isOfferActive: function (m) {
				return m.dtype === 'deal'
					&& m.type === 'offered'
					&& m.active;
			},
			isDealStarted: function(m) {
				return m.dtype === 'deal'
				    && m.type === 'started';
			},
			isDealRefused: function(m) {
				return m.dtype === 'deal'
				    && m.type === 'refused';
			},
			isDealCanceled: function(m) {
				return m.dtype === 'deal'
				    && m.type === 'canceled';
			},
			isDealFinished: function(m) {
				return m.dtype === 'deal'
				    && m.type === 'finished';
			},
			isMessage: function (m) {
				return m.dtype === "message";
			},
			getEventCode: function(m) {
				if (m.dtype === 'deal') {
					switch (m.type) {
						case 'offered':
							return 2;
						case 'started':
						case 'finished':
							return 1;
						case 'canceled':
						case 'refused':
							return 0;
					}
				}
				return null;
			},
			durationUnit: function (m) {
				switch (m.category) {
					case 'professional':
						return 'hour';
					default:
						return 'day';
				}
			},
			sender: function(m) {
				return extractFirstName(contacts.map[m.from] || m.from);
			},
			receiver: function(m) {
				return extractFirstName(contacts.map[m.to] || m.to);
			},
			expirationDate: function (m) {
				if (!m.timestamp) {
					return;
				}
				let durationAtSec = m.duration * 60 * 60 * 1000;

				if (m.category !== 'professional') {
					durationAtSec *= 24;
				}
				return m.timestamp + durationAtSec;
			}
		};

		var selected = $scope.selected = {};
		$scope.$watchCollection('selected.category', function(category) {
			console.log('category:', category);

			delete $scope.durationDay;
			delete $scope.durationHour;

			if (category) {
				offer.category = category.value;

				switch (offer.category) {
					case "romance":
					case "friendship":
						$scope.durationDay = true;
						break;
					case "professional":
						$scope.durationHour = true;
						break;
				}
			} else {
				delete offer.category;
			}
		});
		$scope.$watchCollection('offer', function(offer) {
			console.debug('offer:', offer);
		});
		$scope.isOfferValid = function() {
			return !!(
				offer.partner &&
				offer.category &&
				offer.duration &&
				offer.price
			);
		};

		$scope.resetOffer = function () {
			delete $scope.durationDay;
			delete $scope.durationHour;

			delete offer.duration;
			delete offer.price;
			delete chat.message;

			delete selected.role;
			delete selected.category;
		};

		$scope.onDealOffer = function() {
			if (!this.isOfferValid()) {
				return;
			}
			console.log('deal offer:', angular.copy(offer));
			offer.role = "customer";
			$api.deals.offer(offer).then(
				function(response) {
					console.log('deal offer result:', response);

					$scope.resetOffer();
				},
				function(response) {
					console.error('deal offer failed:', response);
				}
			);
		};

		$scope.onSend = function () {
			var message = chat.message;
			delete chat.message;

			if (angular.isString(message) && message != '') {
				console.log('Send message:', message);
				$chat.post(partner, message);
			}
		};

		$scope.onRemoveContact = function ($event, index) {
			$event.stopPropagation();
			if (index > 0 && index < contacts.data.length) {
				var c = contacts.data[index];
				console.log('Remove contact:', c);
				c && c.id && $api.user.deleteContact(c.id);
				contacts.data.splice(index, 1);
				if (contacts.index >= contacts.data.length) {
					contacts.index = contacts.data.length - 1;
				}
			}
		};

		$scope.onRefuseSuggestion = function ($event, suggestion) {
			$event.stopPropagation();
			console.log('Refuse suggestion:', suggestion);
			if (suggestion.dealId) {
				$api.deals.refuse(suggestion.dealId).then(
					function(response) {
						console.log('deal refuse result:', response);
					},
					function(response) {
						console.warn('deal refuse failed:', response);
					}
				);
			}
		};

		$scope.onAcceptSuggestion = function ($event, suggestion) {
			$event.stopPropagation();
			console.log('Accept suggestion:', suggestion);
			if (suggestion.dealId) {
				$api.deals.start(suggestion.dealId).then(
					function(response) {
						console.log('deal start result:', response);
					},
					function(response) {
						console.warn('deal start failed:', response);
					}
				);
			}
		};

		$scope.$on('finishrender', function() {
			ChatScroller.scrollDown();
		});

		ChatScroller.bind($window);

		let onUserUpdate = function(user) {
			$scope.user = user;
			contacts.map[user._id] = user.nickname; // 'You'
		};
		$user.getUser().then(function(user) {
			if (partner == user._id) {
				$state.go('chat', {partner: 'system'});
				return;
			}

			onUserUpdate(user);

			$chat.enter(partner);

			// TODO centralized $api.interval with entering and leaving scopes, and processing their interval fn's.
			$eventBus.addIntervalCanceler($scope, $interval(function() {
				if (!desk.card || desk.isAd()) {
					return;
				}
				let timeLeft = desk.getTimeLeft();
				let timeShift = (new Date(0)).getHours() * 3600;
				if (timeLeft !== null && timeLeft > 0) {
					timeLeft = $filter('timeInterval')(timeLeft - timeShift);
					if (desk.card.timeLeft !== timeLeft) {
						desk.card.timeLeft = timeLeft;
					}
				} else {
					desk.card.finished = true;
				}
			}, 100));
		});
		$eventBus.subscribe('imigo.user.update', onUserUpdate, $scope);

		$scope.$on('$destroy', function() {
			ChatScroller.unbind($window);
			$eventBus.cancelAll($scope);
		});

		$scope.makePopup = function (type, text) {
			$scope.alertObject = {
				type: type,
				text: text,

				button: {
					text: 'close',

					action: function () {
						delete $scope.alertObject;
					}
				}
			};
		};

		$scope.onReport = function () {
			if (desk.isAd()) {
				$scope.reportObject = {
					user: desk.card.owner
				};
			}
		};
	}
}