"use strict";

const reviews = [
  {
    spotId: 1,
    userId: 5,
    review: "Good",
    stars: 4,
  },
  {
    spotId: 1,
    userId: 4,
    review: "it was ok",
    stars: 3,
  },
  {
    spotId: 3,
    userId: 1,
    review: "It wasn't clean.",
    stars: 2,
  },
  {
    spotId: 2,
    userId: 5,
    review: "Fantastic stay!",
    stars: 5,
  },
  {
    spotId: 4,
    userId: 2,
    review: "Had a great time! Wish the service was a bit better.",
    stars: 4,
  },
  {
    spotId: 4,
    userId: 1,
    review: "Had a great time!",
    stars: 5,
  },
  {
    spotId: 2,
    userId: 4,
    review: "Very relaxing",
    stars: 5,
  },
  {
    spotId: 5,
    userId: 5,
    review: "Boring!",
    stars: 1,
  },
  {
    spotId: 5,
    userId: 1,
    review: "so boring lol",
    stars: 2,
  },
  {
    spotId: 6,
    userId: 3,
    review: "Awesome!",
    stars: 5,
  },
  {
    spotId: 6,
    userId: 2,
    review: "Great memories, very clean spot!",
    stars: 5,
  },
  {
    spotId: 7,
    userId: 3,
    review: "So dirty! Do not book this spot!",
    stars: 2,
  },
  {
    spotId: 7,
    userId: 2,
    review: "very very dirty. left immeditely",
    stars: 1,
  },
  {
    spotId: 8,
    userId: 4,
    review: "Had an amazing time. Wonderful host.",
    stars: 4,
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Reviews", reviews, {});
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
    return queryInterface.bulkDelete("Reviews", {
      review: {
        [Op.in]: [
          "Good",
          "it was ok",
          "It wasn't clean.",
          "Fantastic stay!",
          "Had a great time! Wish the service was a bit better.",
          "Had a great time!",
          "Very relaxing",
          "Boring!",
          "so boring lol",
          "Awesome!",
          "Great memories, very clean spot!",
          "So dirty! Do not book this spot!",
          "very very dirty. left immeditely",
          "Had an amazing time. Wonderful host.",
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
