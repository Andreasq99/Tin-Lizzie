const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Import your Sequelize instance

const Love = sequelize.define('Love', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
});

module.exports = Love;
