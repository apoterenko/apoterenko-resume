export class BankPaymentProcessor {

	constructor ($user, $api) {
		this.$user = $user;
		this.$api = $api;
	}

	doApplyRecurring() {
		console.log('apply recurring', this.$user, this.$api);

	}

	doApplyWeek() {
		console.log('apply week', this.$user, this.$api);
	}

	doApplyMonth() {
		console.log('apply month', this.$user, this.$api);
	}

	doApplyYear() {
		console.log('apply year', this.$user, this.$api);
	}
}