import { DataTypes } from "sequelize";
import { sequelizedbconnection } from "../services/sequelizedbcon.js";

const sequelize = sequelizedbconnection();

const predifine_remark = sequelize.define(
  "predifine_remark",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    remark: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    created_by: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    created_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    modified_by: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    modified_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "predifine_remark", // Specify the table name if it's different from the model name
    timestamps: false, // Disable automatic `createdAt` and `updatedAt` columns
  }
);

export default predifine_remark;
