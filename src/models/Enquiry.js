import { DataTypes } from "sequelize";
import { sequelizedbconnection } from "../services/sequelizedbcon.js";
const sequelize = sequelizedbconnection();

// const Enquiry = sequelize.define("enquiry1", {
//   enquiry_id: {
//     type: DataTypes.STRING(32),
//     primaryKey: true,
//     allowNull: true,
//   },
//   dealer_id: {
//     type: DataTypes.INTEGER(11),
//     allowNull: true,
//   },
//   dms_id: {
//     type: DataTypes.STRING(48),
//     allowNull: true,
//   },
//   branch_id: {
//     type: DataTypes.STRING(16),
//     allowNull: true,
//   },
//   enquiry_date: {
//     type: DataTypes.DATE,
//     allowNull: true,
//   },
//   name_prefix: {
//     type: DataTypes.STRING(8),
//     allowNull: true,
//   },
//   first_name: {
//     type: DataTypes.STRING(64),
//     allowNull: true,
//   },
//   last_name: {
//     type: DataTypes.STRING(32),
//     allowNull: true,
//   },
//   mother_name: {
//     type: DataTypes.STRING(64),
//     allowNull: true,
//   },
//   fathers_name: {
//     type: DataTypes.STRING(64),
//     allowNull: true,
//   },
//   mobile: {
//     type: DataTypes.STRING(24),
//     allowNull: true,
//   },
//   alternate_number: {
//     type: DataTypes.STRING(24),
//     allowNull: true,
//   },
//   date_of_birth: {
//     type: DataTypes.DATE,
//     allowNull: true,
//   },
//   gender: {
//     type: DataTypes.STRING(8),
//     allowNull: true,
//   },
//   pan_number: {
//     type: DataTypes.STRING(32),
//     allowNull: true,
//   },
//   aadhar_card: {
//     type: DataTypes.STRING(32),
//     allowNull: true,
//   },
//   email: {
//     type: DataTypes.STRING(32),
//     allowNull: true,
//   },
//   address: {
//     type: DataTypes.STRING(64),
//     allowNull: true,
//   },
//   address_second: {
//     type: DataTypes.STRING(32),
//     allowNull: true,
//   },
//   city: {
//     type: DataTypes.STRING(16),
//     allowNull: true,
//   },
//   state: {
//     type: DataTypes.STRING(16),
//     allowNull: true,
//   },
//   pincode: {
//     type: DataTypes.INTEGER(11),
//     allowNull: true,
//   },
//   model_id: {
//     type: DataTypes.STRING(16),
//     allowNull: true,
//   },
//   cardetail_id: {
//     type: DataTypes.STRING(16),
//     allowNull: true,
//   },
//   color_id: {
//     type: DataTypes.STRING(16),
//     allowNull: true,
//   },
//   bank_name: {
//     type: DataTypes.STRING(60),
//     allowNull: true,
//   },
//   bank_name2: {
//     type: DataTypes.STRING(60),
//     allowNull: true,
//   },
//   payment_mode: {
//     type: DataTypes.STRING(32),
//     allowNull: true,
//   },
//   booking_date: {
//     type: DataTypes.DATE,
//     allowNull: true,
//   },
//   booking_amt: {
//     type: DataTypes.DECIMAL(16, 0),
//     allowNull: true,
//   },
//   booking_receipt_no: {
//     type: DataTypes.STRING(32),
//     allowNull: true,
//   },
//   expected_delivery_date: {
//     type: DataTypes.DATE,
//     allowNull: true,
//   },
//   remarks: {
//     type: DataTypes.STRING(256),
//     allowNull: true,
//   },
//   created_by: {
//     type: DataTypes.STRING(32),
//     allowNull: true,
//   },
//   created_date: {  
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW, 
//   },
// }, {
//   tableName: "enquiry1",
//   timestamps: false, // If you don't have `createdAt` and `updatedAt` columns
// });


