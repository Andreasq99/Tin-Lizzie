// vehicle.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance

const Vehicle = sequelize.define('Vehicle', {
  make: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), // Store price as a decimal with 2 decimal places
    allowNull: false,
  },
  mileage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
  },
  condition: {
    type: DataTypes.ENUM('New', 'Used', 'Certified Pre-Owned'), // Store condition as one of the specified options
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT, // Store a longer description as text
  },
  // Add more vehicle-specific fields as needed
});

module.exports = Vehicle;
