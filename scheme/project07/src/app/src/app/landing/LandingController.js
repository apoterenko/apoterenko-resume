export class LandingController {

	/*@ngInject*/
	constructor($scope, $stateParams, $state, $video) {
		console.debug('[$landingCtrl] $stateParams:', $stateParams);

		var client_types = ['client', 'customer'];

		if ($stateParams.type == 'randomClient') {
			var idx = Math.floor(Math.random()*2);
			$state.go('landing', {type: client_types[idx]});
		} else {
			$scope[$stateParams.type] = true;
		}

		$scope.onShowVideo = function () {
			$video.activate();
		};
	}
}
