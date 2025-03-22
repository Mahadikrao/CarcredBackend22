import { DataTypes } from 'sequelize';
import { sequelizedbconnection } from '../services/sequelizedbcon.js';

const sequelize = sequelizedbconnection();

const UserWorkLocation = sequelize.define(
  "UserWorkLocation",
  {
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    user_role: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    location_id: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    created_by: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    created_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "user_work_location",
    timestamps: false, // Disable createdAt and updatedAt
  }
);

export default UserWorkLocation;