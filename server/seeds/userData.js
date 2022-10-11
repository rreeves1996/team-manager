const { User } = require('../models');

const userData = [
  {
    username: 'Ryan',
    email: 'ryan@email.com',
    password: 'password',
    // id: 1
  },

  {
    username: 'Isaac',
    email: 'isaac@email.com',
    password: 'password',
    // id: 2
  },

  //; ('-')7

  {
    username: 'Matthew',
    email: 'matthew@email.com',
    password: 'password',
    // id: 3
  },

  {
    username: 'Adam',
    email: 'adam@email.com',
    password: 'password',
    // id: 4
  },

  //; ('-')7

  {
    username: 'Guy',
    email: 'guy@email.com',
    password: 'password',
    // id: 5
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
