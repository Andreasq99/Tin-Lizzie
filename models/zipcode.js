const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 
const ZipCode = sequelize.define('ZipCode', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  latitude: {
    type: DataTypes.FLOAT, 
    allowNull: false,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Define the association with the User model
ZipCode.hasOne(User, {
  foreignKey: 'zipCode', 
  sourceKey: 'code', 
});

module.exports = ZipCode;