const User = require('./User');
const Team = require('./Team');
const Employee = require('./Employee');

User.hasMany(Team, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Team.belongsTo(User, {
    foreignKey: 'user_id'
});

Employee.belongsTo(Team, {
    foreignKey: 'team_id'
});

Team.hasMany(Employee, {
    foreignKey: 'team_id',
    onDelete: 'CASCADE'
});
module.exports = { User, Team, Employee };