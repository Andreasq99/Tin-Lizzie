const Sequelize = require('sequelize');
const sequelize = require('../config/connection');
const Customer = require('./customer');

const Seller = sequelize.define('seller', {
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: Sequelize.STRING,
});

Seller.belongsTo(Customer);
module.exports = Seller;
