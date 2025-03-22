import { DataTypes } from "sequelize";
import { sequelizedbconnection } from "../services/sequelizedbcon.js";

const sequelize = sequelizedbconnection();
const Branch = sequelize.define("branch", {
  branch_id: {
    type: DataTypes.STRING(24),
    primaryKey: true,
    allowNull: false,
  },
  dealer_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  zone_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  branch_name: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(24),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  contact_number: {
    type: DataTypes.STRING(14),
    allowNull: false,
  },
  contact_number_alt: {
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  website: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  pincode: {
    type: DataTypes.STRING(8),
    allowNull: false,
  },
  dsa_code: {
    type: DataTypes.STRING(24),
    allowNull: false,
  },
  gst_number: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  cin_number: {
    type: DataTypes.STRING(48),
    allowNull: false,
  },
  account_name: {
    type: DataTypes.STRING(48),
    allowNull: false,
  },
  account_number: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  bank_name: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  ifsc_code: {
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  created_by: {
    type: DataTypes.STRING(12),
    allowNull: false,
  },
  created_date: {
    type: DataTypes.DATEONLY, // Matches MySQL DATE type
    allowNull: true, // Can be NULL
  },
  pipsingleformat: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  pipformat: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  quotaionpdfformatewithwatermark: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  quotaionpdfformate: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  bankpdformate: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  branch_seal: {
    type: DataTypes.STRING(48),
    allowNull: false,
  },
}, {
  tableName: "branch", // Actual table name in MySQL
  timestamps: false, // Prevents Sequelize from adding createdAt and updatedAt columns
});

export default Branch;
