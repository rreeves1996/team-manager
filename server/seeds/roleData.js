const { Role } = require('../models');

const roleData = [
  //* Team 1 Roles

  {
    title: 'Senior Executive Coordinator',
    salary: 175000,
    team_id: 1,
    // id: 1
  },
  {
    title: 'Party Planning Commitee',
    salary: 85000,
    team_id: 1,
    // id: 2
  },
  {
    title: 'Vagrant',
    salary: 60000,
    team_id: 1,
    // id: 3
  },

  //* Team 2 Roles

  {
    title: 'Leader of The Free World',
    salary: 100000000,
    team_id: 2,
    // id: 4
  },
  {
    title: 'Professional Liason',
    salary: 79000,
    team_id: 2,
    // id: 5
  },
  {
    title: 'Not A Doctor',
    salary: 94000,
    team_id: 2,
    // id: 6
  },

  //* Team 3 Roles

  {
    title: 'Dude Who Hangs Out',
    salary: 80000,
    team_id: 3,
    // id: 7
  },
  {
    title: 'OnlyFans Coordinator',
    salary: 65000,
    team_id: 3,
    // id: 8
  },
  {
    title: "Guy Who Still Says 'YOLO'",
    salary: 118000,
    team_id: 3,
    // id: 9
  },

  //* Team 4 Roles

  {
    title: 'Legally Employed',
    salary: 115000,
    team_id: 4,
    // id: 10
  },
  {
    title: 'Illegally Employed',
    salary: 115000,
    team_id: 4,
    // id: 11
  },
  {
    title: 'Not Employed At All',
    salary: 200000,
    team_id: 4,
    // id: 12
  },

  //* Team 5 Roles

  {
    title: 'Groundhog Wrangler',
    salary: 90000,
    team_id: 5,
    // id: 13
  },
  {
    title: 'Moon-Truther',
    salary: 108000,
    team_id: 5,
    // id: 14
  },
  {
    title: 'Not Even a Real Guy',
    salary: 76000,
    team_id: 5,
    // id: 15
  },
];

const seedRoles = () => Role.bulkCreate(roleData);

module.exports = seedRoles;
