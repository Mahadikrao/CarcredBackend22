import { DataTypes } from "sequelize";
import { sequelizedbconnection } from "../services/sequelizedbcon.js";

const sequelize = sequelizedbconnection();

const car_color = sequelize.define("car_color", {
    color_id: {
      type: DataTypes.STRING(16),
      primaryKey: true,
      allowNull: false,
    },
    dealer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    model_id: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    color_name: {
      type: DataTypes.STRING(48),
      allowNull: false,
    },
    color_code: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    model_image: {
      type: DataTypes.STRING(108),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(24),
      allowNull: false,
      defaultValue: "ENABLE",
    },
    created_by: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    created_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }, {
    tableName: "car_color",
    timestamps: false, // Set to true if you want `createdAt` and `updatedAt`
  });
  
  export default car_color;