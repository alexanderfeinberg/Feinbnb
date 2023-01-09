"use strict";

const bookings = [
  {
    spotId: 1,
    userId: 1,
    startDate: new Date("10/1/22"),
    endDate: new Date("10/3/22"),
    totalDays: 2,
    totalGuests: 2,
    totalPrice: 300,
  },
  {
    spotId: 1,
    userId: 1,
    startDate: new Date("10/5/22"),
    endDate: new Date("10/8/22"),
    totalDays: 3,
    totalGuests: 2,
    totalPrice: 450,
  },
  {
    spotId: 2,
    userId: 1,
    startDate: new Date("10/9/22"),
    endDate: new Date("10/10/22"),
    totalDays: 1,
    totalGuests: 1,
    totalPrice: 175,
  },
  {
    spotId: 3,
    userId: 3,
    startDate: new Date("10/1/22"),
    endDate: new Date("10/3/22"),
    totalDays: 2,
    totalGuests: 3,
    totalPrice: 360,
  },
  {
    spotId: 2,
    userId: 2,
    startDate: new Date("10/15/22"),
    endDate: new Date("10/30/22"),
    totalDays: 15,
    totalGuests: 3,
    totalPrice: 2700,
  },
  {
    spotId: 6,
    userId: 4,
    startDate: new Date("10/15/22"),
    endDate: new Date("10/30/22"),
    totalDays: 15,
    totalGuests: 4,
    totalPrice: 3750,
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Bookings", bookings, {});

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
    return queryInterface.bulkDelete("Bookings", {
      spotId: {
        [Op.in]: [1, 2, 3, 6],
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
