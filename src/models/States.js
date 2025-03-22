import {DataTypes } from 'sequelize';
import { sequelizedbconnection } from '../services/sequelizedbcon.js';
const sequelize = sequelizedbconnection();

const States = sequelize.define(
  "States",
  {
    states_id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
    },
    states_name: {
      type: DataTypes.STRING(48),
      allowNull: false,
    },
    created_by: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    created_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "states_table", // Replace with the actual table name
    timestamps: false, // Disable createdAt and updatedAt
  }
);

export default States;
