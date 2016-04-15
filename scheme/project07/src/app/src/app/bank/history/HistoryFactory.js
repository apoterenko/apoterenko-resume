export class HistoryFactory {

	constructor($user, $api) {
		this.$user = $user;
		this.$api = $api;
	}

	applyData($scope) {
		var data = [];

		for (var i = 0; i < 100; i++) {
			data.push({
				description: 'Списание за активацию премиум на 30 дней',
				date: new Date(),
				amount: i * Math.round(Math.random() * 100)
			});
		}

		$scope.history = data;
	}
}