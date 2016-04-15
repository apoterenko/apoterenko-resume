import category from 'common/utils/category';

const maxKarma = 50;
const maxPrice = 500;
const antiKarmaUnlimited = '-50';
let previousQuery = {};
let saveParameter = function ($scope, param) {
	previousQuery[param] = $scope.query[param];
};
let initScope = function ($scope, query) {
	$scope.karma = query.karma || 0;
	$scope.antiKarma = maxKarma + query.antiKarma || 0;
	$scope.currentLanguage = previousQuery['language'] || '';
	$scope.price = [previousQuery['priceMin'] || 1, previousQuery['priceMax'] || maxPrice];
	$scope.age = [previousQuery['ageMin'] || 18, previousQuery['ageMax'] || 70];
	$scope.antiKarmaUnlimited = previousQuery['antiKarmaUnlimited'] || undefined;
	$scope.gender = previousQuery['gender'] || undefined;
	$scope.confirmed = previousQuery['confirmed'] || false;
};

var createNotEnoughMoneyPopup = function($scope, price, balance, $routeService, gettextCatalog) {
	$scope.alertObject = {
		text: gettextCatalog.getString("The price of this deal is {{price}} IMI, but your balance is {{balance}} IMI. You need to have enough IMI to pay the price before discussing a deal.", {price: price, balance: balance}),
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
		},
	};
}

export class SearchController {

