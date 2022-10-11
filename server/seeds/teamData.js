const { Team } = require('../models');

const teamData = [
  {
    name: '',
  },

  {
    name: '',
  },

  {
    name: '',
  },

  {
    name: '',
  },

  {
    name: '',
  },
];

const seedTeams = () => Team.bulkCreate(teamData);

module.exports = seedTeams;
