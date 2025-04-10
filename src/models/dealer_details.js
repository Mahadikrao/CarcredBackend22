import { DataTypes } from 'sequelize';
import { sequelizedbconnection } from '../services/sequelizedbcon.js';

const sequelize = sequelizedbconnection();
const DealerDetails = sequelize.define("dealer_details", {
  dealer_id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(42),
    allowNull: false,
  },
  prefix: {
    type: DataTypes.STRING(12),
    allowNull: false,
  },
  dealer_logo: {
    type: DataTypes.STRING(48),
    allowNull: false,
  },

  brand_id: {
    type: DataTypes.INTEGER(16),
    allowNull: false,
  },
  
  company_name: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  company_logo: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  dealer_payout_commision: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  created_by: {
    type: DataTypes.STRING(24),
    allowNull: false,
  },
  created_date: {
    type: DataTypes.DATEONLY, // Matches MySQL DATE type
    allowNull: false,
  },
}, {
  tableName: "dealer_details", // Actual table name in MySQL
  timestamps: false, // Prevents Sequelize from adding createdAt and updatedAt columns
});

export default DealerDetails;
