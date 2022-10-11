const { Role } = require('../models');

const roleData = [
  //* Team 1 Roles
  {
    title: '',
    salary: 0,
    team_id: 0,
  },

  {
    title: '',
    salary: 0,
    team_id: 0,
  },

  {
    title: '',
    salary: 0,
    team_id: 0,
  },

  {
    title: '',
    salary: 0,
    team_id: 0,
  },

  {
    title: '',
    salary: 0,
    team_id: 0,
  },
];

const seedRoles = () => Role.bulkCreate(roleData);

module.exports = seedRoles;
