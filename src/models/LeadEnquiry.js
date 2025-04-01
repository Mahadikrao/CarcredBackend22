import { DataTypes } from "sequelize";
import { sequelizedbconnection } from "../services/sequelizedbcon.js";
const sequelize = sequelizedbconnection();

const LeadEnquiry = sequelize.define("enquiry", {
  enquiry_id: { type: DataTypes.STRING(32), primaryKey: true, allowNull: false },
  dealer_id: { type: DataTypes.INTEGER, allowNull: true },
  branch_id: { type: DataTypes.STRING(16), allowNull: true },
  dms_id: { type: DataTypes.STRING(24), allowNull: true }, // Allow NULL
  enquiry_date: { type: DataTypes.DATEONLY, allowNull: true }, // Allow NULL
  name_prefix: { type: DataTypes.STRING(32), allowNull: true },
  first_name: { type: DataTypes.STRING(64), allowNull: false },
  last_name: { type: DataTypes.STRING(32), allowNull: false },
  mobile: { type: DataTypes.STRING(24), allowNull: false },
  alternate_number: { type: DataTypes.STRING(24), allowNull: true }, // Allow NULL
  date_of_birth: { type: DataTypes.DATEONLY, allowNull: true }, // Allow NULL
  gender: { type: DataTypes.STRING(8), allowNull: true },
  pan_number: { type: DataTypes.STRING(32), allowNull: true },
  aadhar_card: { type: DataTypes.STRING(32), allowNull: true },
  email: { type: DataTypes.STRING(32), allowNull: true },
  address: { type: DataTypes.STRING(64), allowNull: true },
  address_second: { type: DataTypes.STRING(32), allowNull: true }, // Allow NULL
  city: { type: DataTypes.STRING(16), allowNull: false },
  state: { type: DataTypes.STRING(16), allowNull: false },
  pincode: { type: DataTypes.INTEGER, allowNull: true },
  model_id: { type: DataTypes.STRING(16), allowNull: false },
  cardetail_id: { type: DataTypes.STRING(16), allowNull: true },
  fuel_type: { type: DataTypes.STRING(16), allowNull: true }, // Allow NULL
  color_id: { type: DataTypes.STRING(16), allowNull: true },
  bank_name: { type: DataTypes.STRING(60), allowNull: true },
  bank_name2: { type: DataTypes.STRING(60), allowNull: true }, // Allow NULL
  payment_mode: { type: DataTypes.STRING(16), allowNull: true , defaultValue: "Cash"},
  booking_date: { type: DataTypes.DATEONLY, allowNull: true }, // Allow NULL
  booking_amt: { type: DataTypes.DECIMAL(16, 0), allowNull: true },
  expected_delivery_date: { type: DataTypes.DATEONLY, allowNull: true },

  created_by: { type: DataTypes.STRING(32), allowNull: false },
  created_date: { type: DataTypes.DATEONLY, allowNull: true }, // Allow NULL
  last_update_date: { type: DataTypes.DATEONLY, allowNull: true }, // Allow NULL
  // source: { type: DataTypes.STRING(24), allowNull: true },
  source_remark: { type: DataTypes.STRING(48), allowNull: true },
  // reminder_date: { type: DataTypes.DATEONLY, allowNull: true }, // Allow NULL
  sales_manager_remark: { type: DataTypes.STRING(108), allowNull: true }, // Allow NULL
  team_leader_remark: { type: DataTypes.STRING(108), allowNull: true }, // Allow NULL
  user_created_date: { type: DataTypes.DATEONLY, allowNull: true },
  user_created_by: { type: DataTypes.STRING(16), allowNull: true }
}, {
  tableName: "enquiry",
  timestamps: false,
});


export default LeadEnquiry;
