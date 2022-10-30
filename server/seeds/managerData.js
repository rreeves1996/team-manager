const { Manager } = require('../models');

const managerData = [
  //* Team 1 Managers

  {
    name: 'Benjamin Brewer',
    salary: 250000,
    team_id: 1,
    is_lead: true,
    phone: '4253489383',
    email: 'ben@email.com',
    time: 7
    // id: 1
  },

  {
    name: 'Denzel Rodrigues',
    salary: 400000,
    team_id: 1,
    phone: '4253423583',
    email: 'den@email.com',
    time: 7
    // id: 2
  },

  //* Team 2 Managers

  {
    name: 'Tonya Garner',
    salary: 300000,
    team_id: 2,
    is_lead: true,
    phone: '4252343583',
    email: 'tonya@email.com',
    time: 5
    // id: 3
  },

  {
    name: 'Selin Rosario',
    salary: 470000,
    team_id: 2,
    phone: '4254324354',
    email: 'selin@email.com',
    time: 7
    // id: 4
  },

  //* Team 3 Managers

  {
    name: 'Caitlyn Sparrow',
    salary: 680000,
    team_id: 3,
    phone: '4258764574',
    email: 'caitlyn@email.com',
    time: 8
    // id: 5
  },

  {
    name: 'Mateusz Fuller',
    salary: 290000,
    team_id: 3,
    is_lead: true,
    phone: '2069483954',
    email: 'mateusz@email.com',
    time: 7
    // id: 6
  },

  //* Team 4 Managers

  {
    name: 'Oriana Briggs',
    salary: 430000,
    team_id: 4,
    is_lead: true,
    phone: '4253549997',
    email: 'oriana@email.com',
    time: 8
    // id: 7
  },

  {
    name: 'Zackery Wu',
    salary: 618000,
    team_id: 4,
    phone: '2774563496',
    email: 'zack@email.com',
    time: 8
    // id: 8
  },

  //* Team 5 Managers

  {
    name: 'Hector Pham',
    salary: 830000,
    team_id: 5,
    is_lead: true,
    phone: '2775554492',
    email: 'hector@email.com',
    time: 9
    // id: 9
  },

  {
    name: 'Anisha Gough',
    salary: 460000,
    team_id: 5,
    phone: '4252297595',
    email: 'anisha@email.com',
    time: 3
    // id: 10
  },
];

const seedManagers = () => Manager.bulkCreate(managerData);

module.exports = seedManagers;
