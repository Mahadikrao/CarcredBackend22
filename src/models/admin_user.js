import { DataTypes } from "sequelize";
import { sequelizedbconnection } from "../services/sequelizedbcon.js";

const sequelize = sequelizedbconnection();

// Define the User model
const User = sequelize.define('admin_user', {
    user_id: {
        type: DataTypes.STRING(11),  // VARCHAR(11)
        allowNull: false,
        primaryKey: true
    },
    tree_level: {
        type: DataTypes.INTEGER(5),  // INT(5)
        allowNull: false
    },
    role_id: {
        type: DataTypes.INTEGER(11),  // INT(11)
        allowNull: false
    },
    user_type: {
        type: DataTypes.STRING(24),  // VARCHAR(24)
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING(24),  // VARCHAR(24)
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(24),  // VARCHAR(24)
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(32),  // VARCHAR(32)
        allowNull: false
    },
    mobile_registered: {
        type: DataTypes.STRING(12),  // VARCHAR(12)
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(48),  // VARCHAR(48)
        allowNull: false
    },
    image_path: {
        type: DataTypes.STRING(108),  // VARCHAR(108)
        allowNull: false,
        defaultValue: '../../assets/image-resources/default-avatar.png'  // Default image path
    },
    created: {
        type: DataTypes.DATE,  // DATETIME
        allowNull: false
    },
    modified: {
        type: DataTypes.DATE,  // DATETIME
        allowNull: false
    },
    is_active: {
        type: DataTypes.STRING(8),  // VARCHAR(8)
        allowNull: false
    },
    rp_token: {
        type: DataTypes.TEXT,  // TEXT
        allowNull: false
    },
    rp_token_created_at: {
        type: DataTypes.TIMESTAMP,  // TIMESTAMP
        allowNull: false,
        defaultValue: DataTypes.NOW,  // Default to current timestamp
        onUpdate: DataTypes.NOW  // Automatically update the timestamp on record update
    },
    last_login: {
        type: DataTypes.DATE,  // DATETIME
        allowNull: true
    }
}, {
    tableName: 'admin_user',  // Specify the table name explicitly
    timestamps: false,  // Disable the automatic creation of createdAt and updatedAt fields
});

export default User 