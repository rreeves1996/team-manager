const { Manager } = require('../models');

const managerData = [
  //* Team 1 Managers
  {
    name: '',
    salary: 0,
    team_id: 0,
  },

  {
    name: '',
    salary: 0,
    team_id: 0,
  },

  {
    name: '',
    salary: 0,
    team_id: 0,
  },

  {
    name: '',
    salary: 0,
    team_id: 0,
  },

  {
    name: '',
    salary: 0,
    team_id: 0,
  },
];

const seedManagers = () => Manager.bulkCreate(managerData);

module.exports = seedManagers;
