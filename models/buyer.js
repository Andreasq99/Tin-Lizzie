const Sequelize = require('sequelize');
const sequelize = require('../config/database');

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

module.exports = Buyer;
