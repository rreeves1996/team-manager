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
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        manager_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        manager_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'manager',
                key: 'id'
            }
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