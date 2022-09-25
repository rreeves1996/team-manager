const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

class Team extends Model {};

Team.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        team_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        manager_name: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'team'
    }
);

module.exports = Team;