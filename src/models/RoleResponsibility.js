import {DataTypes } from 'sequelize';

import { sequelizedbconnection } from '../services/sequelizedbcon.js';

const sequelize = sequelizedbconnection();
const RoleResponsibility = sequelize.define('role_responsibilities', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    responsibility: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {

    timestamps: false  // Disable createdAt & updatedAt fields
});

export default RoleResponsibility;