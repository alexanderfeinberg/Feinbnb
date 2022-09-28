const { validationResult } = require("express-validator");

const newErr = (message, status, next) => {
  const err = Error(message);
  err.status = status;
  return next(err);
};

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
};
