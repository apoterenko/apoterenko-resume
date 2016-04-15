import angular from 'angular';
import category from 'common/utils/category';

var newData = function() {
	return {
		ads: [],
		deals: [],
		index: 0,
		// FIXME duplicate code with ChatController.js
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
		getTimeLeft: function(nowSupply) {
			if (!this.isDealActive()) {
				return null;
			}
			return this.card.started
				+ this.card.duration
				- Math.round(nowSupply.now() / 1000);
		}
	}
};

var newStyle = function(image) {
	return {
		'background-image': 'url(' + $Boot.to350Path(image) + ')'
	};
};

var updateCard = function(desk) {
	if (desk.edit) {
		return;
	}
	if (desk.index < 0 || desk.index >= desk.count) {
		delete desk.card;
		delete desk.style;
	} else if (desk.index >= desk.deals.length) {
		desk.card = desk.ads[desk.index - desk.deals.length];
		desk.style = newStyle(desk.card.image);
	} else {
		var deal = desk.card = desk.deals[desk.index];
		desk.style = newStyle('img/' + deal.partner + '/avatar');

		if (desk.isDealFinished() && !deal.feedback) {
			deal.skills = {};
			deal.feedback = {
				category: deal.category
			};
			category.skills(deal.category).forEach(function(s) {
				deal.skills[s] = category.skillName(s);
				deal.feedback[s] = 0;
			});
		}
	}
	delete desk.confirm;
};

var adjustIndex = function(desk, limit) {
	desk.count = desk.deals.length + desk.ads.length;
	desk.limit = Math.max(desk.count, limit);
	if (desk.index >= desk.limit) {
		desk.index = desk.limit - 1;
	}
	if (desk.index < 0 && desk.count > 0) {
		desk.index = 0;
	}
	updateCard(desk);
};

var cancelEdit = function(desk) {
	delete desk.edit;
	// FIXME
	// delete desk.card.accessbileCharCount;

	var uploader = desk.uploader;
	if (uploader) {
		uploader.cancelAll();
		uploader.destroy();
		delete desk.uploader;
	}
};

var createAdsLimitPopup = function($scope, $routeService) {
	$scope.alertObject = {
		text1: 'You have reached the maximum number of ads. Activate premium account to unlock additional slots.',
		text2: 'Activate premium account to unlock additional slots.',
		text3: 'PREMIUM ACCOUNT',

		type: 'gold',

		close: function () {
			delete $scope.alertObject;
		},

		button: {
			text: 'Activate',

			action: function () {
				delete $scope.alertObject;
				$routeService.redirect('bank');
			}
		}
	};
}

var createNotEnoughMoneyPopup = function($scope, price, balance, $routeService, gettextCatalog) {
	$scope.alertObject = {
		text: gettextCatalog.getString("The price you set is {{price}} IMI, but your balance is {{balance}} IMI. You need to have enough IMI to pay the price before creating an ad.", {price: price, balance: balance}),
		type: "info",

		close: function () {
			delete $scope.alertObject;
		},

		button: {
			text: gettextCatalog.getString('Purchase IMI'),

			action: function () {
				delete $scope.alertObject;
				$routeService.redirect('bank');
			}
		},

		button2: {
			text: gettextCatalog.getString('Back'),

			action: function () {
				delete $scope.alertObject;
			}
		}
	};
}

export class MainController {

