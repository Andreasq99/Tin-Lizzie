const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Vehicle = sequelize.define('vehicle', {
  vehicle_type: Sequelize.ENUM('Car', 'Boat', 'Motorcycle'), // Add a field for vehicle type
  price: Sequelize.DECIMAL,
  // Add other generic vehicle properties like make, model, year, description, etc.
  make: Sequelize.STRING,
  model: Sequelize.STRING,
  year: Sequelize.INTEGER,
  description: Sequelize.TEXT,
});

module.exports = Vehicle;