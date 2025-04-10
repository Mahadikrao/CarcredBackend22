import { DataTypes } from "sequelize";
import { sequelizedbconnection } from "../services/sequelizedbcon.js";


const sequelize = sequelizedbconnection();

const Brand = sequelize.define("car_brand", {
    brand_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    brand_name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      collate: 'utf8mb4_general_ci',
    },
    brand_logo: {
      type: DataTypes.TEXT,
      allowNull: false,
      collate: 'utf8mb4_general_ci',
    },
    created_by: {
      type: DataTypes.STRING(16),
      allowNull: false,
      collate: 'utf8mb4_general_ci',
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    // Model options
    tableName: 'car_brand',
    timestamps: false, // Since you don't have created_at or updated_at columns
  });
  
  export default  Brand; 