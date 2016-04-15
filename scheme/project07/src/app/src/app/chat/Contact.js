export class Contact {
	id;
	name;

	constructor(id, name) {
		this.id = id;
		this.name = name;
	}

	getName() {
		return this.name;
	}

	toUrl() {
		var image = this.id || 'default_userpic';
		if (image == 'system') { // FIXME
			image = 'default_userpic';
		}
		return $Boot['to115Path'](image);
	}
}