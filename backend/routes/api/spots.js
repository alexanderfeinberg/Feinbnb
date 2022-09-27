const express = require("express");
const router = express.Router();
const { Spot, Review, SpotImage, sequelize } = require("../../db/models");

router.get("/", async (req, res, next) => {
  //   const spots = await Spot.scope("getSpots").findAll({
  //     include: {
  //       model: Review,
  //     },
  //     attributes: [
  //       [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
  //     ],
  //   });
  const spots = await Spot.scope("getSpots").findAll({
    include: [
      { model: SpotImage, attributes: ["preview"] },
      { model: Review, attributes: [] },
    ],
  });

  for (let i = 0; i < spots.length; i++) {
    let spot = spots[i];
    let count = await Review.sum("stars", {
      where: {
        spotId: spot.id,
      },
    });
    let total = await Review.count({
      where: {
        spotId: spot.id,
      },
    });
    spot.dataValues.avgRating = count / total;
  }

  console.log(spots);

  res.json({
    spots,
  });
});

module.exports = router;
