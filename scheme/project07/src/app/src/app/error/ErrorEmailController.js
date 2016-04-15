export class ErrorEmailController {

	/*@ngInject*/
	constructor($scope, $state, $stateParams) {
		console.log('controller:', 'errorEmailCtrl');

		$scope[$stateParams.type] = true;

		$scope.makePopup = function (type, text) {
			$scope.alertObject = {
				type: type,
				text: text,

				button: {
					text: 'How to add my email?',

					action: function () {
						delete $scope.alertObject;

						if ($stateParams.idp == 'vk')
						{
							$scope.showFacebook = false;
							$scope.showVk = true;
						}
						else
						{
							$scope.showFacebook = true;
							$scope.showVk = false;	
						}
					}
				},

				button2: {
					text: 'Login with another social network',

					action: function () {
						$state.go('login');
					}
				}
			};
		};

		if ($stateParams.type == 'email') {
			$scope.makePopup('gold', 'To use IMIGO.ME you need an email address associated with your social network account.');
		}
		else
		{
			console.info("idp_permission:", $stateParams.type);
			if ($stateParams.idp == 'vk')
			{
				$scope.showFacebook = false;
				$scope.showVk = true;
			}
			else
			{
				$scope.showFacebook = true;
				$scope.showVk = false;	
			}
		}
	}
}