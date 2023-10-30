const Sequelize = require('sequelize');
const sequelize = require('../config/connection');
const Customer = require('./customer');

const Buyer = sequelize.define('buyer', {
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  zip_code: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: Sequelize.STRING,
});
Buyer.belongsTo(Customer);
module.exports = Buyer;
