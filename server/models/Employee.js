const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Employee extends Model {}

Employee.init(
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
		salary: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		role_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'role',
				key: 'id',
			},
		},
		manager_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'manager',
				key: 'id',
			},
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
		modelName: 'employee',
	}
);

module.exports = Employee;
