export class LoginController {

	/*@ngInject*/
	constructor($scope, $user, $video) {
		console.log('controller:', 'loginCtrl');

		$user.getUser().then(
			function(user) {
				if (user) {
					console.log('user: ', user);
					$scope.login = true;
				}
			},
			function(reason) {
				console.log('login reason: ', reason);
				if (reason == 'login') {
					$scope.login = true;
				}
			});

		$scope.onShowVideo = function () {
			$video.activate();
		}
	}
}

