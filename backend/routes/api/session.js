const express = require("express");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Email or username is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];

router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;
  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error("Login failed");
    err.statusCode = 401;
    res.status(err.statusCode);
    // err.title = "Login failed";
    // err.errors = ["The provided credentials were invalid"];
    err.message = "Invalid credentials";
    // console.log(err);
    // return next(err);
    return res.json({ message: err.message, ...err });
  }

  user.dataValues.token = setTokenCookie(res, user);
  // console.log(res);
  return res.json(user);
});

router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

//restoreUser
router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json(user.toSafeObject(req)); //delete req?
  } else return res.json({});
});

module.exports = router;
