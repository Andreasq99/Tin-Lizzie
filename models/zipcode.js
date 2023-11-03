const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Replace with your database configuration

const ZipCode = sequelize.define('ZipCode', {
  code: {
    type: DataTypes.STRING, // Store the zip code as a string
    allowNull: false,
    primaryKey: true,
  },
  latitude: {
    type: DataTypes.FLOAT, // Store the latitude as a floating-point number
    allowNull: false,
  },
  longitude: {
    type: DataTypes.FLOAT, // Store the longitude as a floating-point number
    allowNull: false,
  },
  ZipCode.hasOne(User, {
    foreignKey: 'zipCode', // This should match the field name in the User model
    sourceKey: 'code', // This should match the primary key in the ZipCode model
});

module.exports = ZipCode;
