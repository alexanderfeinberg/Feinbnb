const express = require("express");
const router = express.Router();
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Booking, Spot } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const {
  default: Bookings,
} = require("../../../frontend/src/components/Bookings/Bookings");
const { setPreviewImage } = require("./spots");

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Email is required"),

  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),

  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Username is required")
    .bail()
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters.")
    .bail()
    .isLength({ max: 30 })
    .withMessage("Please provide a username with 30 or less characters.")
    .bail()
    .not()
    .isEmail()
    .withMessage("User cannot be an email."),

  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),

  handleValidationErrors,
];

router.post("/", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password,
  });

  const token = setTokenCookie(res, user);
  user.dataValues.token = token;
  // user.dataValues.token = setTokenCookie(res, user);

  return res.json(user);
});

router.get("/:userId/bookings", requireAuth, async (req, res, next) => {
  const bookings = await Booking.findAll({
    where: {
      userId: req.params.userId,
    },
    include: {
      model: Spot,
    },
  });

  for (let i = 0; i < bookings.length; i++) {
    let booking = bookings[i];
    booking.Spot.dataValues.previewImage = await setPreviewImage(booking.Spot);
    // console.log(booking.Spot);
  }

  res.json({ Bookings: bookings });
});

module.exports = router;
