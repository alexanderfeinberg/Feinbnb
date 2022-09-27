"use strict";

const { query } = require("express");

const images = [
  {
    spotId: 1,
    url: "url1.com",
    preview: false,
  },
  {
    spotId: 1,
    url: "url2.com",
    preview: true,
  },
  {
    spotId: 1,
    url: "url3.com",
    preview: false,
  },
  {
    spotId: 2,
    url: "url4.com",
    preview: false,
  },
  {
    spotId: 2,
    url: "url5.com",
    preview: true,
  },
  {
    spotId: 3,
    url: "url6.com",
    preview: false,
  },
  {
    spotId: 3,
    url: "url7.com",
    preview: true,
  },
  {
    spotId: 3,
    url: "url8.com",
    preview: true,
  },
  {
    spotId: 4,
    url: "url9.com",
    preview: true,
  },
  {
    spotId: 4,
    url: "url10.com",
    preview: true,
  },
  {
    spotId: 5,
    url: "url11.com",
    preview: false,
  },
  {
    spotId: 5,
    url: "url12.com",
    preview: true,
  },
  {
    spotId: 5,
    url: "url13.com",
    preview: true,
  },
  {
    spotId: 6,
    url: "url14.com",
    preview: true,
  },
  {
    spotId: 7,
    url: "url15.com",
    preview: true,
  },
  {
    spotId: 7,
    url: "url16.com",
    preview: true,
  },
  {
    spotId: 8,
    url: "url17.com",
    preview: true,
  },
  {
    spotId: 9,
    url: "url18.com",
    preview: true,
  },
  {
    spotId: 9,
    url: "url19.com",
    preview: true,
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("SpotImages", images, {});
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
    return queryInterface.bulkDelete("SpotImages", {
      url: {
        [Op.in]: [
          "url1.com",
          "url2.com",
          "url3.com",
          "url4.com",
          "url5.com",
          "url6.com",
          "url7.com",
          "url8.com",
          "url9.com",
          "url10.com",
          "url11.com",
          "url12.com",
          "url13.com",
          "url14.com",
          "url15.com",
          "url16.com",
          "url17.com",
          "url18.com",
          "url19.com",
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
