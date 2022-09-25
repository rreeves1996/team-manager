const User = require('./User');
const Team = require('./Team');
const Role = require('./Role');
const Manager = require('./Manager');
const Employee = require('./Employee');

User.hasMany(Team, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Team.belongsTo(User, {
    foreignKey: 'user_id'
});

Team.hasMany(Manager, {
    foreignKey: 'manager_id',
    onDelete: 'CASCADE'
});

Team.hasMany(Employee, {
    foreignKey: 'employee_id',
    onDelete: 'CASCADE'
});

Team.hasMany(Role, {
    foreignKey: 'role_id',
    onDelete: 'CASCADE'
});

Manager.belongsTo(Team, {
    foreignKey: 'team_id'
});

Manager.hasMany(Employee, {
    foreignKey: 'employee_id',
    onDelete: 'CASCADE'
});

Role.belongsTo(Team, {
    foreignKey: 'team_id'
});

Role.belongsTo(Employee, {
    foreignKey: 'employee_id'
});

Employee.belongsTo(Team, {
    foreignKey: 'team_id'
});

Employee.belongsTo(Manager, {
    foreignKey: 'manager_id'
});




module.exports = { User, Team, Employee, Role, Manager };