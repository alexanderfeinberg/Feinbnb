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
} = require("../../utils/validate-body");
const {
  newErr,
  validateOwnership,
  validateExists,
} = require("../../utils/validation");
const { setPreviewImage } = require("./spots.js");

router.get("/current", async (req, res, next) => {
  const bookings = await Booking.findAll({
    where: {
      userId: req.user.id,
    },
    include: {
      model: Spot,
    },
  });

  for (let i = 0; i < bookings.length; i++) {
    let booking = bookings[i];
    booking.Spot.dataValues.previewImage = await setPreviewImage(booking.Spot);
    console.log(booking.Spot);
  }

  res.json({ Bookings: bookings });

  //   await setPreviewImage(bookings);
});

module.exports = router;
