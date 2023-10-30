const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const BuyersLikes = sequelize.define('buyers_likes', {
  liked: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
});

module.exports = BuyersLikes;