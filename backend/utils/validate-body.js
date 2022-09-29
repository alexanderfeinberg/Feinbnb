const { check } = require("express-validator");
const { handleValidationErrors, handleDateErrors } = require("./validation");
const { Booking } = require("../db/models");

const validateSpotCreate = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),

  check("city").exists({ checkFalsy: true }).withMessage("City is required"),

  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),

  check("lat")
    .exists({ checkFalsy: true })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),

  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),

  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Price per day must be at least 1"),

  handleValidationErrors,
];

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),

  check("stars")
    .exists({ checkFalsy: true })
    .withMessage("Stars are required")
    .bail()
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),

  handleValidationErrors,
];

const validateBookings = [
  check("startDate")
    .exists({ checkFalsy: true })
    .withMessage("startDate is required"),

  check("endDate")
    .exists({ checkFalsy: true })
    .withMessage("endDate is required")
    .bail()
    .custom((endDate, { req }) => {
      let end = new Date(endDate);
      console.log(req.body.startDate);
      let start = new Date(req.body.startDate);
      if (end < start) {
        throw new Error("endDate cannot be on or before startDate");
      }
      return true;
    })
    .bail(),

  handleValidationErrors,
];

const validateDates = [
  check("startDate").custom(async (start, { req }) => {
    const bookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId,
      },
    });

    if (!bookings) return true;
    let startDate = new Date(req.body.startDate);
    for (let i = 0; i < bookings.length; i++) {
      let booking = bookings[i];
      console.log(booking.startDate);
      let bookingStart = new Date(booking.startDate);
      let bookingEnd = new Date(booking.endDate);
      if (startDate < bookingEnd && startDate > bookingStart) {
        const err = Error("Start date conflicts with an existing booking");
        err.status = 403;
        throw err;
      }
    }

    return true;
  }),
  check("endDate").custom(async (end, { req }) => {
    const bookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId,
      },
    });

    if (!bookings) return true;
    let endDate = new Date(req.body.endDate);
    for (let i = 0; i < bookings.length; i++) {
      let booking = bookings[i];
      let bookingStart = new Date(booking.startDate);
      let bookingEnd = new Date(booking.endDate);
      if (bookingStart < endDate && bookingEnd > endDate) {
        const err = Error("Start date conflicts with an existing booking");
        err.status = 403;
        throw err;
      }
    }

    return true;
  }),
  handleDateErrors,
];

module.exports = {
  validateSpotCreate,
  validateReview,
  validateBookings,
  validateDates,
};
