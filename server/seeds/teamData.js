const { Team } = require('../models');

const teamData = [
	{
		name: 'Legionnaires',
		// id: 1
		user_id: 1,
	},

	{
		name: 'American Bandits',
		// id: 2
		user_id: 1,
	},

	{
		name: 'MuleDev',
		// id: 3
		user_id: 1,
	},

	{
		name: 'Wixify',
		// id: 4
	},

	{
		name: 'DotNet',
		// id: 5
	},
];

const seedTeams = () => Team.bulkCreate(teamData);

module.exports = seedTeams;
