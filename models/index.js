  // models/index.js
const Buyer = require('./buyer');
const Seller = require('./seller');
const Vehicle = require('./vehicle');
const CarMetrics = require('./carMetrics');

// Define associations here
Buyer.hasMany(Vehicle);
Seller.hasMany(Vehicle);
Vehicle.belongsTo(Buyer);
Vehicle.belongsTo(Seller);
Vehicle.hasOne(CarMetrics);

module.exports = {
  Buyer,
  Seller,
  Vehicle,
  CarMetrics,
};