// const Enquiry = sequelize.define("enquiry1", {
//   enquiry_id: {
//     type: DataTypes.STRING(32),
//     primaryKey: true,
//     allowNull: false,
//   },
//   dealer_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   branch_id: {
//     type: DataTypes.STRING(16),
//     allowNull: false,
//   },
//   dms_id: {
//     type: DataTypes.STRING(24),
//     allowNull: true,
//   },
//   enquiry_date: {
//     type: DataTypes.DATEONLY,
//     allowNull: true,
//   },
//   name_prefix: {
//     type: DataTypes.STRING(32),
//     allowNull: false,
//   },
//   first_name: {
//     type: DataTypes.STRING(64),
//     allowNull: false,
//   },
//   last_name: {
//     type: DataTypes.STRING(32),
//     allowNull: false,
//   },
//   mobile: {
//     type: DataTypes.STRING(24),
//     allowNull: false,
//   },
//   alternate_number: {
//     type: DataTypes.STRING(24),
//     allowNull: false,
//   },
//   date_of_birth: {
//     type: DataTypes.DATEONLY,
//     allowNull: false,
//   },
//   gender: {
//     type: DataTypes.STRING(8),
//     allowNull: false,
//   },
//   pan_number: {
//     type: DataTypes.STRING(32),
//     allowNull: false,
//   },
//   aadhar_card: {
//     type: DataTypes.STRING(32),
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING(32),
//     allowNull: false,
//   },
//   address: {
//     type: DataTypes.STRING(64),
//     allowNull: false,
//   },
//   address_second: {
//     type: DataTypes.STRING(32),
//     allowNull: false,
//   },
//   city: {
//     type: DataTypes.STRING(16),
//     allowNull: false,
//   },
//   state: {
//     type: DataTypes.STRING(16),
//     allowNull: false,
//   },
//   pincode: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   model_id: {
//     type: DataTypes.STRING(16),
//     allowNull: false,
//   },
//   cardetail_id: {
//     type: DataTypes.STRING(16),
//     allowNull: false,
//   },
//   fuel_type: {
//     type: DataTypes.STRING(16),
//     allowNull: false,
//   },
//   color_id: {
//     type: DataTypes.STRING(16),
//     allowNull: false,
//   },
//   bank_name: {
//     type: DataTypes.STRING(60),
//     allowNull: false,
//   },
//   bank_name2: {
//     type: DataTypes.STRING(60),
//     allowNull: false,
//   },
//   payment_mode: {
//     type: DataTypes.STRING(16),
//     allowNull: false,
//   },
//   booking_date: {
//     type: DataTypes.DATEONLY,
//     allowNull: true,
//   },
//   booking_amt: {
//     type: DataTypes.DECIMAL(16, 0),
//     allowNull: false,
//   },
//   expected_delivery_date: {
//     type: DataTypes.DATEONLY,
//     allowNull: false,
//   },
//   enquiry_status: {
//     type: DataTypes.STRING(18),
//     allowNull: false,
//     defaultValue: "OPEN",
//   },
//   created_by: {
//     type: DataTypes.STRING(32),
//     allowNull: false,
//   },
//   created_date: {
//     type: DataTypes.DATEONLY,
//     allowNull: true,
//   },
//   last_update_date: {
//     type: DataTypes.DATEONLY,
//     allowNull: true,
//   },
//   source: {
//     type: DataTypes.STRING(24),
//     allowNull: false,
//   },
//   source_remark: {
//     type: DataTypes.STRING(48),
//     allowNull: false,
//   },
//   reminder_date: {
//     type: DataTypes.DATEONLY,
//     allowNull: true,
//   },
//   sales_manager_remark: {
//     type: DataTypes.STRING(108),
//     allowNull: false,
//   },
//   team_leader_remark: {
//     type: DataTypes.STRING(108),
//     allowNull: false,
//   },
//   user_created_date: {
//     type: DataTypes.DATEONLY,
//     allowNull: false,
//   },
//   user_created_by: {
//     type: DataTypes.STRING(16),
//     allowNull: false,
//   },
// }, {
//   tableName: "enquiry1",
//   timestamps: false,
// });

const Enquiry = sequelize.define("enquiry1", {
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
  enquiry_status: { type: DataTypes.STRING(18), allowNull: false, defaultValue: "OPEN" },
  created_by: { type: DataTypes.STRING(32), allowNull: false },
  created_date: { type: DataTypes.DATEONLY, allowNull: true }, // Allow NULL
  last_update_date: { type: DataTypes.DATEONLY, allowNull: true }, // Allow NULL
  source: { type: DataTypes.STRING(24), allowNull: true },
  source_remark: { type: DataTypes.STRING(48), allowNull: true },
  reminder_date: { type: DataTypes.DATEONLY, allowNull: true }, // Allow NULL
  sales_manager_remark: { type: DataTypes.STRING(108), allowNull: true }, // Allow NULL
  team_leader_remark: { type: DataTypes.STRING(108), allowNull: true }, // Allow NULL
  user_created_date: { type: DataTypes.DATEONLY, allowNull: true },
  user_created_by: { type: DataTypes.STRING(16), allowNull: true }
}, {
  tableName: "enquiry1",
  timestamps: false,
});





export default Enquiry;
