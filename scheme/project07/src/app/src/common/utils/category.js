var typeMap = {
	friendship: 'friends',
	professional: 'work'
};

var skillMap = {
	friendship: ['init', 'intel', 'humor'],
	romance: ['init', 'intel', 'sexual'],
	professional: ['proff' /* FIXME prof */, 'clarity', 'perf']
};

var skillNames = {
	init: 'initiative',
	intel: 'intelligence',
	sexual: 'sex appeal',
	proff: 'professionalism', // FIXME prof
	clarity: 'charisma',
	perf: 'performance'
};

export default {
	toType: function(category) {
		return typeMap[category] || category;
	},

	fromType: function(type) {
		for (var category in typeMap) {
			if (typeMap[category] == type) {
				return category;
			}
		}
		return type;
	},

	skills: function(type) {
		return (skillMap[this.fromType(type)] || []).slice();
	},

	skillName: function(skill) {
		return skillNames[skill] || skill;
	}
}