import angular from 'angular';

import 'common/services/api';
import 'common/services/alert';

import reportTemplate from '../../app/report.tpl';

export default angular
	.module('imigo.report', ['ng', 'app/report.tpl.html', 'imigo.api'])
	.controller('reportCtrl', ['$scope', '$api', '$alert', function ($scope, $api, $alert) {
		console.debug('[$reportCtrl] reportObject:', $scope.reportObject);

		$scope.form = {};

		let parentScope = $scope.$parent.$parent.$parent;

		let getComment = function() {
			return $scope.form.comment ? $scope.form.comment : '';
		};

		$scope.onSendReport = function () {
			if (!this.canSendReport()) {
				return;
			}
			$api.chat.abuse(
				$scope.reportObject,
				$scope.form.cause,
				getComment()).then(
				function() {
					$alert.activate({
						type: 'info',
						text: 'Your abuse report was successfully sent!'
					});
				}
			);

			$scope.onCloseReport();
		};

		$scope.onCloseReport = function () {
			delete parentScope.reportObject;
		};

		$scope.canSendReport = function () {
			return $scope.selectOther() ? $scope.form.comment : $scope.form.cause;
		};

		$scope.selectOther = function () {
			return $scope.form.cause === 'other';
		};
	}]);