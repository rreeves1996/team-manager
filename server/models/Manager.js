const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Manager extends Model {}

Manager.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		is_lead: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				isEmail: true,
			},
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		time: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		salary: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		team_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'team',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'manager',
	}
);

module.exports = Manager;
