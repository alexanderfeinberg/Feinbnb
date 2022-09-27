const express = require("express");
const router = express.Router();
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email"),

  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a first name"),

  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a last name"),

  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ max: 30 })
    .withMessage("Please provide a username with 30 or less characters."),
  check("username").not().isEmail().withMessage("User cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
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

  user.dataValues.token = setTokenCookie(res, user);

  return res.json({
    user,
  });
});

module.exports = router;
