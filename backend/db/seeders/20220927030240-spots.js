"use strict";

const spots = [
  {
    ownerId: 1,
    address: "1 Chares Lane",
    city: "Rhinebeck",
    state: "New York",
    country: "United States",
    lat: 100.0,
    lng: 150.0,
    name: "Nice Stay 1",
    description: "Spot 1",
    price: 150.0,
  },
  {
    ownerId: 2,
    address: "2 Chares Lane",
    city: "Rhinebeck",
    state: "New York",
    country: "United States",
    lat: 120.0,
    lng: 120.0,
    name: "Nice Stay 2",
    description: "Spot 2",
    price: 175.0,
  },
  {
    ownerId: 2,
    address: "3 Chares Lane",
    city: "Southborough",
    state: "Massachusetts",
    country: "United States",
    lat: 900.0,
    lng: 250.0,
    name: "Nice Stay 3",
    description: "Spot 3",
    price: 180.0,
  },
  {
    ownerId: 3,
    address: "4 Chares Lane",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 102.0,
    lng: 890.0,
    name: "Nice Stay 4",
    description: "Spot 4",
    price: 150.0,
  },
  {
    ownerId: 4,
    address: "5 Chares Lane",
    city: "Miami",
    state: "Florida",
    country: "United States",
    lat: 10.0,
    lng: 1050.0,
    name: "Nice Stay 5",
    description: "Spot 5",
    price: 250.0,
  },
  {
    ownerId: 4,
    address: "6 Chares Lane",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 110.0,
    lng: 1150.0,
    name: "Nice Stay 6",
    description: "Spot 6",
    price: 250.0,
  },
  {
    ownerId: 5,
    address: "7 Chares Lane",
    city: "San Diego",
    state: "California",
    country: "United States",
    lat: 120.0,
    lng: 1150.0,
    name: "Nice Stay 7",
    description: "Spot 7",
    price: 220.0,
  },
  {
    ownerId: 5,
    address: "8 Chares Lane",
    city: "Washington",
    state: "District of Columbia",
    country: "United States",
    lat: 120.0,
    lng: 1150.0,
    name: "Nice Stay 8",
    description: "Spot 8",
    price: 278.0,
  },
  {
    ownerId: 1,
    address: "9 Chares Lane",
    city: "Washington",
    state: "District of Columbia",
    country: "United States",
    lat: 120.0,
    lng: 1150.0,
    name: "Nice Stay 9",
    description: "Spot 9",
    price: 450.0,
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Spots", spots, {});
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
    return queryInterface.bulkDelete("Spots", {
      description: {
        [Op.in]: [
          "Spot 1",
          "Spot 2",
          "Spot 3",
          "Spot 4",
          "Spot 5",
          "Spot 6",
          "Spot 7",
          "Spot 8",
          "Spot 9",
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
