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
  validateBookingExists,
} = require("../../utils/validate-body");
const {
  newErr,
  validateOwnership,
  validateExists,
} = require("../../utils/validation");
const { setPreviewImage } = require("./spots.js");
const { requireAuth } = require("../../utils/auth.js");

router.get("/current", requireAuth, async (req, res, next) => {
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

router.put(
  "/:bookingId",
  requireAuth,
  validateBookingExists,
  validateBookings,
  validateDates,
  async (req, res, next) => {
    let today = new Date();
    let endDate = new Date(req.body.endDate);
    if (endDate < today) {
      const err = Error("Past bookings can't be modified");
      err.status = 403;
      return next(err);
    }
    const booking = await Booking.findByPk(req.params.bookingId);
    validateExists("Booking", booking, next, 404);
    validateOwnership("Booking", booking, "userId", req.user, "id", next);
    for (let key of Object.keys(req.body)) {
      booking[key] = req.body[key];
    }

    let result = await booking.save();
    return res.json(result);
  }
);

router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId);
  validateExists("Booking", booking, next, 404);
  validateOwnership("Booking", booking, "userId", req.user, "id", next);
  let today = new Date();
  let startDate = new Date(booking.startDate);
  let endDate = new Date(booking.endDate);
  if (today > startDate) {
    const err = Error("Bookings that have been started can't be deleted");
    err.status = 403;
    return next(err);
  }
  await booking.destroy();
  return res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
