const sequelize = require('../config/connection');
const seedUsers = require('./userData;');
const seedTeams = require('./teamData');
const seedRoles = require('./roleData');
const seedManagers = require('./managerData');
const seedEmployees = require('./employeeData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedTeams();

  await seedManagers();

  await seedRoles();

  await seedEmployees();

  process.exit(0);
};

seedAll();
