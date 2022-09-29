const express = require("express");
const router = express.Router();
const {
  User,
  Spot,
  Review,
  SpotImage,
  ReviewImage,
  Booking,
  sequelize,
} = require("../../db/models");
const {
  validateSpotCreate,
  validateReview,
  validateBookings,
  validateDates,
} = require("../../utils/validate-body");
const {
  newErr,
  validateOwnership,
  validateExists,
} = require("../../utils/validation");

const { requireAuth } = require("../../utils/auth.js");

router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const image = await ReviewImage.findByPk(req.params.imageId);
  validateExists("Review Image", image, next, 404);
  const review = await Review.findByPk(image.reviewId);
  validateOwnership("Review", review, "userId", req.user, "id", next);

  await image.destroy();
  return res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
