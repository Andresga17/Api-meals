'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('reviews', 'status', {
      type: Sequelize.ENUM('active', 'deleted'),
      defaultValue: 'active',
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('reviews', 'status');
  },
};
