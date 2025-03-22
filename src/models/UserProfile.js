import { DataTypes } from 'sequelize';
import { sequelizedbconnection } from '../services/sequelizedbcon.js';
import User from './User.js';

const sequelize = sequelizedbconnection();

const UserProfile = sequelize.define('UserProfile', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // referring to the 'Users' table
      key: 'id'
    },
    onDelete: 'CASCADE' // Optional: this will delete user profiles if the corresponding user is deleted
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  father_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  customer_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email : {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Aadhar : {
    type: DataTypes.INTEGER,
    allowNull: false

  }, 
  Pan : {
    type: DataTypes.STRING(100),
    allowNull: false
  },

  profile_image: {
    type: DataTypes.BLOB('long'),  // Storing image as binary data
    allowNull: false
  }

}, {
  timestamps: false,  // Disable timestamps
});




User.hasOne(UserProfile, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

UserProfile.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

export default UserProfile;
