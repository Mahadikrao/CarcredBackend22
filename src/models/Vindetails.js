import { DataTypes } from 'sequelize';
import { sequelizedbconnection } from '../services/sequelizedbcon.js';

const sequelize = sequelizedbconnection();

const VinDetails = sequelize.define('VinDetails', {
    vin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    dealer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    branch_id: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    manufacture_year: {
        type: DataTypes.INTEGER, // Sequelize does not support YEAR type directly
        allowNull: false
    },
    model_id: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    car_detail_id: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    color_id: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    color_interior: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    vin_name: {
        type: DataTypes.STRING(48),
        allowNull: false
    },
    engine_no: {
        type: DataTypes.STRING(24),
        allowNull: false
    },
    allocation_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    vin_alloted: {
        type: DataTypes.STRING(48),
        allowNull: false
    },
    customer_alloted_id: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    dispatched_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    vin_status: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    remark: {
        type: DataTypes.STRING(108),
        allowNull: false
    },
    physical_status: {
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: 'RECEIVED'
    },
    alloted_by: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    created_by: {
        type: DataTypes.STRING(24),
        allowNull: false
    },
    created_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    modified_by: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    modified_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
}, {
    tableName: 'vin_detail',
    timestamps: false // Set to false if your table doesn't have `createdAt` and `updatedAt` columns
});

export default VinDetails;
