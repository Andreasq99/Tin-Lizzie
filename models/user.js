// user.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance

const User = sequelize.define('User', {
  id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Specify this field as the primary key
        autoIncrement: true, // Enable auto-incrementing for the primary key
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Ensure the email is a valid email address
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  zip: {
    type: DataTypes.STRING,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },  
  // Add more user-specific fields as needed
});

module.exports = User;
