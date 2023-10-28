const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const CarMetrics = sequelize.define('car_metrics', {
  views: Sequelize.INTEGER,
  likes: Sequelize.INTEGER,
  loves: Sequelize.INTEGER,
  time_on_site: Sequelize.INTEGER,
  lowest_price: Sequelize.DECIMAL,
});

module.exports = CarMetrics;
