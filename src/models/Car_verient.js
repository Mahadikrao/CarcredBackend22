import { DataTypes } from "sequelize";
import { sequelizedbconnection } from "../services/sequelizedbcon.js";

const sequelize = sequelizedbconnection();

const car_detail = sequelize.define("car_detail", {
  detail_id: {
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
  fuel_type: {
    type: DataTypes.STRING(24),
    allowNull: false,
  },
  transmission_type: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  varient: {
    type: DataTypes.STRING(54),
    allowNull: false,
  },
  ex_showroom_price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  registration_price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  essential_kit: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  insurance: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  insurance_addon: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  add_on_policy: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  tcs: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  handling: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  fast_tag: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  on_road_price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  vas: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  extended_warranty: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  amc: {
    type: DataTypes.DOUBLE(10, 0),
    allowNull: false,
  },
  delivery_charge: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  installation_charge: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(40),
    allowNull: false,
    defaultValue: "ENABLED",
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
  tableName: "car_detail",
  timestamps: false, // Disable automatic timestamps
});

export default car_detail;
