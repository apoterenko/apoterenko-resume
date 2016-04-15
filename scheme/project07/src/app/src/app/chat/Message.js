export class Message {
	value;

	// 0 - cancel
	// 1 - approve
	// 2 - waiting
	type;

	constructor(value, type) {
		this.value = value;
		this.type = type;
	}

	setValues(values) {
		var me = this;
		$.each(values, function (key, value) {
			me[key] = value;
		});
		return me;
	}

	getValue() {
		return this.value;
	}

	getType() {
		return this.type;
	}

	inProgress() {
		return this.type === 2;
	}

	getTimeLeft() {
		// Localized & formatted
		return this.inProgress() ? 'Предложение действительно еще 26 сек.' : '';
	}
}