const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

class Team extends Model {};

Team.init(
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
    createdAt: {
      type: DataTypes.DATE,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'user',
          key: 'id'
      }
    },
    // memberCount: {
    //   type: DataTypes.VIRTUAL,
    //   get() {
    //     return this.employee.length;
    //   },
    // },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'team',
  }
);

module.exports = Team;