	/*@ngInject*/
	constructor($scope, $user, $api, $filter, $interval, $eventBus, $uploaderFactory, $routeService, $video, gettextCatalog) {
		console.log('controller:', 'mainCtrl');

		$Boot.regService('$main', $scope);

		$api.setScope($scope);

		var data = $scope.data = {
			friends: newData(),
			romance: newData(),
			work: newData()
		};

		var maxSlots = function() {
			return $scope.user && $scope.user.limits.max_slots.value || 0;
		};

		var maxAds = function() {
			return $scope.user && $scope.user.limits.ads.v || 0;
		}

		var balance = function() {
			return $scope.user && $scope.user.imi || 0;
		}

		// TODO unified function
		var onAdsChanged = function(userAds) {
			for (var type in data) {
				data[type].ads = [];
			}
			userAds.forEach(function(ad) {
				data[category.toType(ad.category)].ads.push(ad);
			});
			for (var type in data) {
				adjustIndex(data[type], maxSlots());
			}
			console.log('data:', data);
		};
		var onDealsChanged = function(userDeals) {
			for (var type in data) {
				data[type].deals = [];
			}
			userDeals.forEach(function(deal) {
				data[category.toType(deal.category)].deals.push(deal);
			});
			for (var type in data) {
				adjustIndex(data[type], maxSlots());
			}
			console.log('data:', data);
		};
		var onSurveysChanged = function(surveys) {
			if (surveys) {
				console.warn('pending surveys:', surveys);
				// TODO show survey popup here, call $api.passSurvey() then done!
			}
		};

		let onUserUpdate = function(user) {
			$scope.user = user;
		};
		var refreshUser = function() {
			$user.getUser(true).then(onUserUpdate);
		};
		$eventBus.subscribe('imigo.user.update', onUserUpdate, $scope);

		$scope.$on('$destroy', function() {
			$eventBus.cancelAll($scope);
		});

		$user.getUser().then(function(user) {
			onUserUpdate(user);
			$scope.$watchCollection('user.ads', onAdsChanged);
			$scope.$watchCollection('user.deals', onDealsChanged);
			$scope.$watchCollection('user.surveys', onSurveysChanged);
			// TODO centralized $api.interval with entering and leaving scopes, and processing their interval fn's.
			$eventBus.addIntervalCanceler($scope, $interval(function() {
				let changed = false;
				let timeShift = (new Date(0)).getHours() * 3600;

				$.each(data, function (type, desk) {
					if (!desk.isDeal()) {
						return;
					}
					let timeLeft = desk.getTimeLeft($api);
					if (timeLeft !== null && timeLeft > 0) {
						timeLeft = $filter('timeInterval')(timeLeft - timeShift);
						if (desk.timeLeft !== timeLeft) {
							desk.timeLeft = timeLeft;
							changed = true;
						}
					} else if (desk.card && !desk.card.finished) {
						desk.card.finished = true;
						updateCard(desk);
					}
				});
			}, 100));
		});

		$scope.category = category.fromType;

		$scope.onCreate = function(type) {
			let desk = data[type];

			console.debug('[main][onCreate]: type is', type, ', ads limit is', maxAds(), ', ads count is', desk.ads.length);

			if (desk.ads.length >= maxAds()) {
				$Boot.gaEvent('Ad', 'Ad creation limit exceeded');
				createAdsLimitPopup($scope, $routeService);
				return;
			}

			if (desk.edit) {
				return;
			}
			delete desk.confirm;
			desk.index = desk.count;
			desk.edit = true;
			desk.card = {
				category: category.fromType(type)
			};
			desk.card.accessbileCharCount = $scope.maxAccessbileCharCount;
			delete desk.style;

			desk.uploader = $uploaderFactory({
				url: 'api/1/ad/images',

				onSuccessUpload: function(data) {
					if (!desk.edit) {
						return;
					}
					desk.card.image = data;
					desk.style = newStyle(desk.card.image);
				},

				onFailUpload: function (error) {
					$scope.alertObject = angular.extend(error, {
						type: 'error',

						button: {
							text: 'close',

							action: function () {
								delete $scope.alertObject;
							}
						}
					});

					if (!desk.edit) {
						return;
					}
					delete desk.style;
					delete desk.card.image;
				}
			});
		};

		$scope.onCancel = function(type) {
			console.log("onCancel(" + type + ")");
			var desk = data[type];
			if (desk.edit) {
				cancelEdit(desk);
				updateCard(desk);
			} else {
				desk.confirm = 1;
			}
		};

		$scope.onPlace = function(type) {
			console.log("onPlace(" + type + ")");
			var desk = data[type];

			if (!$scope.isValidAd(desk.card)) {
				return;
			}

			var adData = {};
			adData.price = desk.card.price;
			adData.role = desk.card.role.value;
			adData.category = desk.card.category;
			adData.language = desk.card.language;
			adData.text = desk.card.text;
			adData.image = desk.card.image;

			console.warn("Trying to place: " + balance() + " while price is: ", desk.card);
			// if (adData.role === 'customer' && balance() < adData.price) {
			// 	$Boot.gaEvent('Ad', 'Not enough IMI to create AD');
			// 	$Boot.gaEvent('Ad', 'Not enough IMI to create AD in ' + adData.category);
			// 	createNotEnoughMoneyPopup($scope, adData.price, balance(), $routeService, gettextCatalog);
			// 	return;
			// }

			if (desk.edit) {
				cancelEdit(desk);
			} else {
				return;
			}

			$api.ad.post(adData).then(
				function(response) { // onSuccess
					console.log('ad place success:', response);
					$user.getUser(true).then(function(user) {
						desk.index = desk.count;
						onUserUpdate(user);
					});

					if (response.data.data.status == 'waitsModeration') {
						$scope.makePopup('info', gettextCatalog.getString('Thank you for creating an ad, it is being moderated. You will receive a message when it’s published.'));
					} else {
						$scope.makePopup('info', gettextCatalog.getString('Your ad was successfully submitted! You can submit another Ad in this category after 30 minutes.'));
					}
				},
				function(response) { // onError
					console.error('ad place failure:', response);
					updateCard(desk);
				});
		};

		$scope.onDelete = function(type) {
			console.log("onDelete(" + type + ")", data[type]);
			var desk = data[type];
			if (!desk.card ||
				!(desk.isDeal() ? desk.card.id : desk.card._id)) {
				return;
			}
			(desk.isDeal() ?
				$api.deals.cancel(desk.card.id) :
				$api.ad.del(desk.card._id))
					.then(
						refreshUser,
						refreshUser);
		};

		$scope.onCancelDelete = function(type) {
			console.log("onCancelDelete(" + type + ")");
			var desk = data[type];
			delete desk.confirm;
		};

		$scope.isValidAd = function (card) {
			return card.text && card.price && card.role && card.role.value;
		};

		$scope.onPageForward = function(type) {
			let desk = data[type];
			console.log('[mainCtrl][onPageForward] desk.index: ', desk.index, ', desk.limit: ', desk.limit);

			if (desk.index < desk.limit - 1) {
				desk.index++;
			} else {
				desk.index = 0;
			}
			cancelEdit(desk);
			updateCard(desk);
		};

		$scope.onPageBackward = function(type) {
			let desk = data[type];
			console.log('[mainCtrl][onPageBackward] desk.index: ', desk.index, ', desk.limit: ', desk.limit);

			if (desk.index > 0) {
				desk.index--;
			} else {
				desk.index = desk.limit - 1;
			}
			cancelEdit(desk);
			updateCard(desk);
		};

		$scope.onCompleteDeal = function(card) {
			console.log('complete deal[' + card.id + ']:', card.feedback, card);
			if (!card.feedback || card.complete) {
				return;
			}
			card.complete = true;
			$api.deals.feedback(card.id, card.feedback).then(
				function(response) {
					console.log('deal feedback result:', response);
					refreshUser();
				},
				function(response) {
					console.warn('deal feedback failed:', response);
					refreshUser();
				}
			);
		};

		$scope.maxAccessbileCharCount = 140;
		$scope.onChangeAd = function (card) {
			card.accessbileCharCount = $scope.maxAccessbileCharCount - card.text.length;
		};

		$scope.roles = [
			{name: 'You want to pay', value: 'customer'},
			{name: 'You want to get paid', value: 'performer'}
		];

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

		if (window.openWelcome) {
			$video.activate();
			delete window.openWelcome;
		}
	}
}