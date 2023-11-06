// vehicle.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 


const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, 
    autoIncrement: true, 
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
    type: DataTypes.DECIMAL(10, 2), 
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
    type: DataTypes.ENUM('New', 'Used', 'Certified Pre-Owned'), 
    allowNull: false,
  },
  vin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT, 
  },
  type: {
    type: DataTypes.ENUM('car', 'truck', 'SUV', 'Convertible', 'Sedan', 'Sportscar'),
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  user_id: {
    type: DataTypes.INTEGER, 
    references: {
      model: 'user', 
      key: 'id', 
    },
  }, 
},
{
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: 'vehicle',
}
);

module.exports = Vehicle;
