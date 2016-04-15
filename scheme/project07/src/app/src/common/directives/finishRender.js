export default function () {
	return {
		restrict: 'A',
		link: function (scope) {
			if (scope.$last === true) {
				// TODO remove set timeout
				setTimeout(function () {
					scope.$emit('finishrender');
				});
			}
		}
	}
}