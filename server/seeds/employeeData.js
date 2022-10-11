const { Employee } = require('../models');

const employeeData = [
  //* Team 1 Employees

  {
    name: "Lynden O'Reilly",
    role_id: 1,
    team_id: 1,
    manager_id: 1,
    // id: 1
  },
  {
    name: 'Nuha Hogan',
    role_id: 2,
    team_id: 1,
    manager_id: 2,
    // id: 2
  },
  {
    name: 'Abdur Muir',
    role_id: 2,
    team_id: 1,
    manager_id: 2,
    // id: 3
  },
  {
    name: 'Aryaan Stewart',
    role_id: 1,
    team_id: 1,
    manager_id: 1,
    // id: 4
  },
  {
    name: 'Sara Pierce',
    role_id: 3,
    team_id: 1,
    manager_id: 1,
    // id: 5
  },

  //* Team 2 Employees

  {
    name: 'Harvey-Lee David',
    role_id: 6,
    team_id: 2,
    manager_id: 3,
    // id: 6
  },
  {
    name: 'Glenda Turner',
    role_id: 5,
    team_id: 2,
    manager_id: 3,
    // id: 7
  },
  {
    name: 'Samiyah Owens',
    role_id: 5,
    team_id: 2,
    manager_id: 3,
    // id: 8
  },
  {
    name: 'Farrah Cabrera',
    role_id: 4,
    team_id: 2,
    manager_id: 4,
    // id: 9
  },
  {
    name: 'Elysia Rodgers',
    role_id: 4,
    team_id: 2,
    manager_id: 4,
    // id: 10
  },

  //* Team 3 Employees

  {
    name: 'Zaki Murray',
    role_id: 7,
    team_id: 3,
    manager_id: 5,
    // id: 11
  },
  {
    name: 'Javan Bloom',
    role_id: 9,
    team_id: 3,
    manager_id: 6,
    // id: 12
  },
  {
    name: 'Kieron Greaves',
    role_id: 8,
    team_id: 3,
    manager_id: 5,
    // id: 13
  },
  {
    name: 'Benn Dickson',
    role_id: 7,
    team_id: 3,
    manager_id: 5,
    // id: 14
  },
  {
    name: 'Gideon Garrett',
    role_id: 9,
    team_id: 3,
    manager_id: 6,
    // id: 15
  },

  //* Team 4 Employees

  {
    name: 'Rhiannan Mccormack',
    role_id: 12,
    team_id: 4,
    manager_id: 7,
    // id: 16
  },
  {
    name: 'Simeon Mcintosh',
    role_id: 12,
    team_id: 4,
    manager_id: 7,
    // id: 17
  },
  {
    name: 'Andrea Smyth',
    role_id: 11,
    team_id: 4,
    manager_id: 8,
    // id: 18
  },
  {
    name: 'Lorena Galindo',
    role_id: 11,
    team_id: 4,
    manager_id: 8,
    // id: 19
  },
  {
    name: 'Ivan Mccaffrey',
    role_id: 10,
    team_id: 4,
    manager_id: 7,
    // id: 20
  },

  //* Team 5 Employees

  {
    name: 'Maizie Bannister',
    role_id: 14,
    team_id: 5,
    manager_id: 9,
    // id: 21
  },
  {
    name: 'Nayla Kaiser',
    role_id: 13,
    team_id: 5,
    manager_id: 1,
    // id: 22
  },
  {
    name: 'Eleri Lang',
    role_id: 14,
    team_id: 5,
    manager_id: 10,
    // id: 23
  },
  {
    name: 'Olaf Vinson',
    role_id: 15,
    team_id: 5,
    manager_id: 9,
    // id: 24
  },
  {
    name: 'Borys Kaufman',
    role_id: 13,
    team_id: 5,
    manager_id: 10,
    // id: 25
  },
];

const seedEmployees = () => Employee.bulkCreate(employeeData);

module.exports = seedEmployees;
