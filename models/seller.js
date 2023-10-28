const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Seller = sequelize.define('seller', {
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: Sequelize.STRING,
});

module.exports = Seller;
