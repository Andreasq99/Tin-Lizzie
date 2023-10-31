// vehicle.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Import your Sequelize instance

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Specify this field as the primary key
    autoIncrement: true, // Enable auto-incrementing for the primary key
  },
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
  user_id: {
    type: DataTypes.INTEGER, 
    references: {
      model: 'user', 
      key: 'id', 
    },
  }, // Corrected placement of closing curly bracket
  // Add more vehicle-specific fields as needed
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'vehicle',
}
);

module.exports = Vehicle;
