export class LogoutController {

	/*@ngInject*/
	constructor($api, $chat, $user) {
		console.log('controller:', 'logoutCtrl');
		$chat.cancel();

		var onLogout = function(response) {
			console.log('logout response:', response);
			$user.getUser(true);
		};
		$api.user.logout().then(
			onLogout,
			onLogout
		);
	}
}