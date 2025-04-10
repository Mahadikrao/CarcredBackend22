import { DataTypes } from "sequelize";
import { sequelizedbconnection } from "../services/sequelizedbcon.js";

const sequelize = sequelizedbconnection();

const CarModel = sequelize.define(
  "car_model",
  {
    model_id: {
      type: DataTypes.STRING(16),
      primaryKey: true,
      allowNull: false,
    },
    brand_id: {
      type: DataTypes.INTEGER(16),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    pdf_image: {
      type: DataTypes.STRING(108),
      allowNull: false,
    },
    pdf_footer: {
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
  },
  {
    tableName: "car_model",
    timestamps: false,
  }
);

export default CarModel;
