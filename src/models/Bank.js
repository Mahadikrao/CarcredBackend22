import { DataTypes } from "sequelize";
import { sequelizedbconnection } from "../services/sequelizedbcon.js";

const sequelize = sequelizedbconnection();

const Bank = sequelize.define('Bank', {
    bank_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    bank_name: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    bank_image: {
        type: DataTypes.STRING(84),
        allowNull: false,
    },
    gstn_number: {
        type: DataTypes.STRING(48),
        allowNull: false,
    },
    address1: {
        type: DataTypes.STRING(48),
        allowNull: false,
    },
    address2: {
        type: DataTypes.STRING(48),
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING(24),
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    bank_preference: {
        type: DataTypes.STRING(32),
        defaultValue: 'NON PREFERRED',
    },
    bank_scheme: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    tax_type: {
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    created_by: {
        type: DataTypes.STRING(16),
        allowNull: false,
    },
    created_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Automatically sets the current timestamp
    },
}, {
    timestamps: false, // Disable Sequelize's default timestamps
});

export default Bank;
