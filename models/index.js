  // models/index.js
const Buyer = require('./buyer');
const Seller = require('./seller');
const Vehicle = require('./vehicle');
const CarMetrics = require('./carMetrics');
const BuyerLike = require('./buyerLikes');
const Customer = require('./customer');

// Define associations here
Buyer.hasMany(Vehicle);
Seller.hasMany(Vehicle);
Vehicle.belongsTo(Buyer);
Vehicle.belongsTo(Seller);
Vehicle.hasOne(CarMetrics);
Customer.belongsTo(Buyer, { as: 'buyer' });
Customer.belongsTo(Seller, { as: 'seller' });
Buyer.belongsToMany(Vehicle, { through: BuyerLike, as: 'likedVehicles' });
Vehicle.belongsToMany(Buyer, { through: BuyerLike, as: 'likingBuyers' });

module.exports = {
  Buyer,
  Seller,
  Vehicle,
  CarMetrics,
  Customer,
};
