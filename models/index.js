// models/index.js
const User = require('./user');
const Vehicle = require('./vehicle');
const VehicleImage = require('./vehicleImage');
const Like = require('./like');
const Love = require('./love');
const View = require('./view');

// Define associations
User.hasMany(Like);
User.hasMany(Love);
User.hasMany(View);
User.hasMany(Vehicle);
Like.belongsTo(User);
Love.belongsTo(User);
View.belongsTo(User);
Vehicle.belongsTo(User);

Vehicle.hasMany(Like);
Vehicle.hasMany(Love);
Vehicle.hasMany(View);
Vehicle.hasMany(VehicleImage);
Like.belongsTo(Vehicle);
Love.belongsTo(Vehicle);
View.belongsTo(Vehicle);

// Export models
module.exports = {
  User,
  Vehicle,
  VehicleImage,
  Like,
  Love,
  View,
};

