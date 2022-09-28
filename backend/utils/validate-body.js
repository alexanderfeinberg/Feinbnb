const { check } = require("express-validator");
const { handleValidationErrors, newErr } = require("./validation");

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

module.exports = {
  validateSpotCreate,
};
