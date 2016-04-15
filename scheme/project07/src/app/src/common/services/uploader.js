import angular from 'angular';

import 'angular-file-upload';

let errorMap = {
	'413 Request Entity Too Large': 'Error! The picture is too large'
};

export default angular.module('imigo.uploader', ['ng', 'angularFileUpload'])
	.factory('$uploaderFactory', ['FileUploader', function (FileUploader) {
		return function (config) {
			let fileUploader = new FileUploader(angular.extend(config, {
				autoUpload: true,
				alias: 'image',
				url: [config.url, '?_dc=', Date.now()].join('')
			}));

			fileUploader.onCompleteItem = function (fileItem, response, status) {
				let data = response.data;

				if (response.status === 'success') {
					console.debug('[$uploader][onCompleteItem]: status is', status, ', data is', data);

					config.onSuccessUpload && config.onSuccessUpload.call(fileUploader, data);
				} else {
					let parsedValue = response && /<title>(.+)<\/title>/.exec(response),
						errorText = response;

					if (parsedValue && parsedValue.length > 1) {
						errorText = parsedValue[1] || errorText;
						errorText = errorMap[errorText] || errorText;
					}

					console.debug('[$uploader][onFailUpload]: status is', status, ', text is', errorText);

					config.onFailUpload && config.onFailUpload.call(fileUploader, {
						status: status,
						text: errorText
					});
				}
			};
			return fileUploader;
		}
	}]);