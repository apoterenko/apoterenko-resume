export class RouteDispatcher {

	static dispatch(response, defer) {
		console.debug('[RouteDispatcher][dispatch]: ', response, ', response status: ', response && response.status || '[none]');

		if (angular.isUndefined(response.status)) {
			console.warn('[RouteDispatcher][dispatch]: empty response or status');
			return;
		}

		switch (response.status) {
			case 400:
			case 401:
				defer.reject('login');
				break;
			case 200:
				if (response.data.data == null) {
					defer.reject('registration');
				} else {
					defer.resolve(response.data.data);
				}
		}
	}
}