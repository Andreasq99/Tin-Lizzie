'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Vehicles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      vehicle_type: {
        type: Sequelize.ENUM('Car', 'Boat', 'Motorcycle'),
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      make: Sequelize.STRING,
      model: Sequelize.STRING,
      year: Sequelize.INTEGER,
      description: Sequelize.TEXT,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Vehicles');
  },
};
