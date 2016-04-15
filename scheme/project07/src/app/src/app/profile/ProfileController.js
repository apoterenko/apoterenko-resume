import angular from 'angular';
import category from 'common/utils/category';

var yearsOld = function(year, month) {
	if (year === undefined || month === undefined) {
		return null;
	}
	var now = new Date();
	return Math.floor(((now.getFullYear() * 12 + now.getMonth()) - (year * 12 + month)) / 12);
};

var scale = function(v, max) {
	var i, mv = 0, mi = 0;
	for (i = 0; i < v.length; i++) {
		if (v[i] > mv) {
			mv = v[i];
			mi = i;
		}
	}
	if (!mv) {
		return [0, 0, 0];
	}
	var s = [], c = mv / (max || 10);
	for (i = 0; i < v.length; i++) {
		s.push(Math.max(1, Math.round(v[i] / c)));
	}
	return s;
};

var newStyle = function(type, v1, v2, v3) {
	var c = category.fromType(type), s = scale([v1 || 0, v2 || 0, v3 || 0]);
	return {
		'background-image': 'url(' + $Boot.toCdnPath(['exp/' + c, s[0], s[1], s[2]].join('_')) + '.png)'
	}
};

export class ProfileController {

	/*@ngInject*/
	constructor($scope, $user, $api, $state, $stateParams, $q, $eventBus, $uploaderFactory, $routeService) {
		console.log('controller:', 'profileCtrl[', $stateParams, ']');
		$api.setScope($scope);

		$user.getUser(); // FIXME remove if we want see other profiles unauthorized!

		$scope.returnState = $stateParams.from;
		console.debug('[$profile] return state', $scope.returnState);

		let refreshUserFn;
		if ($stateParams.user && ($stateParams.ad || $stateParams.from)) {
			$scope.me = false;
			refreshUserFn = function() {
				let d = $q.defer();
				$api.user.get($stateParams.user).then(
					function (response) {
						//$scope.user = response.data.data;
						console.log('user[' + $stateParams.user + '] profile:', response.data.data);
						d.resolve(response.data.data);
					},
					function (response) {
						console.log('user[' + $stateParams.user + '] profile load failed:', response);
						$state.go('profile');
					}
				);
				return d.promise;
			};
		} else {
			$scope.me = true;
			refreshUserFn = function(reload) {
				let d = $q.defer();
				$user.getUser(reload).then(function(user) {
					console.log('my profile:', user);
					d.resolve(user);
				});
				return d.promise;
			};
		}

		let applyUser = function(user) {
			if (!$scope.user) {
				$scope.user = user;
			} else {
				angular.extend($scope.user, user);
			}
		};
		let refreshUser = function(reload) {
			return refreshUserFn(angular.isUndefined(reload) || !!reload)
				.then(function(user) {
					applyUser(user);
					return $scope.user;
				});
		};
		let onUserUpdate = function(user) {
			$scope.me && applyUser(user);
		};
		$eventBus.subscribe('imigo.user.update', onUserUpdate, $scope);

		$scope.$on('$destroy', function() {
			$eventBus.cancelAll($scope);
		});

		$scope.accountType = function() {
			return $scope.user && $scope.user.premium ? 'premium' : 'basic';
		};

		var photo = $scope.photo = {
			v: [],
			index: -1,
			toUrl: function(size, image) {
				if (angular.isNumber(image)) {
					image = this.v[image];
				}
				return $Boot['to' + size + 'Path'](image || $scope.user && $scope.user.avatar || 'default_userpic');
			}
		};

		var aboutLength = 250;

		$scope.accessbileCharCount = $scope.maxAccessbileCharCount = aboutLength;

		var refreshAccessibleCharCount = function (about) {
			if (about || $scope.user) {
				$scope.accessbileCharCount = aboutLength - (about || $scope.user.about).length;
			}
		};

		$scope.onChangeAbout = refreshAccessibleCharCount;

		var data = $scope.data = {
			friends: {
				color: '0x1bad73',
				tip: {
					top: 'initiative',
					left: 'humor',
					right: 'intelligence'
				},
				getCustomLevel: function(position) {
					switch (position) {
						case 'left':
							return this.humor || 0;
						case 'right':
							return this.intel || 0;
						case 'top':
							return this.init || 0;
					}
				},
				getLevel: function() {
					return (this.init || 0) + (this.intel || 0) + (this.humor || 0);
				},
				getStyle: function() {
					return newStyle('friends', this.init, this.humor, this.intel);
				}
			},
			romance: {
				color: '0xa3225c',
				tip: {
					top: 'initiative',
					left: 'sex appeal',
					right: 'intelligence'
				},
				getCustomLevel: function(position) {
					switch (position) {
						case 'left':
							return this.sexual || 0;
						case 'right':
							return this.intel || 0;
						case 'top':
							return this.init || 0;
					}
				},
				getLevel: function() {
					return (this.init || 0) + (this.intel || 0) + (this.sexual || 0);
				},
				getStyle: function() {
					return newStyle('romance', this.init, this.sexual, this.intel);
				}
			},
			work: {
				color: '0x009fb7',
				tip: {
					top: 'professionalism',
					left: 'performance',
					right: 'charisma'
				},
				getCustomLevel: function(position) {
					switch (position) {
						case 'left':
							return this.perf || 0;
						case 'right':
							return this.clarity || 0;
						case 'top':
							// FIXME proff -> prof (after server-side fix!)
							return this.proff || 0;
					}
				},
				getLevel: function() {
					// FIXME proff -> prof (after server-side fix!)
					return (this.proff || 0) + (this.perf || 0) + (this.clarity || 0);
				},
				getStyle: function() {
					return newStyle('work', this.proff, this.perf, this.clarity);
				}
			}
		};

		$scope.sum = function(key) {
			return (data.friends[key] || 0) + (data.romance[key] || 0) + (data.work[key] || 0);
		};

		$scope.age = function() {
			return yearsOld($scope.user.year_of_birth, $scope.user.month_of_birth);
		};

		$scope.uploader = $uploaderFactory({
			url: 'api/1/users/me/images',

			onSuccessUpload: function(data) {
				if (!photo.v.length) {
					$scope.user.avatar = data;
					$scope.updateProperty('avatar');
				} else {
					refreshUser();
				}
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
			}
		});

		var logError = function(response) {
			console.log('error:', response);
		};

		$scope.updateProperty = function(name) {
			let user = {}, value = $scope.user[name];
			// FIXME make validation mechanism!
			if ((name == 'nickname') &&
				(typeof value == 'string')) {
				let index = value.indexOf('<br>');
				if (index > -1 && value.length === 4 + index) {
					value = value.substring(0, value.length - 4); // FIXME
				}
				if (value.length < 3) {
					refreshUser();
					return;
				}
			}
			console.log('updateProperty(' + name + '):', value);
			user[name] = value;
			$api.user.update(user).then(
				refreshUser,
				logError
			);
		};

		$scope.updateAvatar = function($event, image) {
			$event.stopPropagation();

			if (angular.isNumber(image)) {
				image = photo.v[image];
			}
			console.debug('updateAvatar(' + image + ')');

			if ($scope.user.avatar != image) {
				$scope.user.avatar = image;
				this.updateProperty('avatar');
			}
		};

		$scope.openOverlay = function(index) {
			photo.index = index;
		};

		$scope.closeOverlay = function () {
			photo.index = -1;
		};

		$scope.onOverlayNext = function($event) {
			$event.stopPropagation();

			if (photo.index < photo.v.length - 1) {
				photo.index++;
			}
		};

		$scope.onOverlayPrev = function($event) {
			$event.stopPropagation();

			if (photo.index > 0) {
				photo.index--;
			}
		};

		$scope.deleteImage = function($event, image) {
			$event.stopPropagation();

			if (angular.isNumber(image)) {
				image = photo.v[image];
			}
			console.log('deleteImage(' + image + ')');
			if ($scope.user.avatar == image) {
				console.warn('image ' + image + ' used as avatar!');
				return;
				// this.updateAvatar('default_userpic');
			}
			$api.user.deleteImage(image).then(
				refreshUser,
				logError);
		};

		$scope.onAfterChangeLanguage = function (lang) {
			if ($scope.user.language !== lang) {
				$scope.user.language = lang;
				this.updateProperty('language');
			}
		};

		refreshUser(false).then(function(user) {
			$scope.$watchCollection('user.exp', function(exp) {
				for (var c in exp) {
					angular.extend(data[category.toType(c)], exp[c]);
				}
				console.log('profile data:', data);
			});
			$scope.$watchCollection('user.images', function(images) {
				if (!images) {
					console.warn('no user.images attribute!');
					photo.v = [];
				} else {
					photo.v = images.v.slice();
				}
				if (photo.index >= photo.v.length) {
					photo.index = photo.v.length - 1;
				}
				console.log('profile photo:', photo);
			});
			$scope.$watchCollection('user.about', refreshAccessibleCharCount);

			$scope.currentLanguage = $scope.user.language;
		});

		$scope.buyPremium = function () {
			$routeService.redirect('bank');
		};

		$scope.backwardToState = function () {
			$routeService.back($scope.returnState);
		};

		let onChatAsUser = function(user) {
			if (user._id == $scope.user._id) {
				return;
			}
			if ($stateParams.ad) {
				$api.user.addEngagement($scope.user._id, $stateParams.ad).then(
					function(response) {
						console.log('engagement result:', response);
					},
					function(response) {
						console.warn('engagement failed:', response);
					}
				);
			}
			$state.go('chat', {partner: $scope.user._id, ad: $stateParams.ad});
		};

		$scope.onChat = function() {
			if ($scope.me) {
				return;
			}
			$user.getUser().then(onChatAsUser);
		};
	}
}