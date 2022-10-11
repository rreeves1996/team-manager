const { Manager } = require('../models');

const managerData = [
  //* Team 1 Managers

  {
    name: 'Benjamin Brewer',
    salary: 250000,
    team_id: 1,
    // id: 1
  },

  {
    name: 'Denzel Rodrigues',
    salary: 400000,
    team_id: 1,
    // id: 2
  },

  //* Team 2 Managers

  {
    name: 'Tonya Garner',
    salary: 300000,
    team_id: 2,
    // id: 3
  },

  {
    name: 'Selin Rosario',
    salary: 470000,
    team_id: 2,
    // id: 4
  },

  //* Team 3 Managers

  {
    name: 'Caitlyn Sparrow',
    salary: 680000,
    team_id: 3,
    // id: 5
  },

  {
    name: 'Mateusz Fuller',
    salary: 290000,
    team_id: 3,
    // id: 6
  },

  //* Team 4 Managers

  {
    name: 'Oriana Briggs',
    salary: 430000,
    team_id: 4,
    // id: 7
  },

  {
    name: 'Zackery Wu',
    salary: 618000,
    team_id: 4,
    // id: 8
  },

  //* Team 5 Managers

  {
    name: 'Hector Pham',
    salary: 830000,
    team_id: 5,
    // id: 9
  },

  {
    name: 'Anisha Gough',
    salary: 460000,
    team_id: 5,
    // id: 10
  },
];

const seedManagers = () => Manager.bulkCreate(managerData);

module.exports = seedManagers;
