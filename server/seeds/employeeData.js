const { Employee } = require('../models');

const employeeData = [
  //* Team 1 Employees
  {
    name: '',
    role_id: 0,
    team_id: 0,
    manager_id: 0,
  },
  {
    name: '',
    role_id: 0,
    team_id: 0,
    manager_id: 0,
  },
  {
    name: '',
    role_id: 0,
    team_id: 0,
    manager_id: 0,
  },
  {
    name: '',
    role_id: 0,
    team_id: 0,
    manager_id: 0,
  },
  {
    name: '',
    role_id: 0,
    team_id: 0,
    manager_id: 0,
  },
];

const seedEmployees = () => Employee.bulkCreate(employeeData);

module.exports = seedEmployees;
