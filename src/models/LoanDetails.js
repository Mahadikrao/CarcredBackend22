import { DataTypes } from "sequelize";
import { sequelizedbconnection } from "../services/sequelizedbcon.js";

// Establish the connection to the database
const sequelize = sequelizedbconnection();

// Define the LoanDetails model
const LoanDetails = sequelize.define('loan_detail', {
  loan_id: {
    type: DataTypes.STRING(32),
    allowNull: false,
    primaryKey: true,
  },
  dealer_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  branch_id: {
    type: DataTypes.STRING(16),
    allowNull: true,
  },
  quotaion_Id: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  enquiry_id: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  booking_id: {
    type: DataTypes.STRING(36),
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE, // Use `DataTypes.DATE` for a timestamp field
    allowNull: true,
    defaultValue: DataTypes.NOW, 
  },
  payment_method: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  mobile: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  preferred_bank: {
    type: DataTypes.STRING(60),
    allowNull: true,
  },
  emi_status: {
    type: DataTypes.STRING(16),
    allowNull: true,
  },
  no_of_emi: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  emi_amount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  emi_bank: {
    type: DataTypes.STRING(16),
    allowNull: true,
  },
  occupation: {
    type: DataTypes.STRING(16),
    allowNull: true,
  },
  ownertype: {
    type: DataTypes.STRING(24),
    allowNull: true,
  },
  organization_name: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  tenure: {
    type: DataTypes.STRING(8),
    allowNull: true,
  },
  operative_bank: {
    type: DataTypes.STRING(60),
    allowNull: true,
  },
  annual_income: {
    type: DataTypes.DECIMAL(10, 0),
    allowNull: true,
  },
  gross_income: {
    type: DataTypes.DECIMAL(10, 0),
    allowNull: true,
  },
  net_income: {
    type: DataTypes.DECIMAL(10, 0),
    allowNull: true,
  },
  credit_score: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  photo_passport: {
    type: DataTypes.STRING(48),
    allowNull: true,
  },
  aadhaar_image: {
    type: DataTypes.STRING(48),
    allowNull: true,
  },
  pancard_image: {
    type: DataTypes.STRING(48),
    allowNull: true,
  },
  address_proof: {
    type: DataTypes.STRING(48),
    allowNull: true,
  },
  statement_image: {
    type: DataTypes.STRING(48),
    allowNull: true,
  },
  it_return_image: {
    type: DataTypes.STRING(48),
    allowNull: true,
  },
  loan_statement: {
    type: DataTypes.STRING(48),
    allowNull: true,
  },
  form_16_image: {
    type: DataTypes.STRING(48),
    allowNull: true,
  },
  salary_slip: {
    type: DataTypes.STRING(48),
    allowNull: true,
  },
  audit_image: {
    type: DataTypes.STRING(48),
    allowNull: true,
  },
  loan_amount: {
    type: DataTypes.DECIMAL(10, 0),
    allowNull: true,
  },
  down_payment_amount: {
    type: DataTypes.DECIMAL(10, 0),
    allowNull: true,
  },
  loan_bank_name: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  bank_loan_amount: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  net_disbursement_amount: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  loan_rate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  loan_tenure: {
    type: DataTypes.DECIMAL(10, 0),
    allowNull: true,
  },
  loan_emi: {
    type: DataTypes.DECIMAL(10, 0),
    allowNull: true,
  },
  loan_interest_amount: {
    type: DataTypes.DECIMAL(10, 0),
    allowNull: true,
  },
  rate_change: {
    type: DataTypes.STRING(12),
    allowNull: true,
  },
  estimate_bank_loan: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  estimate_lone_tenure: {
    type: DataTypes.DECIMAL(10, 0),
    allowNull: true,
  },
  estimated_lone_rate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  estimate_emi: {
    type: DataTypes.DECIMAL(10, 0),
    allowNull:  true,
  },
  estimate_interest: {
    type: DataTypes.DECIMAL(10, 0),
    allowNull: true,
  },
  bank_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  dsa_code: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  bank_interest_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  processing_fees: {
    type: DataTypes.DECIMAL(10, 0),
    allowNull: true,
  },
  loan_status: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  loan_proposed_by: {
    type: DataTypes.STRING(16),
    allowNull: true,
    defaultValue: 'InHouse',
  },
  user_status: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  sales_remark: {
    type: DataTypes.STRING(108),
    allowNull: true,
  },
  team_leader_remark: {
    type: DataTypes.STRING(108),
    allowNull: true,
  },
  sales_manager_remark: {
    type: DataTypes.STRING(108),
    allowNull: true,
  },
  loan_remark: {
    type: DataTypes.STRING(128),
    allowNull: true,
  },
  remark: {
    type: DataTypes.STRING(36),
    allowNull: true,
  },
  fe_remark: {
    type: DataTypes.STRING(108),
    allowNull: true,
  },
  manager_remark: {
    type: DataTypes.STRING(128),
    allowNull: true,
  },
  banker_remark: {
    type: DataTypes.STRING(128),
    allowNull: true,
  },
  sanction_letter: {
    type: DataTypes.STRING(60),
    allowNull: true,
  },
  sanction_branch_name: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  branch_contact_person: {
    type: DataTypes.STRING(48),
    allowNull: true,
  },
  branch_mobile: {
    type: DataTypes.STRING(16),
    allowNull: true,
  },
  lead_type: {
    type: DataTypes.STRING(12),
    allowNull: true,
  },
  created_by: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  updated_by: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  updated_date: {
    type: DataTypes.DATE, // Use `DataTypes.DATE` for a timestamp field
    allowNull: true,
    defaultValue: DataTypes.NOW, 
  },
  bank_posting_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  banker_userid: {
    type: DataTypes.STRING(24),
    allowNull: true,
  },
  reminder_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  filecomplete_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  disbursement_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  loan_posted_by: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  application_status: {
    type: DataTypes.STRING(24),
    allowNull: true,
  },
  lead_rerfered: {
    type: DataTypes.STRING(12),
    allowNull: true,
    defaultValue: 'NO',
  },
  refered_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  referred_remark: {
    type: DataTypes.STRING(108),
    allowNull: true,
  },
}, 



{
  tableName: "loan_detail",
  timestamps: true, 
  createdAt: "date",
  updatedAt: "updated_date"
}

);

export default LoanDetails


