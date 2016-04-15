import angular from 'angular';
import 'angular-gettext';

import alertTemplate from '../../app/alert.tpl';

export default angular
	.module('imigo.alert', ['ng', 'gettext', 'app/alert.tpl.html'])
	.service('$alert', ['$rootScope', 'gettextCatalog', function ($rootScope, gettextCatalog) {

		let makeButtons = function () {
			return [{
				text: 'close',
				doAction: function () {
					delete $rootScope.alertDialog;
				}
			}];
		};

		let toErrorObject = function (error) {
			console.debug('[$alert][toErrorObject] error:', error);

			let text = 'Error',
				fields;

			if (error && error.data) {
				text = error.data.cls;
				fields = error.data.fields;

				switch (error.data.cls) {
					case 'LimitExceededError':
						switch (fields.type) {
							case 'max_slots':
								switch (fields.action) {
									case 'createAd':
										text = gettextCatalog.getString('You can not create a new ad because your slot limit is exceeded. Delete existing ads or complete other deals to free up some slots.');
										break;
									case 'makeOffer':
									case 'startDeal':
										text = gettextCatalog.getString('You can not make the deal because your slot limit is exceeded. Delete existing ads or complete other deals to free up some slots.');
										break;
								}
								break;

							case 'chat.messages':
								if (fields.reset_time) {
									text = gettextCatalog.getString('You can not send more than 1000 messages per day. The limit will reset in {{h}} h {{m}} m.', {
										h: fields.reset_time.h, m: fields.reset_time.m, s: fields.reset_time.s
									});
								} else {
									text = gettextCatalog.getString('You can not send more than 1000 messages per day. This limit resets every 24 hours, please come back later.');
								}
								break;

							case 'ad.publishInterval':
								text = gettextCatalog.getString('You have already created an ad in this category. You will be able to create another after {{h}} h {{m}} m', {
										h: fields.reset_time.h, m: fields.reset_time.m, s: fields.reset_time.s
								});
								break;

							case 'bank.purchase':
								text = gettextCatalog.getString('Woops! You can not attempt more than {{maximum}} payments per day. Please try again tomorrow.', {
										maximum: fields.maximum
								});
								break;
						}
						break;
					case 'NotEnoughMoney':
						text = gettextCatalog.getString("Woops! You don't have enough IMI. Please buy some IMI first.");
						break;
					case 'DealOfferExpired':
						text = gettextCatalog.getString('Woops! Deal offer has expired. Ask your partner to send you a new offer.');
						break;
					case 'DealConflict':
						text = gettextCatalog.getString('Woops! You can not make a deal, because you already have an active deal with this person in the {{category}} category.', {
							category: gettextCatalog.getString(fields.category)
						});
						break;
					case 'NoSuchAdvertisement':
						break;
					case 'InvalidAge':
					    switch (fields.type) {
					    	case 'under18':
					    		text = gettextCatalog.getString('Woops! You need to be 18 or older.');
					    		break;
					    }
						break;
					case 'InvalidRequest':
						break;
					case 'ValidationError':
						switch (fields.validator) {
							case 'maxLength':
								text = gettextCatalog.getString('Size limit is {{value}} characters.', {
									value: fields.validator_value
								});
								break;
							case 'minimum':
								text = gettextCatalog.getString('Minimum is {{value}}.', {
									value: fields.validator_value
								});
								break;
							case 'maximum':
								text = gettextCatalog.getString('Maximum is {{value}}.', {
									value: fields.validator_value
								});
								break;
						}
						break;
				}
			}

			return {
				text: text,
				type: 'error'
			};
		};

		this.activate = function (context) {
			if (context.type === 'info') {
				$rootScope.alertDialog = context;
			} else {
				$rootScope.alertDialog = toErrorObject(context);
			}
		};

		$rootScope.resetAlertDialogButtons = function () {
			$rootScope.alertDialogButtons = makeButtons();
		};

		$rootScope.resetAlertDialogButtons();
	}]);