const { validationResult } = require("express-validator");
const { Booking, Spot } = require("../db/models");

const validateExists = (modelName, model, next, errOverride) => {
  console.log("MODEL, ", model);
  errOverride = errOverride || 400;
  if (!model) {
    console.log(`${modelName} does not exist`);
    return newErr(`${modelName} does not exist`, errOverride, next);
  }
};

const validateOwnership = (modelName, model, modelKey, user, userKey, next) => {
  if (model[modelKey] !== user[userKey]) {
    console.log(`${modelName} must be owned by current user`);
    return newErr(`${modelName} must be owned by current user`, 401, next);
  }
};

const newErr = (message, status, next) => {
  const err = Error(message);
  err.status = status;
  return next(err);
};

// const validateDate = (req, _res, next) => {
//   let startSplit = req.body.startDate.split("-");
//   req.body.startDate = new Date(
//     `${startSplit[1]}${startSplit[2]}${startSplit[0]}`
//   );
//   let endSplit = req.body.endDate.split("-");
//   req.body.endDate = new Date(`${endSplit[1]}${endSplit[2]}${endSplit[0]}`);
//   next();
// };
// const validateBookingDates = async (req) => {
//   let startDate = new Date(req.body.startDate);
//   let endDate = new Date(req.body.endDate);
//   const bookings = await Booking.findAll({
//     where: {
//       spotId: req.params.spotId,
//     },
//   });
//   if (!bookings) {
//     return false;
//   }
//   for (let i = 0; i < bookings.length; i++) {
//     let booking = bookings[i];
//     let bookingStart = new Date(booking.startDate);
//     let bookingEnd = new Date(booking.endDate);
//     if (bookingEnd > startDate && bookingEnd < endDate) {
//       throw new Error("Conflicting booking already in databse");
//     }
//   }
// };

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);
  console.log(validationErrors);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);
    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.message = "Validation Error";
    next(err);
  }

  next();
};
const handleDateErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);
  console.log(validationErrors);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);
    const err = Error(
      "Sorry, this spot is already booked for the specified dates"
    );
    err.errors = errors;
    err.status = 403;
    err.message = "Validation Error";
    next(err);
  }

  next();
};

const overwriteErrorMsg = (targetKeyword, newMessage, errors) => {
  for (let err of errors) {
    if (err.includes("targetKeyword")) {
      err = newMessage;
    }
  }

  return errors;
};

module.exports = {
  handleValidationErrors,
  overwriteErrorMsg,
  newErr,
  validateExists,
  validateOwnership,
  handleDateErrors,
};
