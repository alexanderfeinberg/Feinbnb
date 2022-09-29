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
const {
  validateSpotCreate,
  validateReview,
} = require("../../utils/validate-body");
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

  validateExists("Reviews", reviews);
  for (let i = 0; i < reviews.length; i++) {
    let review = reviews[i];

    review.Spot.dataValues.previewImage = await setPreviewImage(review.Spot);
  }

  return res.json({ reviews });
});

router.post("/:reviewId/images", async (req, res, next) => {
  if (!req.body.url) {
    const err = Error("URL is required");
    err.status = 400;
    next(err);
  }
  const review = await Review.findByPk(req.params.reviewId, {
    include: {
      model: ReviewImage,
    },
  });

  validateExists("Review", review, next);
  validateOwnership("Review", review, "userId", req.user, "id", next);
  if (review.dataValues.ReviewImages.length >= 10) {
    const err = Error("Maximum number of images for this resource was reached");
    err.status = 403;
    return next(err);
  }

  const newImg = await review.createReviewImage({
    url: req.body.url,
  });
  res.json(newImg);
});

router.put("/:reviewId", validateReview, async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId);

  validateExists("Review", review, next);
  validateOwnership("Review", review, "userId", req.user, "id", next);

  for (let key of Object.keys(req.body)) {
    review[key] = req.body[key];
  }

  const saved = await review.save();
  res.json(saved);
});

router.delete("/:reviewId", async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId);
  validateExists("Review", review, next);
  validateOwnership("Review", review, "userId", req.user, "id", next);
  await review.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
