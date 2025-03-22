import { DataTypes } from 'sequelize';
import { sequelizedbconnection } from '../services/sequelizedbcon.js';

const sequelize = sequelizedbconnection();

const User = sequelize.define('admin_user', {
  user_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  tree_level: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_type: {
    type: DataTypes.STRING(24),
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING(24),
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING(24),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(32),
    allowNull: false,
    unique: true
  },
  mobile_registered: {
    type: DataTypes.STRING(12),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255), // Increased size for hashed passwords
    allowNull: false
  },
  image_path: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: "../../assets/image-resources/default-avatar.png"
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  rp_token: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rp_token_created_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true, // Enables createdAt and updatedAt fields
  createdAt: "created",
  updatedAt: "modified"
});

export default User;
