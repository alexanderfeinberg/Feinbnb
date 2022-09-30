const { check } = require("express-validator");
const {
  handleValidationErrors,
  handleDateErrors,
  validateExists,
} = require("./validation");
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
    .withMessage("startDate is required")
    .bail(),
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

const validateBookingExists = [
  check("startDate").custom(async (start, { req }) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    if (!booking) {
      const err = Error("Booking couldn't be found");
      err.status = 404;
      throw err;
    }
  }),
  handleDateErrors,
];

const validateDates = [
  check("startDate").custom(async (start, { req }) => {
    let spotId;
    if (!req.params.spotId) {
      let booking = await Booking.findByPk(req.params.bookingId);
      spotId = booking.spotId;
    }
    const bookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId || spotId,
      },
    });

    if (!bookings) return true;
    let startDate = new Date(req.body.startDate);
    let endDate = new Date(req.body.endDate);
    for (let i = 0; i < bookings.length; i++) {
      let booking = bookings[i];
      console.log(startDate);
      let bookingStart = new Date(booking.startDate);
      let bookingEnd = new Date(booking.endDate);
      console.log(bookingEnd);
      console.log(startDate < bookingEnd, startDate > bookingStart);
      if (startDate < bookingEnd && startDate > bookingStart) {
        const err = Error("Start date conflicts with an existing booking");
        err.status = 403;
        throw err;
      } else if (startDate < bookingStart && endDate > bookingEnd) {
        const err = Error("Start date conflicts with an existing booking");
        err.status = 403;
        throw err;
      }
    }

    return true;
  }),
  check("endDate").custom(async (end, { req }) => {
    let spotId;
    if (!req.params.spotId) {
      let booking = await Booking.findByPk(req.params.bookingId);

      spotId = booking.spotId;
    }

    const bookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId || spotId,
      },
    });

    if (!bookings) return true;
    let startDate = new Date(req.body.startDate);
    let endDate = new Date(req.body.endDate);
    for (let i = 0; i < bookings.length; i++) {
      let booking = bookings[i];
      let bookingStart = new Date(booking.startDate);
      let bookingEnd = new Date(booking.endDate);
      if (bookingStart < endDate && bookingEnd > endDate) {
        const err = Error("End date conflicts with an existing booking");
        err.status = 403;
        throw err;
      } else if (startDate < bookingStart && endDate > bookingEnd) {
        const err = Error("End date conflicts with an existing booking");
        err.status = 403;
        throw err;
      }
    }

    return true;
  }),
  handleDateErrors,
];

const validateQuery = [
  check("page").custom((val) => {
    if (!val) return true;
    val = parseInt(val);
    if (!val || val <= 0) {
      throw new Error("Page must be greater than or equal to 1");
    }
    return true;
  }),
  check("size").custom((val) => {
    if (!val) return true;
    val = parseInt(val);
    if (!val || val <= 0) {
      throw new Error("Size must be greater than or equal to 1");
    }
    return true;
  }),
  check("maxLat").custom((val) => {
    if (!val) return true;
    val = parseFloat(val);
    if (!val) throw new Error("Maximum latitude is invalid");
    return true;
  }),
  check("minLat").custom((val) => {
    if (!val) return true;
    val = parseFloat(val);
    if (!val) throw new Error("Minimum latitude is invalid");
    return true;
  }),
  check("minLng").custom((val) => {
    if (!val) return true;
    val = parseFloat(val);
    if (!val) throw new Error("Minimum longitude is invalid");
    return true;
  }),
  check("maxLng").custom((val) => {
    if (!val) return true;
    val = parseFloat(val);
    if (!val) throw new Error("Maximum longitude is invalid");
    return true;
  }),
  check("minPrice").custom((val) => {
    if (!val) return true;
    val = parseFloat(val);
    if (val === 0) return true;
    if (!val || val < 0)
      throw new Error("Minimum price must be greater than or equal to 0");
    return true;
  }),
  check("maxPrice").custom((val) => {
    if (!val) return true;
    val = parseFloat(val);
    if (val === 0) return true;
    if (!val || val < 0)
      throw new Error("Maximum price must be greater than or equal to 0");
    return true;
  }),
  handleValidationErrors,
];

module.exports = {
  validateSpotCreate,
  validateReview,
  validateBookings,
  validateDates,
  validateQuery,
  validateBookingExists,
};
