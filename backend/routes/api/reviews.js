const express = require("express");
const router = express.Router();
const {
  User,
  Spot,
  Review,
  SpotImage,
  ReviewImage,
  sequelize,
} = require("../../db/models");
const { validateSpotCreate } = require("../../utils/validate-body");
const {
  newErr,
  validateOwnership,
  validateExists,
} = require("../../utils/validation");
const { setPreviewImage } = require("./spots.js");

router.get("/current", async (req, res, next) => {
  const reviews = await Review.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  console.log("SPOT ", reviews);
  validateExists("Reviews", reviews);
  for (let i = 0; i < reviews.length; i++) {
    let review = reviews[i];

    review.Spot.dataValues.previewImage = await setPreviewImage(review.Spot);
  }

  return res.json({ reviews });
});

module.exports = router;
