import { DataTypes } from "sequelize";
import { sequelizedbconnection } from "../services/sequelizedbcon.js";

const sequelize = sequelizedbconnection();

const Quotation = sequelize.define(
  "raw_quotation",
  {
    quotation_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    cardetail_id: {
      type: DataTypes.STRING(16),
      allowNull: true,
    },
    model_id: {
      type: DataTypes.STRING(16),
      allowNull: true,
    },
    color_id: {
      type: DataTypes.STRING(16),
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING(48),
      allowNull: true,
    },
    interior_color_id: {
      type: DataTypes.STRING(16),
      allowNull: true,
    },
    enquiry_id: {
      type: DataTypes.STRING(16),
      allowNull: true,
    },
    ex_showroom_price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    registration_charge: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    insurance: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    insurance_add: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    tcs: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    essential_kit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    handling: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    add_on_policy: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    fast_tag: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    on_road_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    accesories: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    vas: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Value Added Service",
    },
    extended_warranty: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    amc: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    installation_charge: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    other_charge: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    charge_reason: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    temporey_registration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    number_plate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cash_scheme: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    vin_discount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    vehicle_exchange_amt: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    final_on_road_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.STRING(16),
      allowNull: true,
    },
    
  },


  {
    tableName: "raw_quotation",
    timestamps: false,
  }
);

export default Quotation;