	/*@ngInject*/
	constructor($rootScope, $scope, $user, $api, $search, $timeout, $state, $stateParams, $eventBus, $q, $routeService, gettextCatalog) {
		console.log('controller:', 'searchCtrl[', $stateParams, ']');
		$api.setScope($scope);

		$Boot.regService('$search', $scope);

		initScope($scope, $search.query);

		let viewArgs = $stateParams.args;
		$scope.viewCategory = $stateParams.category;
		$scope.category = category.fromType;

		console.debug('[$searchCtrl] view args: ', viewArgs);
		console.debug('[$searchCtrl] search query: ', $search.query);

		$scope.roles = [
			{name: '...', value: ''},
			{name: 'to get paid', value: 'performer'},
			{name: 'to pay', value: 'customer'}
		];

		$scope.selected = {};
		$scope.found = $search.found;
		$scope.query = angular.extend(angular.extend($search.query, $stateParams), previousQuery);

		$scope.setGender = function(gender) {
			if ($scope.query.gender == gender) {
				delete $scope.query.gender;
			} else {
				$scope.query.gender = gender;
			}
			saveParameter($scope, 'gender');
		};

		$scope.$watch('confirmed', function(confirmed) {
			if (confirmed) {
				$scope.query.confirmed = true;
			} else {
				delete $scope.query.confirmed;
			}
			saveParameter($scope, 'confirmed');
		});
		$scope.$watch('karma', function(karma) {
			if (karma === 0) {
				delete $scope.query.karma;
			} else {
				$scope.query.karma = karma;
			}
		});
		$scope.$watch('antiKarma', function(antiKarma) {
			delete $scope.antiKarmaUnlimited;
			let currentAntiKarma = maxKarma - antiKarma;
			if (currentAntiKarma === 0) {
				$scope.query.antiKarma = 0;
			} else if (antiKarma <= 0) {
				$scope.antiKarmaUnlimited = antiKarmaUnlimited;
				delete $scope.query.antiKarma;
			} else {
				$scope.query.antiKarma = -currentAntiKarma;
			}
		});

		$scope.$watchCollection('age', function(age) {
			$scope.query.ageMin = age[0];
			if (age[1] >= 70) {
				delete $scope.query.ageMax;
			} else {
				$scope.query.ageMax = age[1];
			}
			saveParameter($scope, 'ageMin');
			saveParameter($scope, 'ageMax');
		});

		$scope.$watchCollection('price', function(price) {
			$scope.query.priceMin = price[0];
			if (price[1] >= maxPrice) {
				delete $scope.query.priceMax;
			} else {
				$scope.query.priceMax = price[1];
			}
			saveParameter($scope, 'priceMin');
			saveParameter($scope, 'priceMax');
		});

		$scope.$watchCollection('roleCombo.role', function(role) {
			console.debug('role changed:', role);
			if (role && role.value) {
				$scope.query.role = role.value;
			} else {
				delete $scope.query.role;
			}
		});

		$scope.seen = $search.seen;

		var c;
		var onFound = function() {
			c = null;
			delete $scope.searchProgress;
			console.log('found:', $scope.found);

			$timeout(function () {
				$rootScope.$emit('forceresize')
			}, 1);
		};

		var find = function(options) {
			c = $q.defer();
			$search.find(options, c.promise).then(onFound);
		};

		var p, doFind = function() {
			$scope.searchProgress = true;
		//	delete $search.selected;

			c && c.resolve();
			p && $timeout.cancel(p);
			p = $timeout(find, 1000);
		};

		$scope.$watchCollection('query', doFind);

		var pageSize = $scope.pageSize || ($scope.pageSize = {
			premium: 20,
			standard: 10
		});
		var page = function(options) {
			var data = $search.found[options];
			return data.ads.slice(data.index, data.index + pageSize[options]);
		};

		$scope.premiumPage = function() {
			return page('premium');
		};
		$scope.standardPage = function() {
			return page('standard');
		};

		var navigate = function(options, sign) {
			let page = sign * pageSize[options];
			let data = $search.found[options];
			data.index += page;
			if (data.index < 0) {
				data.index = 0;
			}
			if (data.index + page > data.ads.length) {
				data.hasNext && find(options);
			}
			console.log('found.' + options + ':', data);
		};
		$scope.onPremiumPrev = function() {
			navigate('premium', -1);
		};
		$scope.onPremiumNext = function() {
			navigate('premium', 1);
		};
		$scope.onStandardPrev = function() {
			navigate('standard', -1);
		};
		$scope.onStandardNext = function() {
			navigate('standard', 1);
		};
		$scope.isPrevVisible = function(options) {
			return this.found[options].index > 0;
		};
		$scope.isNextVisible = function(options) {
			let data = this.found[options];
			return data.hasNext || data.index < data.ads.length - pageSize[options];
		};
		$scope.hasSearchResult = function () {
			return $search.found.standard.ads.length || $search.found.premium.ads.length;
		};
		$scope.nothingFound = function () {
			return ($search.found.standard.ads || $search.found.premium.ads) && !$scope.hasSearchResult();
		};
		$scope.isSearchProgress = function () {
			return $scope.searchProgress;
		};
		$scope.toUrl = function (ad) {
			return $Boot.to115Path(ad.image || 'default_userpic');
		};

		$scope.selected = function() {
			return $search.selected;
		};
		$scope.getCurrentAdUserPhotoUrl = function() {
			return $Boot.toUserAvatarPath($search.selected.owner, 115);
		};
		$scope.getCurrentAdPhotoUrl = function () {
			var photo = '', ad = $search.selected;
			if (ad && ad.image) {
				photo = $Boot.to675Path(ad.image);
			}
			return photo;
		};
		$scope.getCurrentAdImageType = function () {
			return category.toType($search.selected.category);
		};

		$scope.onSelectAd = function (ad) {
			console.log('select ad: ', ad);
			$search.select(ad);
		};

		$scope.isOwnAd = function() {
			return $search.selected && $search.selected.owner == $scope.user._id;
		};

		$scope.onChat = function() {
			let ad = $search.selected;
			if (ad.owner == $scope.user._id) {
				// Are you schizophrenic? Don't chat with yourself!
				return;
			}

			// if ($scope.user.imi < ad.price) {
			// 	$Boot.gaEvent('Ad', 'Not enough IMI to discuss the deal');
			// 	$Boot.gaEvent('Ad', 'Not enough IMI to discuss the deal in ' + ad.category);
			// 	createNotEnoughMoneyPopup($scope, ad.price, $scope.user.imi, $routeService, gettextCatalog);
			// 	return;
			// }

			$api.user.addEngagement(ad.owner, ad._id).then(
				function(response) {
					console.log('engagement result:', response);
				},
				function(response) {
					console.warn('engagement failed:', response);
				}
			);
			$state.go('chat', {partner: ad.owner, ad: ad._id});
		};

		$scope.allowEmptyLanguage = true;

		$scope.onAfterChangeLanguage = function (lang) {
			if (lang) {
				$scope.query.language = lang;
			} else {
				delete $scope.query.language;
			}
			saveParameter($scope, 'language');
		};

		let onUserUpdate = function(user) {
			$scope.user = user;
		};
		$user.getUser().then(onUserUpdate);
		$eventBus.subscribe('imigo.user.update', onUserUpdate, $scope);

		$scope.$on('$destroy', function() {
			$eventBus.cancelAll($scope);
		});

		$scope.buyPremium = function () {
			$routeService.redirect('bank');
		};

		$scope.onResetForm = function () {
			delete $scope.query.text;
			delete $scope.query.language;
			delete $scope.query.gender;
			delete $scope.roleCombo.role;
			delete $search.selected;

			initScope($scope, previousQuery = {
				antiKarmaUnlimited: antiKarmaUnlimited
			});
		};

		$scope.onShowExamples = function () {
			$scope.onResetForm();
			$scope.karma = maxKarma;
		};

		$scope.onReport = function () {
			let selected = $scope.selected();
			if (selected) {
				$scope.reportObject = {
					user: selected.owner,
					ad: selected._id
				};
			}
		};

		$scope.roleCombo = {};
	}
}