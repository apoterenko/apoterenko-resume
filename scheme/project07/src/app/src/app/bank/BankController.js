let loadSubscription = function ($api, $scope) {
	$api.bank.subscription().then(function(response) {
			console.debug('[$bankCtrl]', response);

			if (response.data && response.data.data) {
				let data = response.data.data;
				$scope.subscription = data;
				$scope.prePaid = data.type === 'pre-paid';
				$scope.postPaid = data.type === 'post-paid';
			}
		});
};

let MINIMAL_PAYMENT_SUM = 10,
	MINIMAL_WITHDRAWAL_SUM = 20;

export class BankController {

	/*@ngInject*/
	constructor($scope, $user, $api, $window, $eventBus) {
		console.log('controller:', 'bankCtrl');
		$api.setScope($scope);

		$Boot.regService('$bank', $scope);

		loadSubscription($api, $scope);

		let onUserUpdate = function(user) {
			$scope.user = user;
		};
		$user.getUser().then(onUserUpdate);
		$eventBus.subscribe('imigo.user.update', onUserUpdate, $scope);

		$scope.$on('$destroy', function() {
			$eventBus.cancelAll($scope);
		});

		let payment = $scope.payment = {type: 'paypal'},
			card = $scope.card = {};

		$scope.withdrawal = {};
		$scope.MINIMAL_WITHDRAWAL_SUM = MINIMAL_WITHDRAWAL_SUM;

		$scope.$watchCollection('payment', function (oldPayment, newPayment) {
			if (oldPayment.replenish !== newPayment.replenish) {
				delete $scope.withdrawalCard;
				delete $scope.payment.withdrawal;
				$scope.withdrawal = {};
			} else if (oldPayment.withdrawal !== newPayment.withdrawal) {
				delete $scope.credCard;
				delete $scope.payment.replenish;
				$scope.card = {};
				$scope.payment.type = 'paypal';
			}
			if (!$scope.canReplenishBalance()) {
				$scope.card = {};
				delete $scope.credCard;
			}
		});

		$scope.$watchCollection('payment.type', function () {
			if ($scope.canReplenishBalance()) {
				$scope.card = {};
				if ($scope.payment.type === 'card') {
					$scope.credCard = true;
				} else {
					delete $scope.credCard;
				}
			}
		});

		$scope.onWithdrawalBalance = function () {
			if (!$scope.canWithdrawalBalance()) {
				return;
			}
			$scope.withdrawalCard = true;
		};

		$scope.onWithdrawalPolicy = function () {
			$scope.credCard = false;
			delete $scope.withdrawalCard;
			$scope.withdrawalPolicy = true;
		};

		$scope.onReplenishBalance = function () {
			if (!$scope.canReplenishBalance()) {
				return;
			}
			delete $scope.withdrawalPolicy;

			if ($scope.payment.type === 'paypal') {
				$api.bank.buyImi(payment.replenish, 'paypal').then(
					function (response) {
						console.log('buy imi result:', response);
						if (response.data.status == 'success') {
							$window.location.assign(response.data.data);
						}
					},
					function (response) {
						console.warn('buy imi failed:', response);
					}
				);
			} else {
				$scope.credCard = true;
			}
		};

		$scope.canReplenishBalance = function () {
			return $scope.payment.replenish >= MINIMAL_PAYMENT_SUM;
		};

		$scope.canWithdrawalBalance = function () {
			return $scope.withdrawal.amount >= MINIMAL_WITHDRAWAL_SUM;
		};

		$scope.canShowMinPaymentSum = function () {
			return $scope.payment.replenish >= 0 && $scope.payment.replenish < MINIMAL_PAYMENT_SUM;
		};

		$scope.canShowMinWithdrawalSum = function () {
			return $scope.withdrawal.amount >= 0 && $scope.withdrawal.amount < MINIMAL_WITHDRAWAL_SUM;
		};

		$scope.onBuyImi = function () {
			console.debug('[$bankCtrl][onBuyImi]');
			if (!$scope.canProcessCard()) {
				return;
			}
			console.debug('card: ', $scope.getCardValues());
			$scope.credCardProgress = true;
			$scope.credCard = false;
			$api.bank.buyImi(payment.replenish, 'fishka', $scope.getCardValues()).then(
				function (response) {
					console.log('buy imi result:', response);
					$scope.credCardProgress = false;
					$scope.credCard = true;
					if (response.data.status == 'success') {
						$scope.credCard = false;

						$scope.makePopup('info', 'Your IMI purchase has been successful. Please be aware that it may take several minutes for your balance to update.');
					}
				},
				function (response) {
					console.warn('buy imi failed:', response);
					$scope.credCardProgress = false;
					$scope.credCard = true;

					$scope.makePopup('error', 'Woops! Your payment attempt failed, please try again.');
				}
			);
		};

		let onSuccessWithdrawal = function() {
			$scope.onCloseWithdrawalCard();
			$scope.makePopup('info', 'IMI withdrawal successful.');
		};

		let onFailWithdrawal = function() {
			$scope.makePopup('error', 'Woops! IMI withdraw failed.');
		};

		$scope.onWithdrawalImi = function () {
			console.debug('[$bankCtrl][onWithdrawalImi]');
			if (!$scope.canProcessWithdrawal()) {
				return;
			}
			let values = $scope.getWithdrawalValues();
			console.debug('withdrawal: ', values);

			$api.bank.withdraw(
				values.email,
				values.amount,
				values.type,
				values.destination).then(onSuccessWithdrawal, onFailWithdrawal);
		};

		$scope.getCardValues = function () {
			try {
				return {
					num: String($scope.card.id),
					name: $scope.card.name,
					expire_y: parseInt($scope.card.year.value),
					expire_m: parseInt($scope.card.month.value),
					cvc: $scope.card.cvv,
					post_code: $scope.card.postcode,
					country: $scope.card.country.value
				};
			} catch (e) {
				return null;
			}
		};

		$scope.getWithdrawalValues = function () {
			try {
				return {
					amount: $scope.withdrawal.amount,
					email: $scope.withdrawal.email,
					destination: $scope.withdrawal.id,
					type: $scope.withdrawal.type.value
				};
			} catch (e) {
				return null;
			}
		};

		$scope.canProcessCard = function () {
			let values = $scope.getCardValues();
			return values && values.num && values.name && values.expire_y && values.expire_m && values.cvc && values.post_code && values.country;
		};

		$scope.canProcessWithdrawal = function () {
			let values = $scope.getWithdrawalValues();
			return values && values.amount && values.email && values.type && values.destination;
		};

		$scope.getFinalWithdrawalSum = function () {
			return Math.round($scope.withdrawal.amount * 0.8);
		};

		$scope.onApply = function(type) {
			if ($scope.transactionRunning) {
				return;
			}
			$scope.transactionRunning = true;

			$api.bank.buyPremium(type).then(
				function(response) {
					console.log('buy premium[' + type + '] result:', response);
					loadSubscription($api, $scope);
					delete $scope.transactionRunning;

					$scope.makePopup('info', 'Premium subscription activated.');
				},
				function(response) {
					console.warn('buy premium[' + type + '] failed:', response);
					delete $scope.transactionRunning;
				}
			);
		};

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

		$scope.months = [
			{value: '01'},
			{value: '02'},
			{value: '03'},
			{value: '04'},
			{value: '05'},
			{value: '06'},
			{value: '07'},
			{value: '08'},
			{value: '09'},
			{value: '10'},
			{value: '11'},
			{value: '12'}
		];

		$scope.years = [
			{value: 2016},
			{value: 2017},
			{value: 2018},
			{value: 2019},
			{value: 2020},
			{value: 2021},
			{value: 2022},
			{value: 2023},
			{value: 2024}
		];

		// https://countrycode.org/
		$scope.countries = [
			{name: 'Russia', value: 'RU'},
			{name: 'United States', value: 'US'},
			{name: 'Japan', value: 'JP'}
		];

		$scope.withdrawalTypes = [
			{name: 'Paypal', value: "paypal"},
			{name: 'Skrill', value: "skrill"},
			{name: 'Yandex', value: "yandex"},
			{name: 'Webmoney', value: "webmoney"}
		];

		$scope.onCloseWithdrawalCard = function () {
			$scope.withdrawal = {};
			delete $scope.withdrawalCard;
		};

		$scope.onCloseCredCard = function () {
			$scope.card = {};
			delete $scope.credCard;
		};

		$scope.onCloseWithdrawalPolicy = function () {
			delete $scope.withdrawalPolicy;
		};

		$scope.onChangePaymentType = function (type) {
			$scope.payment.type = type;
		};
	}
}