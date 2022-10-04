const User = require('./User');
const Team = require('./Team');
const Role = require('./Role');
const Manager = require('./Manager');
const Employee = require('./Employee');

// User Relationships
User.hasMany(Team, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Team Relationships
Team.belongsTo(User);

Team.hasMany(Manager, {
  foreignKey: 'team_id',
  onDelete: 'CASCADE',
});

Team.hasMany(Employee, {
  foreignKey: 'team_id',
  onDelete: 'CASCADE',
});

Team.hasMany(Role, {
  foreignKey: 'team_id',
  onDelete: 'CASCADE',
});

// Manager Relationships
Manager.belongsTo(Team);

Manager.hasMany(Employee, {
  foreignKey: 'manager_id',
  onDelete: 'CASCADE',
});

// Employee Relationships
Employee.belongsTo(Team);

Employee.belongsTo(Manager);

Employee.belongsTo(Role);

// Role Relationships
Role.hasMany(Employee, {
  foreignKey: 'role_id',
});

Role.belongsTo(Team);


module.exports = { User, Team, Employee, Role, Manager };