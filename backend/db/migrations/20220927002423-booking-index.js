"use strict";

const { query } = require("express");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addIndex(
      "Bookings",
      ["spotId", "startDate", "endDate"],
      { unique: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("Bookings", [
      "spotId",
      "startDate",
      "endDate",
    ]);
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
