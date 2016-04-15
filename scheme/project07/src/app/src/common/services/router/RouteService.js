export class RouteService {

	constructor($state) {
		this.$state = $state;
	}

	/**
	 * Get host name
	 *
	 * @private
	 * @returns {*}
	 */
	static getHostName() {
		var loc = location,
			origin = loc.origin;

		if (!origin) {
			// IE supporting
			origin = loc.protocol + "//" + loc.hostname + (loc.port ? ':' + loc.port : '');
		}
		return origin;
	}

	/**
	 * Is unprotected path
	 *
	 * @returns {boolean}
	 */
	static isUnprotectedPath() {
		let currentHash = location.hash,
			contains = false;

		['about', 'vendor', 'help', 'landing', 'error'].forEach(function (i) {
			contains |= currentHash.indexOf(i) > -1;
		});

		if (contains) {
			console.debug('[RouteService][unprotected path]: ', currentHash);
			return true;
		}
		return false;
	}

	/**
	 * Redirect to outer url
	 * @param url Outer url
	 */
	static redirect(url) {
		try {
			$Boot.gaEvent('User', 'Trying to sign on by ' + url.split('/')[1]);
		} catch (e) {
			console.log(e);
		}
		location.assign(RouteService.getHostName() + IMIGO.APP_API_PATH + url);
	}

	back(state, params) {
		if (history) {
			history.back();
		} else {
			this.redirect(state);
		}
	}

	/**
	 * Redirect to url
	 * @param url Url
	 * @param force Force
	 */
	redirect(url, force) {
		let currentUrl = this.$state.current.name;

		if (currentUrl !== url || force) {
			console.debug('[RouteService][redirect]: from ', currentUrl || '/', ' to ', url);
			this.$state.go(url);
		} else {
			console.debug('[RouteService][redirect]: the application has the same url ', url);
		}
	}

	/**
	 * Check state
	 * @param $state
	 */
	checkState($state) {
		let currentState = $state.current.name;

		console.debug('[RouteService][checkState]: state ', currentState);

		switch (currentState) {
			case '':
			case 'login':
			case 'registration':
				this.redirect('main');
		}
	}

	/**
	 * Logout
	 */
	logout() {
		this.clearSession();
	}

	/**
	 * Clear session
	 *
	 * @private
	 */
	clearSession() {
		let cookies = document.cookie.split(";");

		cookies.forEach(function (cookie) {
			let eqPos = cookie.indexOf("="),
				name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		});
	}
}