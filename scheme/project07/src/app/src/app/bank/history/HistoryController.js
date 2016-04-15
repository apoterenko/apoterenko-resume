export class HistoryController {

	/*@ngInject*/
	constructor($scope, $user, $api, $historyFactory) {
		console.log('controller:', 'bankHistoryCtrl');

		$user.getUser().then(function(user) {
			$scope.user = user;
			$scope.loadNext();
		});

		$scope.debit = [];
		$scope.income = [];
		$scope.view = 'income';

		$scope.history = function() {
			return $scope[$scope.view];
		};

		$scope.loadNext = function() {
			$api.bank.history(50, $scope.lastId()).then(
				function(response) {
					console.log('bank history:', response);
					response.data.data.forEach(function(o) {
						o.date = new Date(1000 * o.timestamp);
						$scope[o.amount > 0 ? 'income' : 'debit'].push(o);
					});
				},
				function(response) {
					console.log('bank history error:', response);
				}
			);
		};

		$scope.lastId = function() {
			let h = $scope.history;
			return h && h.length > 0 ? h[h.length - 1] : null;
		};

		$scope.period = {
			from: 'Октябрь',
			to: 'Декабрь'
		};

		$scope.onBackward = function () {
			console.log('backward');
		};

		$scope.onForward = function () {
			console.log('forward');
		};
	}
}