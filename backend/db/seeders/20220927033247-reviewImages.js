"use strict";

const { query } = require("express");

const images = [
  {
    reviewId: 1,
    url: "testid1.com",
  },
  {
    reviewId: 1,
    url: "testid2.com",
  },
  {
    reviewId: 2,
    url: "testid3.com",
  },
  {
    reviewId: 2,
    url: "testid4.com",
  },
  {
    reviewId: 3,
    url: "testid5.com",
  },
  {
    reviewId: 3,
    url: "testid6.com",
  },
  {
    reviewId: 4,
    url: "testid7.com",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("ReviewImages", images, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("reviewImages", {
      url: {
        [Op.in]: [
          "testid1.com",
          "testid2.com",
          "testid3.com",
          "testid4.com",
          "testid5.com",
          "testid6.com",
          "testid7.com",
        ],
      },
    });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
