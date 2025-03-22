import { DataTypes } from "sequelize";
import { sequelizedbconnection } from "../services/sequelizedbcon.js";
import Model from "./carmodel.js"; // Import the Model table

const sequelize = sequelizedbconnection();

const CarVariant = sequelize.define("car_variants", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    model_code: { 
        type: DataTypes.STRING, 
        allowNull: false,
        references: {
            model: Model,
            key: "model_code"
        },
        onDelete: "CASCADE"
    },
    model_name: { type: DataTypes.STRING, allowNull: false },
    variant_name: { type: DataTypes.STRING, allowNull: false },
    fuel_type: { 
        type: DataTypes.ENUM("PETROL", "DIESEL", "ELECTRIC", "CNG"), 
        allowNull: false 
    },
    transmission_type: { 
        type: DataTypes.ENUM("MANUAL", "AUTOMATIC"), 
        allowNull: false 
    },
    ex_showroom_price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    registration_price: { type: DataTypes.DECIMAL(10,2) },
    essential_kit: { type: DataTypes.DECIMAL(10,2) },
    tcs: { type: DataTypes.DECIMAL(10,2) },
    insurance: { type: DataTypes.DECIMAL(10,2) },
    insurance_add_on: { type: DataTypes.DECIMAL(10,2) },
    add_on_policy: { type: DataTypes.DECIMAL(10,2) },
    fast_tag: { type: DataTypes.DECIMAL(10,2) },
    handling_charge: { type: DataTypes.DECIMAL(10,2) },
    on_road_price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    vas: { type: DataTypes.DECIMAL(10,2) },
    extended_warranty: { type: DataTypes.DECIMAL(10,2) },
    amc: { type: DataTypes.DECIMAL(10,2) },
    delivery_charge: { type: DataTypes.DECIMAL(10,2) },
}, {
    timestamps: true, 
    createdAt: "created_at",
    updatedAt: "updated_at"
});

// Define association
CarVariant.belongsTo(Model, { foreignKey: "model_code", onDelete: "CASCADE" });

export default CarVariant;
